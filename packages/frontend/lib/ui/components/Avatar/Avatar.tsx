import { ReactNode, useEffect, useState } from 'react';
import * as stylex from '@stylexjs/stylex';
import { StyleXStyles } from '@stylexjs/stylex';
import { colors } from '@dunger/ui/tokens.stylex';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: number;
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

export function Avatar({ src, alt, size = 120, style, stubIcon }: AvatarProps) {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateImage = async () => {
      setIsValid(src ? await isValidImage(src) : false);
    };
    void validateImage();
  }, [src]);

  return (
    <div {...stylex.props(styles.root(size), !isValid && styles.noImage, style)}>
      {isValid ? <img src={src ?? undefined} alt={alt} {...stylex.props(styles.image)} /> : (stubIcon ?? null)}
    </div>
  );
}

const styles = stylex.create({
  root: (size: number) => ({
    borderRadius: '50%',
    flexShrink: 0,
    height: size,
    overflow: 'hidden',
    width: size
  }),
  noImage: {
    alignItems: 'center',
    backgroundColor: colors.backgroundUniversal,
    color: 'white',
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
