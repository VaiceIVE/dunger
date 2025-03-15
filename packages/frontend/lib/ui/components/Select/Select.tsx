import { useEffect, useMemo, useState } from 'react';
import { Combobox, ComboboxItem, getOptionsLockup, useUncontrolled } from '@dunger/ui';
import { usePrevious } from '@dunger/ui/hooks/usePrevious';
import { InputBase, InputBaseProps } from '../InputBase';
import SelectorIcon from './selector.svg?react';

export interface SelectProps extends Omit<InputBaseProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: string | null;

  defaultValue?: string | null;

  onChange?: (value: string | null) => void;

  searchable?: boolean;

  searchValue?: string;

  defaultSearchValue?: string;

  onSearchChange?: (value: string) => void;

  options?: ComboboxItem[];
}

export const Select = ({
  value,
  defaultValue,
  onChange,
  options = [],
  searchable = false,
  readOnly,
  searchValue,
  defaultSearchValue,
  onSearchChange,
  onClick,
  onBlur,
  onFocus,
  disabled,
  name,
  form,
  ...props
}: SelectProps) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);

  const optionsLockup = useMemo(() => getOptionsLockup(options), [options]);

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: null,
    onChange
  });

  const selectedOption = typeof _value === 'string' ? optionsLockup[_value] : undefined;
  const previousSelectedOption = usePrevious(selectedOption);

  const [search, setSearch] = useUncontrolled({
    value: searchValue,
    defaultValue: defaultSearchValue,
    finalValue: selectedOption ? selectedOption.label : '',
    onChange: onSearchChange
  });

  useEffect(() => {
    if (value === null) {
      setSearch('');
    }

    if (
      typeof value === 'string' &&
      selectedOption &&
      (previousSelectedOption?.value !== selectedOption.value || previousSelectedOption.label !== selectedOption.label)
    ) {
      setSearch(selectedOption.label);
    }
  }, [value, selectedOption, setSearch, previousSelectedOption]);

  return (
    <Combobox
      onOpenChange={setDropdownOpened}
      open={dropdownOpened}
      value={_value}
      disabled={disabled}
      onValueChange={(value) => {
        setValue(value as string);
      }}>
      <Combobox.Target asChild>
        <InputBase
          disabled={disabled}
          value={search}
          readOnly={readOnly ?? !searchable}
          rightSection={<SelectorIcon />}
          onChange={(event) => {
            setSearch(event.currentTarget.value);
          }}
          onFocus={(event) => {
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setSearch(_value != null ? optionsLockup[_value].label || '' : '');
            onBlur?.(event);
          }}
          onClick={(event) => {
            onClick?.(event);
          }}
          {...props}
        />
      </Combobox.Target>

      <Combobox.Options>
        {options.map((o) => (
          <Combobox.Option key={o.value} disabled={o.disabled} value={o.value}>
            {o.label}
          </Combobox.Option>
        ))}
      </Combobox.Options>
      <Combobox.HiddenInput value={_value} name={name} disabled={disabled} form={form} />
    </Combobox>
  );
};
