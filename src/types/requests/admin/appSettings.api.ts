import { IResAppSettings, ISettingsCalculatorBrandData, IUpdateAppSettings } from 'types/entities';

export module IGetAppSettings {
  export type Response = IResAppSettings;
  export type Params = void;
}

export module IUpdateAppSettings {
  export type Response = IResAppSettings;
  export type Params = IUpdateAppSettings;
}

export namespace IGetSettingsCalculatorBrand {
  export type Response = ISettingsCalculatorBrandData[];
  export type Params = void;
}

export namespace ICreateSettingsCalculatorBrand {
  export type Response = ISettingsCalculatorBrandData;
  export type Params = string;
}

export namespace IUpdateSettingsCalculatorBrand {
  export type Response = ISettingsCalculatorBrandData;
  export type Params = ISettingsCalculatorBrandData;
}

export namespace IDeleteSettingsCalculatorBrand {
  export type Response = void;
  export type Params = string;
}
