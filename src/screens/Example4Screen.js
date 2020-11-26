/**
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Animated,
  Image,
  Text,
  TouchableOpacity,
  StatusBar,
} from 'react-native';

import colors from '../utils/colors';

const buttonsContainerSize = 100;
const buttonsSize = 20;
const buttonPosition = buttonsContainerSize / 2 - buttonsSize / 2;

const Example4Screen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.actionsContainer}>
        <View style={styles.buttonsContainer}>
          <View style={[styles.button, styles.button1]} />
          <View style={[styles.button, styles.button2]} />
          <View style={[styles.button, styles.button3]} />
          <View style={[styles.button, styles.button4]} />
          <View style={[styles.button, styles.button5]} />
          <View style={[styles.button, styles.button6]} />
          <View style={[styles.button, styles.button7]} />
          <View style={[styles.button, styles.button8]} />
        </View>
        <View style={styles.mainButton} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsContainer: {
    width: 220,
    height: 220,
    backgroundColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    width: buttonsContainerSize,
    height: buttonsContainerSize,
    backgroundColor: colors.transparent,
    position: 'absolute',
    zIndex: 5,
  },
  button: {
    width: 20,
    height: 20,
    position: 'absolute',
    backgroundColor: 'green',
  },
  button1: {
    backgroundColor: 'blue',
    left: 0,
  },
  button2: {
    backgroundColor: 'purple',
    left: buttonPosition,
  },
  button3: {
    backgroundColor: 'yellow',
    right: 0,
  },
  button4: {
    backgroundColor: 'pink',
    right: 0,
    top: buttonPosition,
  },
  button5: {
    backgroundColor: 'brown',
    right: 0,
    bottom: 0,
  },
  button6: {
    backgroundColor: 'magenta',
    right: buttonPosition,
    bottom: 0,
  },
  button7: {
    backgroundColor: 'orange',
    left: 0,
    bottom: 0,
  },
  button8: {
    left: 0,
    top: buttonPosition,
  },
  mainButton: {
    width: 150,
    height: 150,
    backgroundColor: colors.twitter,
    borderRadius: 150,
    position: 'absolute',
    zIndex: 10,
  },
});

export default Example4Screen;
