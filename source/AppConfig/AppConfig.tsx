import {IAppConfig, IAppStageAppConfig} from './appconfig.d';

type AppStages = 'development' | 'staging' | 'production';
export const EnableAppStage: AppStages = 'development';

// development app-config
const DevepomentAppConfig: IAppConfig = {
  apiBaseUrl: 'https://reqres.in/api/',
  appCodeVersion: '',
  appVersion: '',
  environment: 'DEVELOPMENT',
};

// staging app-config
const StagingAppConfig: IAppConfig = {
  apiBaseUrl: 'https://reqres.in/api/',
  appCodeVersion: '',
  appVersion: '',
  environment: 'STAGING',
};

// production app-config
const ProductionAppConfig: IAppConfig = {
  apiBaseUrl: 'https://reqres.in/api/',
  appCodeVersion: '',
  appVersion: '',
  environment: 'LIVE',
};

// app configs
export const AppConfig: IAppStageAppConfig = {
  development: DevepomentAppConfig,
  staging: StagingAppConfig,
  production: ProductionAppConfig,
};
