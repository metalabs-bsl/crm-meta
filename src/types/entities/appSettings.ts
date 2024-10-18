export interface IResAppSettings {
  id: string;
  is_calculator_open: boolean;
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
