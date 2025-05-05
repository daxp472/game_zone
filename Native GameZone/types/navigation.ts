import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
  intro: undefined;
  access: undefined;
  login: undefined;
  signup: undefined;
  '(tabs)': NavigatorScreenParams<TabParamList>;
  '+not-found': undefined;
};

export type TabParamList = {
  index: undefined;
  multiplayer: undefined;
  'spin-wheel': undefined;
  tournament: undefined;
  profile: undefined;
};