import * as stylex from '@stylexjs/stylex';
import { fontFamily } from './fontFamily.stylex';

export const headers = stylex.create({
  h1Bold: {
    fontFamily: fontFamily.base,
    fontSize: 28,
    fontWeight: 700,
    lineHeight: '110%'
  },
  h1Semibold: {
    fontFamily: fontFamily.base,
    fontSize: 28,
    fontWeight: 600,
    lineHeight: '110%'
  },
  h1Medium: {
    fontFamily: fontFamily.base,
    fontSize: 28,
    fontWeight: 500,
    lineHeight: '110%'
  },
  h3Bold: {
    fontFamily: fontFamily.base,
    fontSize: 20,
    fontWeight: 700,
    lineHeight: '110%'
  },
  h3Semibold: {
    fontFamily: fontFamily.base,
    fontSize: 20,
    fontWeight: 600,
    lineHeight: '110%'
  },
  h3Medium: {
    fontFamily: fontFamily.base,
    fontSize: 20,
    fontWeight: 500,
    lineHeight: '110%'
  }
});
