import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const _vw = width / 100;
const _vh = height / 100;

export const vh = value => {
  return value * _vh;
};
export const vw = value => {
  return value * _vw;
};
