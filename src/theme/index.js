// Tema central do aplicativo.
// Todas as cores, espaçamentos, fontes e sombras ficam aqui:
// para mudar o visual do app inteiro, basta alterar este arquivo.

export const colors = {
  background: '#0E0F1F',
  surface: '#191A33',
  surfaceAlt: '#232547',
  border: '#2E3060',

  primary: '#7C5CFF',
  primaryDark: '#5B3FE0',
  primarySoft: 'rgba(124, 92, 255, 0.16)',

  accent: '#2EE6A6',
  accentSoft: 'rgba(46, 230, 166, 0.16)',

  danger: '#FF5C7A',
  dangerSoft: 'rgba(255, 92, 122, 0.16)',

  warning: '#FFC857',
  warningSoft: 'rgba(255, 200, 87, 0.16)',

  text: '#F4F4FF',
  textMuted: '#9A9CC4',
  textFaint: '#6A6C94',

  gold: '#FFD166',
  silver: '#C9D1E0',
  bronze: '#E09F6B',
  onMedal: '#2A1F00',

  overlay: 'rgba(6, 6, 16, 0.75)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const radius = {
  sm: 8,
  md: 12,
  lg: 18,
  xl: 24,
  pill: 999,
};

export const typography = {
  title: { fontSize: 28, fontWeight: '800', color: colors.text, letterSpacing: -0.5 },
  subtitle: { fontSize: 15, fontWeight: '500', color: colors.textMuted },
  heading: { fontSize: 18, fontWeight: '700', color: colors.text },
  body: { fontSize: 15, fontWeight: '400', color: colors.text },
  caption: { fontSize: 12, fontWeight: '500', color: colors.textMuted },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
};

export const shadows = {
  card: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  glow: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 14,
    elevation: 8,
  },
};

// Durações das animações (ms)
export const animation = {
  flip: 350,
  hideDelay: 900,
  appearStagger: 45,
};

const theme = { colors, spacing, radius, typography, shadows, animation };
export default theme;
