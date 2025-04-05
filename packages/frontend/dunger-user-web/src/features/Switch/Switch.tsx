import { useCallback, useEffect, useRef, useState } from 'react';
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

  const updateIndicator = useCallback(() => {
    const activeElement = containerRef.current?.querySelector('[aria-selected="true"]') as HTMLDivElement | null;

    if (activeElement) {
      setIndicatorStyle({ left: activeElement.offsetLeft - 8, width: activeElement.offsetWidth });
    }
  }, []);

  useEffect(() => {
    updateIndicator();
  }, [_value, options, updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => {
      window.removeEventListener('resize', updateIndicator);
    };
  }, [updateIndicator]);

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
    borderColor: colors.outlinePrimaryDefault,
    borderRadius: 8,
    borderStyle: 'solid',
    borderWidth: 2,
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
