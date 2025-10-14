type TStyle = {
  container?: string;
  field?: TStyleMode;
  iconDark?: TStyleMode;
  iconLight?: TStyleMode;
  switch?: TStyleMode;
};

type TStyleIcon = {
  dark?: React.ReactNode;
  light?: React.ReactNode;
};

type TStyleMode = {
  dark?: string;
  light?: string;
};

type TThemeSwitcher = {
  iconDark: React.ReactNode | TStyleIcon;
  iconLight: React.ReactNode | TStyleIcon;
  style?: TStyle;
};

export type { TStyleIcon, TStyleMode, TThemeSwitcher };
