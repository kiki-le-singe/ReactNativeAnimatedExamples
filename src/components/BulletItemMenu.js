/**
 * @flow
 */

import React, {useRef} from 'react';
import {StyleSheet, TouchableHighlight} from 'react-native';
import * as Animatable from 'react-native-animatable';

const buttonsContainerSize = 180;
const buttonsSize = 30;
const buttonPosition = buttonsContainerSize / 2 - buttonsSize / 2;

const BulletItemMenu = ({value}) => {
  const bulletItemRef = useRef(null);

  const onPress = () => bulletItemRef.current.pulse(800);

  return (
    <TouchableHighlight
      style={[
        styles.touchableButtonContainer,
        styles[`touchableButtonContainer${value}`],
      ]}
      onPress={onPress}>
      <Animatable.View
        ref={bulletItemRef}
        style={[styles.button, styles[`button${value}`]]}
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  touchableButtonContainer: {
    position: 'absolute',
  },
  touchableButtonContainer0: {
    left: buttonsSize - 8,
    top: buttonsSize - 8,
  },
  touchableButtonContainer1: {
    left: buttonPosition,
  },
  touchableButtonContainer2: {
    right: buttonsSize - 8,
    top: buttonsSize - 8,
  },
  touchableButtonContainer3: {
    right: 0,
    top: buttonPosition,
  },
  touchableButtonContainer4: {
    right: buttonsSize - 8,
    bottom: buttonsSize - 8,
  },
  touchableButtonContainer5: {
    right: buttonPosition,
    bottom: 0,
  },
  touchableButtonContainer6: {
    left: buttonsSize - 8,
    bottom: buttonsSize - 8,
  },
  touchableButtonContainer7: {
    left: 0,
    top: buttonPosition,
  },
  button: {
    width: buttonsSize,
    height: buttonsSize,
    borderRadius: buttonsSize,
  },
  button0: {
    backgroundColor: '#3498DB',
  },
  button1: {
    backgroundColor: '#A569BD',
  },
  button2: {
    backgroundColor: '#F7DC6F',
  },
  button3: {
    backgroundColor: '#FA5395',
  },
  button4: {
    backgroundColor: '#E74C3C',
  },
  button5: {
    backgroundColor: '#95A5A6',
  },
  button6: {
    backgroundColor: '#E67E22',
  },
  button7: {
    backgroundColor: '#1ABC9C',
  },
});

export default BulletItemMenu;
