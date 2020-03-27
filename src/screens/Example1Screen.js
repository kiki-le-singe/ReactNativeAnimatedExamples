/**
 * @flow
 */

import React, {useState, useEffect, useRef} from 'react';
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
import {
  HEADER_BACKGROUND_HEIGHT,
  STATUS_BAR_HEIGHT,
  HEADER_HEIGHT,
  INPUT_CONTAINER_HEIGHT,
} from '../constants';
import SearchInput from '../components/SearchInput';

const Example1Screen = ({navigation}) => {
  const [data, setData] = useState([]);
  const flatlistRef = useRef(null);

  const scrollYAnimatedValue = new Animated.Value(0);

  const animatedScaleHeaderBackground = scrollYAnimatedValue.interpolate({
    inputRange: [-HEADER_BACKGROUND_HEIGHT, 0],
    outputRange: [2, 1],
    extrapolateRight: 'clamp',
    extrapolateLeft: 'extend',
    // useNativeDriver: true,
  });
  const animatedScaleYHeaderBackground = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_BACKGROUND_HEIGHT],
    outputRange: [1, 0.8],
    extrapolate: 'clamp',
    // useNativeDriver: true,
  });
  const animatedTranslateYHeaderBackground = scrollYAnimatedValue.interpolate({
    inputRange: [-HEADER_BACKGROUND_HEIGHT, 0, HEADER_BACKGROUND_HEIGHT],
    outputRange: [
      HEADER_BACKGROUND_HEIGHT / 2,
      0,
      -HEADER_BACKGROUND_HEIGHT / 2,
    ],
    extrapolateRight: 'clamp',
    extrapolateLeft: 'extend',
    // useNativeDriver: true,
  });
  const animatedOpacityHeaderBackgroundOverlay = scrollYAnimatedValue.interpolate(
    {
      inputRange: [0, HEADER_BACKGROUND_HEIGHT / 2],
      outputRange: [1, 0],
      extrapolate: 'clamp',
      // useNativeDriver: true,
    },
  );

  const animatedScaleTitle = scrollYAnimatedValue.interpolate({
    inputRange: [0, HEADER_BACKGROUND_HEIGHT - HEADER_HEIGHT],
    outputRange: [1.5, 0],
    extrapolate: 'clamp',
    // useNativeDriver: true,
  });

  const animatedBackgroundColorHeader = scrollYAnimatedValue.interpolate({
    inputRange: [
      0,
      HEADER_BACKGROUND_HEIGHT / 2,
      HEADER_BACKGROUND_HEIGHT - HEADER_HEIGHT,
    ],
    outputRange: [colors.transparent, colors.transparent, colors.white],
    extrapolate: 'clamp',
  });

  const animatedTranslateYInputContainer = scrollYAnimatedValue.interpolate({
    inputRange: [
      -HEADER_BACKGROUND_HEIGHT,
      0,
      HEADER_BACKGROUND_HEIGHT - HEADER_HEIGHT,
    ],
    outputRange: [
      HEADER_BACKGROUND_HEIGHT,
      0,
      -HEADER_BACKGROUND_HEIGHT + HEADER_HEIGHT,
    ],
    extrapolateRight: 'clamp',
    extrapolateLeft: 'extend',
    // useNativeDriver: true,
  });

  const animatedWidthInputContainer = scrollYAnimatedValue.interpolate({
    inputRange: [
      0,
      HEADER_BACKGROUND_HEIGHT / 2,
      HEADER_BACKGROUND_HEIGHT - HEADER_HEIGHT,
    ],
    outputRange: ['100%', '100%', '85%'],
    extrapolate: 'clamp',
  });

  const onScrollListener = async event => {
    const offsetY = event.nativeEvent.contentOffset.y;

    if (offsetY >= HEADER_BACKGROUND_HEIGHT - HEADER_HEIGHT) {
      StatusBar.setBarStyle('dark-content', true);
    } else if (offsetY <= HEADER_HEIGHT + HEADER_HEIGHT) {
      StatusBar.setBarStyle('light-content', true);
    }
  };
  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollYAnimatedValue},
        },
      },
    ],
    {
      listener: onScrollListener,
      useNativeDriver: false,
    },
  );
  const renderItem = ({index}) => {
    return (
      <View style={styles.item}>
        <Text>{index}</Text>
      </View>
    );
  };
  const keyExtractor = (item, index) => `item_${index}`;
  const onPress = () => navigation.goBack();
  const onFocus = () => {
    if (scrollYAnimatedValue.__getValue() <= HEADER_BACKGROUND_HEIGHT) {
      flatlistRef.current.scrollToOffset({
        offset: HEADER_BACKGROUND_HEIGHT - HEADER_HEIGHT + 5,
        animated: true,
      });
    }
  };

  useEffect(() => {
    const array = [];
    for (let i = 1; i <= 30; i++) {
      array.push(i);
    }
    setData(array);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" animated />

      <Animated.View
        style={[
          styles.header,
          {backgroundColor: animatedBackgroundColorHeader},
        ]}
        pointerEvents="box-none">
        <TouchableOpacity
          style={[styles.headerIconContainer]}
          onPress={onPress}>
          <View style={styles.headerIcon} />
        </TouchableOpacity>
      </Animated.View>

      <SearchInput
        style={{
          ...styles.inputContainer,
          transform: [
            {
              translateY: animatedTranslateYInputContainer,
            },
          ],
          width: animatedWidthInputContainer,
        }}
        onFocus={onFocus}
      />

      <Animated.View
        style={[
          styles.headerBackground,
          {
            transform: [
              {
                translateY: animatedTranslateYHeaderBackground,
              },
              {
                scale: animatedScaleHeaderBackground,
              },
              {
                scaleY: animatedScaleYHeaderBackground,
              },
            ],
          },
        ]}>
        <Image
          source={{
            uri: 'https://picsum.photos/800/400',
          }}
          style={styles.headerBackgroundImage}
        />
        <Animated.View
          style={[
            styles.headerBackgroundOverlay,
            {opacity: animatedOpacityHeaderBackgroundOverlay},
          ]}
        />
        <Animated.Text
          style={[
            styles.headerBackgroundTitle,
            {
              transform: [
                {
                  scale: animatedScaleTitle,
                },
              ],
            },
          ]}>
          Header Title
        </Animated.Text>
      </Animated.View>

      <Animated.FlatList
        ref={flatlistRef}
        contentContainerStyle={styles.scrollViewContentContainer}
        onScroll={onScroll}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={30}
        scrollEventThrottle={16}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollViewContentContainer: {
    marginTop: HEADER_BACKGROUND_HEIGHT,
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingBottom: HEADER_BACKGROUND_HEIGHT,
    paddingHorizontal: 20,
  },
  item: {
    borderRadius: 10,
    marginVertical: 10,
    height: 100,
    backgroundColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    height: HEADER_HEIGHT,
  },
  headerIconContainer: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT + 10,
    right: 20,
  },
  headerIcon: {
    width: 30,
    height: 30,
    backgroundColor: colors.grey,
  },
  inputContainer: {
    top: HEADER_BACKGROUND_HEIGHT - INPUT_CONTAINER_HEIGHT - 15,
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    height: HEADER_BACKGROUND_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBackgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.blackOpacity,
  },
  headerBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  headerBackgroundTitle: {
    fontSize: 28,
    color: colors.white,
  },
});

export default Example1Screen;
