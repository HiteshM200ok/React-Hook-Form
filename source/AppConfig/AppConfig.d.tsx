export interface IAppConfig {
  apiBaseUrl: string;
  appCodeVersion: string;
  appVersion: string;
  environment: 'DEVELOPMENT' | 'STAGING' | 'LIVE';
}

export interface IAppStageAppConfig {
  development: IAppConfig;
  staging: IAppConfig;
  production: IAppConfig;
}
