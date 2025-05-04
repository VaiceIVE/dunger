import { ReactNode, useEffect, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { colors } from '@dunger/ui/tokens.stylex';
import { DungerSize } from '../../styles/DungerSize';
import { UserIcon } from '../Icon';

interface AvatarProps {
  src?: string | null;

  alt?: string;

  size?: Extract<DungerSize, 'sm' | 'md' | 'lg'>;

  style?: StyleXStyles;

  stubIcon?: ReactNode;
}

const isValidImage = (src: string): Promise<boolean> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      resolve(true);
    };
    img.onerror = () => {
      resolve(false);
    };
    img.src = src;
  });
};

export function Avatar({ src, alt, size = 'md', style, stubIcon }: AvatarProps) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateImage = async () => {
      setIsValid(src ? await isValidImage(src) : false);
    };
    void validateImage();
  }, [src]);

  return (
    <div {...stylex.props(styles.root, styles[size], !isValid && styles.noImage, style)}>
      {isValid ? <img src={src ?? undefined} alt={alt} {...stylex.props(styles.image)} /> : (stubIcon ?? <UserIcon />)}
    </div>
  );
}

const styles = stylex.create({
  root: {
    borderColor: colors.brand50,
    borderStyle: 'solid',
    borderWidth: 2,
    flexShrink: 0,
    overflow: 'hidden'
  },
  sm: { borderRadius: 10, height: 40, width: 40 },
  md: { borderRadius: 12, height: 88, width: 88 },
  lg: { borderRadius: 16, height: 120, width: 120 },
  noImage: {
    alignItems: 'center',
    backgroundColor: colors.backgroundNeutralDefault,
    borderColor: colors.outlinePrimaryActive,
    color: colors.textTertiaryDefault,
    display: 'flex',
    justifyContent: 'center'
  },
  image: {
    display: 'block',
    height: '100%',
    objectFit: 'cover',
    width: '100%'
  }
});
