import React, {forwardRef, useCallback, useMemo} from 'react';
import {
  View,
  TextInput,
  Pressable,
  ColorValue,
  TextInputProps,
  ViewStyle,
  StyleSheet,
  NativeSyntheticEvent,
  TextInputFocusEventData,
} from 'react-native';
import {useController} from 'react-hook-form';
import {isNumber} from 'lodash';
import {Colors, FontFamily, GetFontSize} from '@assets-root';
import {useRHFValidationRules} from '@hooks-root';
import {ReactNode} from 'react';
import {
  Control,
  FieldPath,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import {TextStyle} from 'react-native';
import {IPropsText} from '@components/Text';
import {Label} from '@components/Label';
import {RHFError} from '@components/RHFError';

export type TRHFInputRules = Omit<
  RegisterOptions<FieldValues, FieldPath<FieldValues>>,
  'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
>;

interface IPropsRHFInputField extends TextInputProps {
  label?: string;
  labelColor?: ColorValue;
  labelProps?: IPropsText;
  containerMarginTop?: number;
  containerStyle?: ViewStyle;
  innerContainerStyle?: ViewStyle | undefined;
  control: Control<any, any>;
  name: FieldPath<FieldValues>;
  rules?: TRHFInputRules;
  inputStyle?: TextStyle;
  renderRightItem?: ReactNode | (() => ReactNode);
  onPress?: () => void;
  isMandatory?: boolean;
  renderLeftItem?: () => ReactNode;
  isNumeric?: boolean;
  isModalInput?: boolean;
  containerMarginLeft?: number;
  containerMarginRight?: number;
  continerFlex?: number;
  isEmail?: boolean;
  isVisibleMandatorySymbol?: boolean;
  minValue?: number;
}

const RHFInputFieldComponent = forwardRef<TextInput, IPropsRHFInputField>(
  (props, ref): JSX.Element => {
    const {
      label = '',
      labelColor = Colors.Primary,
      labelProps,
      placeholder,
      containerMarginTop = 15,
      containerMarginLeft = 0,
      containerMarginRight = 0,
      continerFlex,
      containerStyle,
      innerContainerStyle,
      inputStyle,
      renderRightItem,
      renderLeftItem,
      onPress = () => {},
      multiline = false,
      isMandatory = false,
      control,
      name = '',
      editable = true,
      isModalInput = false,
      onChangeText,
      onBlur,
      maxLength,
      isVisibleMandatorySymbol = true,
      ...restProps
    } = props;

    const isEditable: boolean = useMemo(() => {
      return isModalInput ? false : editable;
    }, [editable, isModalInput]);

    const {isRules, rules} = useRHFValidationRules(props);

    const {
      field: {onChange, onBlur: rhfOnBlur, value},
      fieldState: {error, invalid, isDirty, isTouched},
    } = useController({
      name: name,
      control,
      rules,
    });

    const containerStyles = useMemo(
      () => ({
        marginTop: containerMarginTop,
        marginLeft: containerMarginLeft,
        marginRight: containerMarginRight,
        flex: continerFlex,
        ...containerStyle,
        ...(editable === false && {opacity: 0.5}),
      }),
      [
        containerMarginTop,
        containerMarginLeft,
        containerMarginRight,
        containerStyle,
        continerFlex,
        editable,
      ],
    );

    const inputWrapperStyles: ViewStyle = useMemo(() => {
      return {
        ...styles.inputWrapper,
        ...innerContainerStyle,
        ...(multiline && {height: 100, borderRadius: 10}),
      };
    }, [innerContainerStyle, multiline]);

    const inputStyles = useMemo(() => {
      return {
        ...styles.input,
        ...inputStyle,
        ...(multiline && {paddingTop: 10, paddingBottom: 10, height: 100}),
      };
    }, [inputStyle, multiline]);

    const onChangeValue = useCallback(
      (_value: string) => {
        if (typeof onChange === 'function') {
          onChange(_value);
        }
        if (typeof onChangeText === 'function') {
          onChangeText(_value);
        }
      },
      [onChangeText, onChange],
    );

    const onInpuBlur = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        if (typeof onBlur === 'function') {
          onBlur(e);
        }
        if (typeof rhfOnBlur === 'function') {
          rhfOnBlur();
        }
      },
      [onBlur, rhfOnBlur],
    );

    const maxLengthProps = useMemo(
      () => ({
        ...(multiline && {maxLength: 100}),
        ...(maxLength && {maxLength: maxLength}),
      }),
      [maxLength, multiline],
    );

    return (
      <View style={containerStyles}>
        {label ? (
          <Label marginBottom={5} color={labelColor} {...labelProps}>
            {label}
            {isMandatory && isVisibleMandatorySymbol ? (
              <Label color={Colors.Danger}>{' *'}</Label>
            ) : null}
          </Label>
        ) : null}
        <Pressable
          style={[inputWrapperStyles, error && styles.errorInputWrapper]}
          onPress={onPress}
          disabled={editable ? false : true}>
          {typeof renderLeftItem === 'function'
            ? renderLeftItem()
            : renderLeftItem}
          <TextInput
            ref={ref}
            allowFontScaling={false}
            blurOnSubmit={false}
            underlineColorAndroid="transparent"
            style={inputStyles}
            selectionColor={Colors.Primary}
            multiline={multiline}
            textAlignVertical={multiline ? 'top' : 'auto'}
            value={value ? `${value}` : isNumber(value) ? `${value}` : ''}
            placeholder={placeholder ? placeholder : label ? label : ''}
            {...restProps}
            {...maxLengthProps}
            onBlur={onInpuBlur}
            onChangeText={onChangeValue}
            editable={isEditable}
          />
          {typeof renderRightItem === 'function'
            ? renderRightItem()
            : renderRightItem}
        </Pressable>
        {isRules ? (
          <RHFError
            error={error}
            invalid={invalid}
            isDirty={isDirty}
            isTouched={isTouched}
          />
        ) : null}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    height: 44,
    borderRadius: 5,
    borderWidth: 1.35,
    borderColor: Colors.Primary,
    backgroundColor: Colors.White,
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  input: {
    color: Colors.MineShaft,
    fontFamily: FontFamily.Regular.name,
    fontSize: GetFontSize('l'),
    letterSpacing: 0.5,
    flex: 1,
    alignItems: 'center',
  },
  errorInputWrapper: {
    borderColor: Colors.Danger,
  },
});

const RHFInputField = React.memo(RHFInputFieldComponent);
export {RHFInputField};
export type {IPropsRHFInputField};
