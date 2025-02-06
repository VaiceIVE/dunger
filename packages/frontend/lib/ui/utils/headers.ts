import * as stylex from '@stylexjs/stylex';
import { fontFamily } from './fontFamily.stylex';

export const headers = stylex.create({
  h1Bold: {
    fontFamily: fontFamily.base,
    fontSize: { default: '28px', '@media(min-width: 440px)': '32px' },
    fontWeight: 700,
    lineHeight: { default: '30px', '@media(min-width: 440px)': '40px' }
  },
  h1Medium: {
    fontFamily: fontFamily.base,
    fontSize: { default: '28px', '@media(min-width: 440px)': '32px' },
    fontWeight: 500,
    lineHeight: { default: '30px', '@media(min-width: 440px)': '40px' }
  },
  h1Regular: {
    fontFamily: fontFamily.base,
    fontSize: { default: '28px', '@media(min-width: 440px)': '32px' },
    fontWeight: 400,
    lineHeight: { default: '30px', '@media(min-width: 440px)': '40px' }
  },
  h2Bold: {
    fontFamily: fontFamily.base,
    fontSize: { default: '22px', '@media(min-width: 440px)': '24px' },
    fontWeight: 700,
    lineHeight: { default: '24px', '@media(min-width: 440px)': '28px' }
  },
  h2Medium: {
    fontFamily: fontFamily.base,
    fontSize: { default: '22px', '@media(min-width: 440px)': '24px' },
    fontWeight: 500,
    lineHeight: { default: '24px', '@media(min-width: 440px)': '28px' }
  },
  h2Regular: {
    fontFamily: fontFamily.base,
    fontSize: { default: '22px', '@media(min-width: 440px)': '24px' },
    fontWeight: 400,
    lineHeight: { default: '24px', '@media(min-width: 440px)': '28px' }
  },
  h3Bold: {
    fontFamily: fontFamily.base,
    fontSize: { default: '18px', '@media(min-width: 440px)': '20px' },
    fontWeight: 700,
    lineHeight: { default: '20px', '@media(min-width: 440px)': '24px' }
  },
  h3Medium: {
    fontFamily: fontFamily.base,
    fontSize: { default: '18px', '@media(min-width: 440px)': '20px' },
    fontWeight: 500,
    lineHeight: { default: '20px', '@media(min-width: 440px)': '24px' }
  },
  h3Regular: {
    fontFamily: fontFamily.base,
    fontSize: { default: '18px', '@media(min-width: 440px)': '20px' },
    fontWeight: 400,
    lineHeight: { default: '20px', '@media(min-width: 440px)': '24px' }
  }
});
