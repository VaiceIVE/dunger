import { useEffect, useRef, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { Flex, text, useUncontrolled } from '@dunger/ui';
import { colors } from '@dunger/ui/tokens.stylex';

interface SwitchProps {
  value?: string;

  onChange?: (value: string) => void;

  defaultValue?: string;

  options?: { value: string; label: string }[] | string[];
}

export const Switch = ({ options = [], value, defaultValue, onChange }: SwitchProps) => {
  const [_value, setValue] = useUncontrolled({
    value,
    defaultValue,
    onChange,
    finalValue: ''
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const activeElement = containerRef.current.querySelector('[aria-selected="true"]');
    if (activeElement) {
      const { offsetLeft, offsetWidth } = activeElement as HTMLDivElement;
      setIndicatorStyle({ left: offsetLeft - 8, width: offsetWidth });
    }
  }, [_value, options]);

  return (
    <Flex ref={containerRef} style={styles.root} gap={0} align="center">
      <div
        {...stylex.props(styles.indicator)}
        style={{
          width: indicatorStyle.width,
          transform: `translateX(${indicatorStyle.left.toString()}px)`
        }}
      />
      {options.map((o) => {
        const optionValue = typeof o === 'string' ? o : o.value;
        const optionLabel = typeof o === 'string' ? o : o.label;

        return (
          <div
            {...stylex.props(styles.option, text.defaultMedium)}
            aria-selected={optionValue === _value}
            onClick={() => {
              setValue(optionValue);
            }}
            key={optionValue}>
            {optionLabel}
          </div>
        );
      })}
    </Flex>
  );
};

const styles = stylex.create({
  root: {
    backgroundColor: colors.backgroundUniversal,
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 12,
    borderStyle: 'solid',
    borderWidth: 1,
    color: colors.textPrimaryDefault,
    overflow: 'hidden',
    padding: 8,
    position: 'relative'
  },
  indicator: {
    backgroundColor: 'white',
    borderRadius: 8,
    height: 'calc(100% - 16px)',
    position: 'absolute',
    transition: 'transform 0.3s ease, width 0.3s ease'
  },
  option: {
    alignItems: 'center',
    backgroundColor: { default: 'transparent', ':is([aria-selected=true])': 'transparent' },
    borderRadius: 8,
    cursor: 'pointer',
    display: 'flex',
    flex: '1',
    justifyContent: 'center',
    paddingBlock: 12,
    position: 'relative',
    zIndex: 1
  }
});
