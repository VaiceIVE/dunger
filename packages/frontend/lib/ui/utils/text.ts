import * as stylex from '@stylexjs/stylex';
import { fontFamily } from './fontFamily.stylex';

export const text = stylex.create({
  defaultMedium: {
    fontFamily: fontFamily.base,
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '24px'
  },
  defaultBold: {
    fontFamily: fontFamily.base,
    fontSize: '16px',
    fontWeight: 700,
    lineHeight: '24px'
  },
  smallRegular: {
    fontFamily: fontFamily.base,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '20px'
  },
  smallMedium: {
    fontFamily: fontFamily.base,
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '20px'
  },
  smallSemibold: {
    fontFamily: fontFamily.base,
    fontSize: '14px',
    fontWeight: 600,
    lineHeight: '20px'
  },
  smallBold: {
    fontFamily: fontFamily.base,
    fontSize: '14px',
    fontWeight: 700,
    lineHeight: '20px'
  },
  captionCapsMedium: {
    fontFamily: fontFamily.base,
    fontSize: '12px',
    fontWeight: 500,
    lineHeight: '16px',
    textTransform: 'uppercase'
  }
});
