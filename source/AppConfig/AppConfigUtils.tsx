import {AppConfig, EnableAppStage} from './AppConfig';
import {IAppConfig} from './Appconfig.d';

export const getAppConfig = (): IAppConfig => {
  return AppConfig[EnableAppStage];
};
