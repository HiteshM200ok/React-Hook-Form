import {AxiosError, AxiosResponse} from 'axios';
import {
  get,
  has,
  isArray,
  isBoolean,
  isEmpty,
  isNull,
  isNumber,
  isPlainObject,
  isString,
} from 'lodash';
import {showErrorToast, showSuccessToast} from '@utills';

export type TApiError = AxiosError | any;

export const prepareFormDataByObject = (payload: object | any) => {
  let formData = new FormData();
  if (!isArray(payload) || typeof payload === 'object') {
    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        if (typeof payload[key] === 'object') {
          formData.append(key, JSON.stringify(payload[key]));
        } else {
          formData.append(key, payload[key]);
        }
      }
    }
  }
  return formData;
};

const some_thing_went_wrong = 'Something went wrong!';
export const getApiMessage = (error: TApiError): string => {
  if (error.response && error.response.data) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // error.respons
    // error.response.data
    // error.response.message
    // error.response.status
    // error.response.headers

    if (isString(error.response.data.error)) {
      return error.response.data.error;
    }
    if (isString(error.response.data.message)) {
      return error.response.data.message;
    }
    if (isString(error.response.data.msg)) {
      return error.response.data.msg;
    }
  } else if (error.message) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    // error.request
    if (isArray(error.message)) {
      if (error.message[0]) {
        return error.message[0];
      }
    } else if (isString(error.message)) {
      return error.message;
    }
  } else if (error && error.msg) {
    if (isString(error.msg)) {
      return error.msg;
    }
  }
  return some_thing_went_wrong;
};

export const ApiErrorMessage = (
  error: TApiError,
  isErrorToast: boolean = true,
): string => {
  const errorMessage = getApiMessage(error);
  if (isErrorToast === true && errorMessage && isString(errorMessage)) {
    showErrorToast({text2: errorMessage});
  }
  return errorMessage;
};

export const ApiSuccessMessage = (
  response: AxiosResponse,
  isSuccessToast: boolean = true,
): string => {
  const successMessage = getApiMessage(response.data);
  if (
    isSuccessToast === true &&
    successMessage &&
    isString(successMessage) &&
    some_thing_went_wrong !== successMessage
  ) {
    showSuccessToast({text2: successMessage});
    return successMessage;
  }
  return '';
};

export interface IApiResponse extends AxiosResponse {
  auth_failed?: string | number;
}

type TdataType =
  | 'not-empty'
  | 'object'
  | 'array'
  | 'boolean'
  | 'string'
  | 'number'
  | 'null'
  | 'any'
  | 'has';

type TApiValidateResponse = {
  response: IApiResponse;
  dataType?: TdataType;
  innerDataValidateRules?: {[key: string]: TdataType} | null;
  isErrorToast?: boolean;
  isSuccessToast?: boolean;
};

type TApiValidatedResponse = {
  responseData: any;
  isValid: boolean;
  errorMessage: string;
  data: IApiResponse | any;
  rqdResData: any;
};

const validateDateType = (
  value: any,
  dataType: TdataType,
  info?: {obj: any; path: string} | null,
) => {
  let isValid = true;
  switch (dataType) {
    case 'object': {
      isValid = isPlainObject(value);
      break;
    }
    case 'array': {
      isValid = isArray(value);
      break;
    }
    case 'string': {
      isValid = isString(value);
      break;
    }
    case 'number': {
      isValid = isNumber(value);
      break;
    }
    case 'boolean': {
      isValid = isBoolean(value);
      break;
    }
    case 'not-empty': {
      isValid = isEmpty(value);
      break;
    }
    case 'null': {
      isValid = isNull(value);
      break;
    }
    case 'has': {
      if (info && isPlainObject(info)) {
        isValid = has(info.obj, info.path);
      }
      break;
    }
  }
  return isValid;
};

const getRqdResDataByType = (dataType: TdataType) => {
  let data;
  switch (dataType) {
    case 'object': {
      data = {};
      break;
    }
    case 'array': {
      data = [];
      break;
    }
    case 'string': {
      data = '';
      break;
    }
  }
  return data;
};

export const validateApiResponse = ({
  response,
  dataType = 'any',
  innerDataValidateRules = null,
  isErrorToast = true,
  isSuccessToast = false,
}: TApiValidateResponse): TApiValidatedResponse => {
  let validateResponse: TApiValidatedResponse = {
    responseData: null,
    isValid: true,
    errorMessage: '',
    data: {data: null, auth_failed: 0, status: 1},
    rqdResData: undefined,
  };

  if (has(response, 'status')) {
    validateResponse.data = response.data;
    validateResponse.responseData = response.data.data
      ? response.data.data
      : response.data;
  } else {
    validateResponse.isValid = false;
    validateResponse.errorMessage = getApiMessage(response);
    if (isErrorToast === true) {
      showErrorToast({text2: validateResponse.errorMessage});
    }
    return validateResponse;
  }

  const responseData = validateResponse.responseData;
  // auth failed or status is failed
  if (response.status < 200 || response.status > 200) {
    validateResponse.isValid = false;
    validateResponse.errorMessage = getApiMessage(validateResponse.data);
    if (isErrorToast === true) {
      showErrorToast({text2: validateResponse.errorMessage});
    }
    return validateResponse;
  }

  validateResponse.isValid = validateDateType(responseData, dataType);

  if (validateResponse.isValid === false) {
    validateResponse.errorMessage = ApiErrorMessage(
      validateResponse.data,
      isErrorToast,
    );
    let rqdResData = getRqdResDataByType(dataType);
    if (rqdResData !== undefined) {
      validateResponse.errorMessage = '';
      validateResponse.rqdResData = rqdResData;
    }
  } else {
    if (isPlainObject(innerDataValidateRules)) {
      for (const innerDataPath in innerDataValidateRules) {
        const innerData = get(responseData, innerDataPath);
        const innerDataType = innerDataValidateRules[innerDataPath];
        const info = {obj: responseData, path: innerDataPath};
        validateResponse.isValid = validateDateType(
          innerData,
          innerDataType,
          info,
        );
        if (validateResponse.isValid === false) {
          validateResponse.errorMessage = 'Response data is incorrect';
          let rqdResData = getRqdResDataByType(innerDataType);
          if (rqdResData !== undefined) {
            validateResponse.errorMessage = '';
            validateResponse.rqdResData = rqdResData;
          }
          if (isErrorToast === true) {
            showErrorToast({text2: validateResponse.errorMessage});
          }
          break;
        }
      }
    }
  }

  if (isSuccessToast === true && validateResponse.isValid === true) {
    ApiSuccessMessage(response);
  }

  return validateResponse;
};
