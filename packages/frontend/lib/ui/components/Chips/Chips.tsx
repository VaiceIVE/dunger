import { ComponentProps } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { text } from '@dunger/ui';
import { DungerSize } from '@dunger/ui/styles/DungerSize';
import { colors } from '@dunger/ui/tokens.stylex';
import { ChipsGroup } from './_components/ChipsGroup';
import { useChipsGroup } from './_components/ChipsGroup/ChipsGroup.context';

export interface ChipsProps extends Omit<ComponentProps<'button'>, 'style'> {
  style?: StyleXStyles;

  size?: Extract<DungerSize, 'xs' | 'sm'>;

  value: string;
}

export const Chips = ({ children, size = 'sm', style, value, onClick, ...props }: ChipsProps) => {
  const ctx = useChipsGroup();

  const status = ctx?.multiple
    ? ctx.value.includes(value)
      ? 'checked'
      : 'unchecked'
    : ctx?.value === value
      ? 'checked'
      : 'unchecked';

  const handleClick = () => {
    if (!ctx) return;

    if (ctx.multiple) {
      ctx.setValue(ctx.value.includes(value) ? value : [...(ctx.value as string[]), value]);
    } else {
      ctx.setValue(value);
    }
  };

  return (
    <button
      type="button"
      onClick={onClick ?? handleClick}
      data-state={status}
      {...stylex.props(text.defaultMedium, styles.root, styles[size], style)}
      {...props}>
      {children}
    </button>
  );
};

Chips.Group = ChipsGroup;

const styles = stylex.create({
  root: {
    backgroundColor: {
      default: 'transparent',
      ':is([aria-selected=true])': colors.backgroundOrangeActive,
      ':is([data-state=checked])': colors.backgroundOrangeActive
    },
    borderColor: {
      default: colors.outlinePrimaryDefault,
      ':is(:hover):not([aria-selected=true], [data-state=checked])': colors.outlinePrimaryHover,
      ':is([aria-selected=true])': 'transparent',
      ':is([data-state=checked])': 'transparent'
    },
    borderRadius: 32,
    borderStyle: 'solid',
    borderWidth: 2,
    color: {
      default: colors.textPrimaryDefault,
      ':is([aria-selected=true])': colors.brand80,
      ':is([data-state=checked])': colors.brand80
    },
    cursor: 'pointer',
    paddingInline: 12,
    width: 'fit-content'
  },
  xs: {
    paddingBlock: 4
  },
  sm: {
    fontSize: 12,
    paddingBlock: 8
  }
});
