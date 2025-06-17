import * as stylex from '@stylexjs/stylex';

export const Skeleton = () => {
  return <div {...stylex.props(styles.root)}></div>;
};

const shine = stylex.keyframes({
  '0%': { backgroundPosition: '200% 0' },
  '100%': { backgroundPosition: '-100% 0' }
});

const styles = stylex.create({
  root: {
    animationDuration: '1.5s',
    animationIterationCount: 'infinite',
    animationName: shine,
    animationTimingFunction: 'linear',
    backgroundColor: '#EBEDF2',
    backgroundImage: 'linear-gradient(90deg, #EBEDF2 0%, #F5F6FA 20%, #EBEDF2 40%)',
    backgroundSize: '200% 100%',
    height: '100%',
    width: '100%'
  }
});
