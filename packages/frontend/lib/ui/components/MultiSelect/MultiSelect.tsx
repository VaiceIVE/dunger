import { useMemo, useState } from 'react';
import { Chips, Combobox, ComboboxItem, Flex, getOptionsLockup, SearchIcon, Stack, useUncontrolled } from '@dunger/ui';
import { InputBase, InputBaseProps } from '../InputBase';
import MultiSelectorIcon from './selector.svg?react';

export interface MultiSelectProps extends Omit<InputBaseProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: string[];

  defaultValue?: string[];

  onChange?: (value: string[]) => void;

  onRemove?: (value: string) => void;

  searchable?: boolean;

  searchValue?: string;

  defaultSearchValue?: string;

  onSearchChange?: (value: string) => void;

  options?: ComboboxItem[];
}

export const MultiSelect = ({
  value,
  defaultValue,
  onChange,
  onRemove,
  options = [],
  searchable = false,
  readOnly,
  searchValue,
  defaultSearchValue,
  onSearchChange,
  onKeyDown,
  onBlur,
  onFocus,
  disabled,
  leftSection,
  name,
  form,
  ...props
}: MultiSelectProps) => {
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const optionsLockup = useMemo(() => getOptionsLockup(options), [options]);

  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    finalValue: [],
    onChange
  });

  const [search, setSearch] = useUncontrolled({
    value: searchValue,
    defaultValue: defaultSearchValue,
    finalValue: '',
    onChange: onSearchChange
  });

  const handleInputKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    onKeyDown?.(event);

    if (event.key === ' ' && !searchable) {
      event.preventDefault();
    }

    if (event.key === 'Backspace' && search.length === 0 && _value.length > 0) {
      onRemove?.(_value[_value.length - 1]);
      setValue(_value.slice(0, _value.length - 1));
    }
  };

  const _leftSection = leftSection ?? (searchable ? <SearchIcon /> : null);

  const values = _value.map((item, index) => (
    <Chips
      size="xs"
      value={item}
      key={`${item}-${index.toString()}`}
      withRemoveButton={!readOnly && !optionsLockup[item].disabled}
      onRemove={() => {
        setValue(_value.filter((i) => item !== i));
        onRemove?.(item);
      }}
      disabled={disabled}>
      {optionsLockup[item].label || item}
    </Chips>
  ));

  return (
    <Stack gap={6}>
      <Combobox
        onOpenChange={setDropdownOpened}
        open={dropdownOpened}
        value={_value}
        disabled={disabled}
        multiple
        onValueChange={(value) => {
          setValue(value as string[]);
        }}>
        <Combobox.Target asChild>
          <InputBase
            disabled={disabled}
            value={search}
            readOnly={readOnly ?? !searchable}
            leftSection={_leftSection}
            rightSection={<MultiSelectorIcon />}
            onFocus={(event) => {
              onFocus?.(event);
            }}
            onBlur={(event) => {
              onBlur?.(event);
              setSearch('');
            }}
            onChange={(event) => {
              setSearch(event.currentTarget.value);
            }}
            onKeyDown={handleInputKeydown}
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
      {!!values.length && <Flex gap={8}>{values}</Flex>}
    </Stack>
  );
};
