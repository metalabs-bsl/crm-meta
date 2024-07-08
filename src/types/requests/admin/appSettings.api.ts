import { IResAppSettings, IUpdateAppSettings } from 'types/entities';

export module IGetAppSettings {
  export type Response = IResAppSettings;
  export type Params = void;
}

export module IUpdateAppSettings {
  export type Response = IResAppSettings;
  export type Params = IUpdateAppSettings;
}
