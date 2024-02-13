import {useMemo} from 'react';
import {FieldPath, FieldValues, RegisterOptions} from 'react-hook-form';
import {isString, isNumber} from 'lodash';

type TRulues = Omit<
  RegisterOptions<FieldValues, FieldPath<FieldValues>>,
  'valueAsDate' | 'setValueAs' | 'disabled'
>;

type Params = {
  isMandatory?: boolean;
  rules?: Omit<
    RegisterOptions<FieldValues, FieldPath<FieldValues>>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  isNumeric?: boolean;
  editable?: boolean;
  isEmail?: boolean;
  isTrim?: boolean;
  name?: string;
  minValue?: number;
};

const whitesSpaceValidation = (value: string): string | boolean => {
  if (!value || !isString(value)) {
    return 'This field is required.';
  }
  if (value[0] === ' ') {
    return 'Whitespace is not allow at the start';
  }
  if (value[value.length - 1] === ' ') {
    return 'Whitespace is not allow at the end';
  }
  return true;
};

export const getNumberValue = (_value: any): number => {
  let value = 0;
  if (isNumber(_value)) {
    if (!isNaN(_value)) {
      value = _value;
    }
  } else if (isString(_value)) {
    const str_to_num = Number(_value);
    if (!isNaN(str_to_num)) {
      value = str_to_num;
    }
  }
  return value;
};

export const useRHFValidationRules = ({
  isMandatory = false,
  rules,
  isNumeric = false,
  isEmail = false,
  isTrim = true,
  minValue = 0,
}: Params) => {
  return useMemo(() => {
    let newRules: TRulues = {};
    const getFirstObjKey = (obj: object) => {
      for (const key in obj) {
        return key;
      }
    };
    if (isMandatory) {
      newRules.required = 'This field is required.';
    }
    if (isEmail) {
      newRules.pattern = {
        value: /\S+@\S+\.\S+/,
        message: 'Entered value does not match email format',
      };
    } else if (isNumeric) {
      newRules.valueAsNumber = true;
      newRules.pattern = {
        value: /^(0|[1-9]\d*)(\.\d+)?$/,
        message: 'Please enter numeric value only.',
      };
      let min_value = getNumberValue(minValue);
      newRules.min = {
        value: min_value,
        message: `Value should be greater than or equal to ${min_value}`,
      };
    }

    newRules = {...newRules, ...rules};
    if (isTrim) {
      // inject whitespace validation into the rules
      const originalValidationRules =
        typeof newRules.validate === 'function'
          ? {default: newRules.validate}
          : newRules.validate;
      newRules.validate = {
        ...originalValidationRules,
        whitesSpaceValidation,
      };
    }
    return {
      rules: newRules,
      isRules: getFirstObjKey(newRules) ? true : false,
    };
  }, [isMandatory, rules, isNumeric, isEmail, isTrim, minValue]);
};
