export type PropertyCategory = 'residential' | 'commercial' | 'industrial';
export type ConsumerCategory = 'general' | 'sc_st';

export interface SolarCalcInput {
  propertyType: PropertyCategory;
  monthlyBill?: number;
  monthlyUnits?: number;
  tariff?: number;
  roofAreaSqft?: number;
  panelWatt?: number;
  consumerCategory?: ConsumerCategory;
}

export interface GujaratTopUpBreakdown {
  eligible: boolean;
  capacityKw: number;
  benchmarkCost: number;
  centralSubsidy: number;
  stateTopUpSubsidy: number;
  totalSubsidy: number;
  customerContribution: number;
  contributionPercent: number;
  note: string;
}

export interface SolarCalcResult {
  recommendedKw: number;
  panelsCount: number;
  panelWatt: number;
  monthlyGenerationUnits: number;
  monthlySavingsInr: number;
  annualSavingsInr: number;
  requiredRoofSqft: number;
  roofLimited: boolean;
  estimatedCentralSubsidyInr: number;
  gujaratTopUp218: GujaratTopUpBreakdown | null;
  assumptions: {
    unitsPerKwMonth: number;
    sqftPerKw: number;
    discom: string;
    lastVerifiedDate: string;
  };
}

export const SOLAR_ASSUMPTIONS = {
  UNITS_PER_KW_MONTH: 120,
  SQFT_PER_KW: 100,
  DEFAULT_PANEL_W: 550,
  DEFAULT_TARIFF_RESIDENTIAL: 7.5,
  DEFAULT_TARIFF_COMMERCIAL: 9.5,
  DEFAULT_TARIFF_INDUSTRIAL: 9.0,
  LAST_VERIFIED_DATE: '2026-11-25',
};

export function calculateCentralSubsidy(kw: number, propertyType: PropertyCategory): number {
  if (propertyType !== 'residential' || kw <= 0) return 0;
  if (kw <= 2) {
    return Math.round(kw * 30000);
  }
  if (kw < 3) {
    return Math.round(60000 + (kw - 2) * 18000);
  }
  return 78000;
}

export function calculateGujaratTopUp(
  kw: number,
  propertyType: PropertyCategory,
  consumerCategory: ConsumerCategory = 'general'
): GujaratTopUpBreakdown | null {
  if (propertyType !== 'residential') return null;

  const isEligible = kw <= 2.18;
  const calcKw = isEligible ? Math.min(2.18, Math.max(1, kw)) : 2.18;

  const firstTwoKw = Math.min(calcKw, 2);
  const extraKw = Math.max(0, calcKw - 2);
  const benchmarkCost = Math.round(firstTwoKw * 50000 + extraKw * 45000);
  const centralSubsidy = calculateCentralSubsidy(calcKw, 'residential');
  const contributionPercent = consumerCategory === 'sc_st' ? 5 : 10;
  const customerContribution = Math.round((benchmarkCost * contributionPercent) / 100);
  const stateTopUpSubsidy = Math.max(0, benchmarkCost - centralSubsidy - customerContribution);
  const totalSubsidy = centralSubsidy + stateTopUpSubsidy;

  return {
    eligible: isEligible,
    capacityKw: Number(calcKw.toFixed(2)),
    benchmarkCost,
    centralSubsidy,
    stateTopUpSubsidy,
    totalSubsidy,
    customerContribution,
    contributionPercent,
    note: isEligible
      ? 'Calculated on MNRE benchmark cost under Gujarat state top-up (up to 2.18 kWp). Includes 3-year capacity expansion lock; verify active UGVCL circular before booking.'
      : 'Requirement exceeds 2.18 kWp, so standard PM Surya Ghar central subsidy (up to ₹78,000) applies. Shown below is the 2.18 kWp benchmark for reference.',
  };
}

