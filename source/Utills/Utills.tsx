import {UseFormGetValues} from 'react-hook-form';
import {
  isArray,
  isPlainObject,
  isString,
  isNumber,
  isNaN,
  isBoolean,
  isNull,
} from 'lodash';
import Toast from 'react-native-toast-message';

export type TGetValuesDefaultValueType =
  | 'object'
  | 'array'
  | 'boolean'
  | 'string'
  | 'number'
  | 'null'
  | 'any';

export const getBulletPoints = (data: {
  array: Array<any>;
  isArrayOfObject: boolean;
  itemKey?: string;
  bulletSymobol?: string;
}) => {
  const {
    array = [],
    isArrayOfObject = false,
    itemKey = '',
    bulletSymobol = '➤',
  } = isPlainObject(data) ? data : {};
  let points: Array<string> = [];
  let bulletPoints = '';
  if (!isArray(array)) {
    return bulletPoints;
  }
  if (isArrayOfObject) {
    array.forEach((item: any) => {
      let point: string = item[itemKey];
      if (point) {
        points.push(point);
      }
    });
  } else {
    array.forEach((point: string) => {
      if (point) {
        points.push(point);
      }
    });
  }
  if (points[1]) {
    points.forEach((point: string) => {
      if (bulletPoints) {
        bulletPoints = `${bulletPoints}\n${bulletSymobol} ${point}`;
      } else {
        bulletPoints = `${bulletSymobol} ${point}`;
      }
    });
  } else if (points[0]) {
    bulletPoints = points[0];
  }
  return bulletPoints;
};

type TToast = {
  text1?: string;
  text2: any;
  bulletSymobol?: string;
  isText2ArrayOfObject?: boolean;
  text2ArrayOfObjectKey?: string;
  autoHide?: boolean;
};

interface TShowToastByType extends TToast {
  type: 'error' | 'success' | 'info';
}

const showToastByType = ({
  text1 = '',
  text2 = '',
  bulletSymobol = '➤',
  isText2ArrayOfObject = false,
  text2ArrayOfObjectKey = '',
  type = 'error',
  autoHide = true,
}: TShowToastByType) => {
  let title = text1 ? text1 : '';
  let message = '';
  if (isString(text2)) {
    message = text2;
  } else if (isArray(text2)) {
    message = getBulletPoints({
      array: text2,
      isArrayOfObject: isText2ArrayOfObject,
      itemKey: text2ArrayOfObjectKey,
      bulletSymobol,
    });
  }
  if (type && message) {
    Toast.show({
      type: type,
      ...(title && {text1: title}),
      text2: message,
      autoHide: autoHide,
    });
  }
};

export const showSuccessToast = (
  data: TToast = {text1: '', text2: '', autoHide: true},
) => {
  if (isPlainObject(data) && data.text2 && isString(data.text2)) {
    const payload: TShowToastByType = {
      type: 'success',
      autoHide: true,
      ...data,
    };
    showToastByType(payload);
  }
};

export const showInfoToast = (
  data: TToast = {text1: '', text2: '', autoHide: true},
) => {
  if (isPlainObject(data) && data.text2 && isString(data.text2)) {
    const payload: TShowToastByType = {
      type: 'info',
      autoHide: true,
      ...data,
    };
    showToastByType(payload);
  }
};

export const showErrorToast = (
  data: TToast = {text1: '', text2: '', autoHide: true},
) => {
  if (isPlainObject(data) && data.text2 && isString(data.text2)) {
    const payload: TShowToastByType = {
      type: 'error',
      autoHide: true,
      ...data,
    };
    showToastByType(payload);
  }
};

export const _pGetValues = (
  getValue: UseFormGetValues<any>,
  path: string | undefined,
  data_type: TGetValuesDefaultValueType = 'any',
  default_value: any = undefined,
) => {
  let value;
  let isValid = true;
  if (typeof getValue === 'function' && isString(path)) {
    value = getValue(path);
  }
  switch (data_type) {
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
      isValid = isNumber(value) && isNaN(value) === false;
      break;
    }
    case 'boolean': {
      isValid = isBoolean(value);
      break;
    }

    case 'null': {
      isValid = isNull(value);
      break;
    }
  }
  if (isValid === false) {
    value = default_value;
  }
  return value;
};
