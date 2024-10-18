export interface IResAppSettings {
  id: string;
  is_calculator_open: boolean;

  /* ------------------ Conversion Settings ------------------ */
  conversionPercentage: number;
  conversionEnabled: boolean;
  conversionCount: number;

  /* ------------------ Bonus Settings ------------------ */
  bonusPercentage: number;
  bonusEnabled: boolean;

  /* ------------------ Profit Settings ------------------ */
  profitPercentage: number;
  profitEnabled: boolean;
  profitCount: number;

  /* ------------------ Pax Settings ------------------ */
  paxPercentage: number;
  paxEnabled: boolean;
  paxCount: number;

  /* ------------------ Additional Bonus Settings ------------------ */
  additionalBonusPercentage: number;
  additionalBonusEnabled: boolean;

  /* ------------------ CRM Management Settings ------------------ */
  crmManagementPercentage: number;
  crmManagementEnabled: boolean;
}

export interface IUpdateAppSettings {
  is_calculator_open: boolean;
}

export interface ISettingsCalculatorBrandData {
  id: string;
  created_at?: string;
  updated_at?: string;
  name: string;
  isEditing?: boolean;
}
