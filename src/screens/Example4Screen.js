/**
 * @flow
 */

import React, {useState, useRef} from 'react';
import {StyleSheet, View, TouchableHighlight, StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';

import colors from '../utils/colors';
import BulletItemMenu from '../components/BulletItemMenu';

const buttonsData = [0, 1, 2, 3, 4, 5, 6, 7];
const buttonsContainerSize = 180;

const Example4Screen = ({navigation}) => {
  const [state, setState] = useState({disable: false, isOpen: false});
  const handleMainButtonRef = useRef(null);
  const handleButtonsContainerRef = useRef(null);

  const playAnimations = async () => {
    setState({disable: true});

    await handleMainButtonRef.current.pulse(800);
    await handleButtonsContainerRef.current.zoomIn(800);
    await handleButtonsContainerRef.current.animate({
      0: {
        transform: [
          {
            rotate: '0deg',
          },
        ],
      },
      1: {
        transform: [
          {
            rotate: '90deg',
          },
        ],
      },
    });

    setState({disable: false, isOpen: true});
  };
  const playReverseAnimations = async () => {
    setState({disable: true});

    await handleMainButtonRef.current.pulse(500);
    await handleButtonsContainerRef.current.animate(
      {
        0: {
          transform: [
            {
              rotate: '90deg',
            },
          ],
        },
        1: {
          transform: [
            {
              rotate: '0deg',
            },
          ],
        },
      },
      500,
    );
    await handleButtonsContainerRef.current.zoomOut(500);

    setState({disable: false, isOpen: false});
  };
  const onPress = () =>
    state.isOpen ? playReverseAnimations() : playAnimations();
  const renderButtons = () =>
    buttonsData.map((value) => (
      <BulletItemMenu key={`button_${value}`} value={value} />
    ));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.actionsContainer}>
        <Animatable.View
          ref={handleButtonsContainerRef}
          style={styles.buttonsContainer}>
          {renderButtons()}
        </Animatable.View>

        <TouchableHighlight
          disabled={state.disable}
          onPress={onPress}
          style={styles.TouchableHighlight}>
          <Animatable.View
            ref={handleMainButtonRef}
            style={styles.mainButton}
          />
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.black,
  },
  actionsContainer: {
    width: 220,
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsContainer: {
    width: buttonsContainerSize,
    height: buttonsContainerSize,
    borderRadius: buttonsContainerSize,
    position: 'absolute',
    zIndex: 5,
    transform: [{scale: 0}],
  },
  TouchableHighlight: {
    position: 'absolute',
    zIndex: 10,
  },
  mainButton: {
    width: 70,
    height: 70,
    backgroundColor: colors.twitter,
    borderRadius: 70,
  },
});

export default Example4Screen;
