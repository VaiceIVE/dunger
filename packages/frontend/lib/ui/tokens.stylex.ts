import * as stylex from '@stylexjs/stylex';

export const colors = stylex.defineVars({
  // Text&Icon colors

  textPrimaryDefault: '#292929', // black-90
  textPrimaryHover: '#4A4A4A', // black-80
  textPrimaryActive: '#1D1D1D', // black-100

  textSecondaryDefault: '#545454', // black-70
  textSecondaryHover: '#656565', // black-60
  textSecondaryActive: '#4A4A4A', // black-80

  textTertiaryDefault: '#828282', // black-40
  textTertiaryHover: '#939393', // black-30
  textTertiaryActive: '#757575', // black-50

  textErrorDefault: '#C70505', // red-90
  textErrorHover: '#D30808', // red-80
  textErrorActive: '#B71313', // red-100

  textInverse: '#FFFFFF',

  // Outline colors

  outlinePrimaryDefault: '#E9E9E9', // black-3
  outlinePrimaryHover: '#DDDDDD', // black-4
  outlinePrimaryActive: '#CACACA', // black-5

  outlineErrorDefault: '#E72B2B', // red-60
  outlineErrorHover: '#EF4747', // red-50
  outlineErrorActive: '#E10F0F', // red-70

  outlineAccentDefault: '#F89F81', // brand-50
  outlineAccentHover: '#F9AE95', // brand-40
  outlineAccentActive: '#F7906E', // brand-60

  // Button colors

  buttonPrimaryDefault: '#292929', // black-90
  buttonPrimaryHover: '#4A4A4A', // black-80
  buttonPrimaryActive: '#1D1D1D', // black-100

  buttonAccentDefault: '#F46738', // brand-90
  buttonAccentHover: '#F5764C', // brand-80
  buttonAccentActive: '#F35521', // brand-100

  buttonSecondaryAccentDefault: '#FBE0CF', // orange-10
  buttonSecondaryAccentHover: '#FEF0E8', // orange-5
  buttonSecondaryAccentActive: '#FAD2B8', // orange-20

  buttonTertiaryAccentDefault: '#DAE3FF', // blue-10
  buttonTertiaryAccentHover: '#F1F4FF', // blue-5
  buttonTertiaryAccentActive: '#C8D5FF', // blue-20

  // Background colors

  backgroundUniversal: '#F6F6F7',

  backgroundNeutralDefault: '#F3F3F3', // black-2
  backgroundNeutralHover: '#E9E9E9', // black-3
  backgroundNeutralActive: '#DDDDDD', // black-4

  backgroundBlueDefault: '#F1F4FF', // blue-10
  backgroundBlueHover: '#DAE3FF', // blue-5
  backgroundBlueActive: '#C8D5FF', // blue-20

  backgroundOrangeDefault: '#FEF0E8', // orange-10
  backgroundOrangeHover: '#FBE0CF', // orange-5
  backgroundOrangeActive: '#FAD2B8', // orange-20

  // Basic colors

  black100: '#1D1D1D',
  black90: '#292929',
  black80: '#4A4A4A',
  black70: '#545454',
  black60: '#656565',
  black50: '#757575',
  black40: '#828282',
  black30: '#939393',
  black20: '#A6A6A6',
  black10: '#B5B5B5',
  black5: '#CACACA',
  black4: '#DDDDDD',
  black3: '#E9E9E9',
  black2: '#F3F3F3',
  black1: '#F9F9F9',

  brand100: '#F35521',
  brand90: '#F46738',
  brand80: '#F5764C',
  brand70: '#F68560',
  brand60: '#F7906E',
  brand50: '#F89F81',
  brand40: '#F9AE95',
  brand30: '#FABDA8',
  brand20: '#FBCBBB',
  brand10: '#FCDACF',
  brand5: '#FEECE7',
  brand1: '#FEF8F5',

  blue100: '#023DFF',
  blue90: '#1E52FF',
  blue80: '#4772FF',
  blue70: '#5A80FF',
  blue60: '#6C8EFF',
  blue50: '#7F9DFF',
  blue40: '#91ABFF',
  blue30: '#B5C6FF',
  blue20: '#C8D5FF',
  blue10: '#DAE3FF',
  blue5: '#F1F4FF',
  blue1: '#F8FAFF',

  orange100: '#D65809',
  orange90: '#ED6611',
  orange80: '#EF7629',
  orange70: '#F18541',
  orange60: '#F39459',
  orange50: '#F4A370',
  orange40: '#F6B388',
  orange30: '#F8C2A0',
  orange20: '#FAD2B8',
  orange10: '#FBE0CF',
  orange5: '#FEF0E8',
  orange1: '#FEF7F3',

  purple100: '#7002FF',
  purple90: '#801EFF',
  purple80: '#9747FF',
  purple70: '#A25AFF',
  purple60: '#AC6CFF',
  purple50: '#B77FFF',
  purple40: '#C191FF',
  purple30: '#D5B5FF',
  purple20: '#E0C8FF',
  purple10: '#EADAFF',
  purple5: '#F7F1FF',
  purple1: '#FBF8FF',

  red100: '#B71313',
  red90: '#C70505',
  red80: '#D30808',
  red70: '#E10F0F',
  red60: '#E72B2B',
  red50: '#EF4747',
  red40: '#F35F5F',
  red30: '#F77676',
  red20: '#FA8D8D',
  red10: '#FCB1B1',
  red5: '#FED1D1',
  red1: '#FFEAEA',

  green100: '#458A00',
  green90: '#58961A',
  green80: '#6AA133',
  green70: '#7DAE4D',
  green60: '#8FB966',
  green50: '#A1C47F',
  green40: '#B5D099',
  green30: '#C8DCB3',
  green20: '#DAE8CC',
  green10: '#E8F1E0',
  green5: '#F2F7ED',
  green1: '#F9FBF7',

  yellow100: '#D08700',
  yellow90: '#D5931A',
  yellow80: '#D99F33',
  yellow70: '#DFAB4D',
  yellow60: '#E3B766',
  yellow50: '#E7C27F',
  yellow40: '#ECCF99',
  yellow30: '#F1DBB3',
  yellow20: '#F6E7C',
  yellow10: '#F9F0E0',
  yellow5: '#FCF6ED',
  yellow1: '#FDFAF5',

  teal100: '#007D77',
  teal90: '#1A8A85',
  teal80: '#339792',
  teal70: '#4DA4A0',
  teal60: '#66B1AD',
  teal50: '#7FBDBA',
  teal40: '#99CBC9',
  teal30: '#B3D8D7',
  teal20: '#CCE5E4',
  teal10: '#E0EFEE',
  teal5: '#EDF6F5',
  teal1: '#F7FBFB',

  pink100: '#B9003B',
  pink90: '#C01A4F',
  pink80: '#B6335D',
  pink70: '#C04D71',
  pink60: '#D56689',
  pink50: '#DB7F9C',
  pink40: '#E399B1',
  pink30: '#EAB3C5',
  pink20: '#F1CCD8',
  pink10: '#F6E0E7',
  pink5: '#FAEDF1',
  pink1: '#FDF7F9',

  cyan100: '#0072B9',
  cyan90: '#1A81C0',
  cyan80: '#338EC7',
  cyan70: '#4D9DCE',
  cyan60: '#66AAD5',
  cyan50: '#7FB8DB',
  cyan40: '#99C7E3',
  cyan30: '#B3D5EA',
  cyan20: '#CCE3F1',
  cyan10: '#E0EEF6',
  cyan5: '#EDF5FA',
  cyan1: '#F7FAFD'
});