export function calculateSolarEstimate(input: SolarCalcInput): SolarCalcResult {
  const propertyType: PropertyCategory =
    input.propertyType === 'commercial' || input.propertyType === 'industrial'
      ? input.propertyType
      : 'residential';

  const defaultTariff =
    propertyType === 'commercial'
      ? SOLAR_ASSUMPTIONS.DEFAULT_TARIFF_COMMERCIAL
      : propertyType === 'industrial'
        ? SOLAR_ASSUMPTIONS.DEFAULT_TARIFF_INDUSTRIAL
        : SOLAR_ASSUMPTIONS.DEFAULT_TARIFF_RESIDENTIAL;

  const bill = Number.isFinite(input.monthlyBill) && (input.monthlyBill ?? 0) > 0 ? Number(input.monthlyBill) : 0;
  let tariff = Number.isFinite(input.tariff) && (input.tariff ?? 0) > 0 ? Number(input.tariff) : 0;
  let units = Number.isFinite(input.monthlyUnits) && (input.monthlyUnits ?? 0) > 0 ? Number(input.monthlyUnits) : 0;

  if (!tariff && bill && units) {
    tariff = bill / units;
  } else if (!tariff) {
    tariff = defaultTariff;
  }

  if (!units && bill && tariff) {
    units = bill / tariff;
  }

  if (!units || units <= 0) {
    throw new Error('Please enter monthly units or monthly electricity bill.');
  }

  const roof = Number.isFinite(input.roofAreaSqft) && (input.roofAreaSqft ?? 0) > 0 ? Number(input.roofAreaSqft) : 0;
  const panelWatt =
    input.panelWatt && [500, 540, 550, 580, 600].includes(Number(input.panelWatt))
      ? Number(input.panelWatt)
      : SOLAR_ASSUMPTIONS.DEFAULT_PANEL_W;

  const rawKw = units / SOLAR_ASSUMPTIONS.UNITS_PER_KW_MONTH;
  let kw: number;
  if (propertyType === 'residential' && rawKw > 2.0 && rawKw <= 2.25) {
    kw = 2.18;
  } else {
    kw = Math.max(1, Math.ceil(rawKw * 2) / 2);
  }

  let roofLimited = false;
  if (roof > 0 && kw * SOLAR_ASSUMPTIONS.SQFT_PER_KW > roof) {
    const maxRoofKw = Math.max(1, Math.floor((roof / SOLAR_ASSUMPTIONS.SQFT_PER_KW) * 2) / 2);
    if (maxRoofKw < kw) {
      kw = maxRoofKw;
      roofLimited = true;
    }
  }

  const panelsCount = Math.ceil((kw * 1000) / panelWatt);
  const monthlyGenerationUnits = Math.round(kw * SOLAR_ASSUMPTIONS.UNITS_PER_KW_MONTH);
  const rawMonthlySavings = Math.round(monthlyGenerationUnits * tariff);
  const monthlySavingsInr = bill > 0 ? Math.min(rawMonthlySavings, Math.round(bill)) : rawMonthlySavings;
  const annualSavingsInr = monthlySavingsInr * 12;
  const requiredRoofSqft = Math.round(kw * SOLAR_ASSUMPTIONS.SQFT_PER_KW);
  const estimatedCentralSubsidyInr = calculateCentralSubsidy(kw, propertyType);
  const gujaratTopUp218 = calculateGujaratTopUp(
    kw,
    propertyType,
    input.consumerCategory === 'sc_st' ? 'sc_st' : 'general'
  );

  return {
    recommendedKw: Number(kw.toFixed(2)),
    panelsCount,
    panelWatt,
    monthlyGenerationUnits,
    monthlySavingsInr,
    annualSavingsInr,
    requiredRoofSqft,
    roofLimited,
    estimatedCentralSubsidyInr,
    gujaratTopUp218,
    assumptions: {
      unitsPerKwMonth: SOLAR_ASSUMPTIONS.UNITS_PER_KW_MONTH,
      sqftPerKw: SOLAR_ASSUMPTIONS.SQFT_PER_KW,
      discom: 'UGVCL (Uttar Gujarat Vij Company Ltd.)',
      lastVerifiedDate: SOLAR_ASSUMPTIONS.LAST_VERIFIED_DATE,
    },
  };
}
