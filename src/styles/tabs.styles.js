import { colors } from '../theme';

// Aparência da barra de abas (usada em src/app/(abas)/_layout.js)
export const tabBarOptions = {
  headerShown: false,
  tabBarActiveTintColor: colors.primary,
  tabBarInactiveTintColor: colors.textFaint,
  tabBarStyle: {
    backgroundColor: colors.surface,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    paddingTop: 6,
  },
  tabBarLabelStyle: {
    fontSize: 11,
    fontWeight: '700',
  },
  sceneStyle: {
    backgroundColor: colors.background,
  },
};
