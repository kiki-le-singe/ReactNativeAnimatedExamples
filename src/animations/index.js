import * as Animatable from 'react-native-animatable';

Animatable.initializeRegistryWithDefinitions({
  myPulse: {
    0: {
      scale: 1,
    },
    0.5: {
      scale: 1.2,
    },
    1: {
      scale: 1,
    },
  },
});
