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
import {
  HEADER_BACKGROUND_HEIGHT,
  STATUS_BAR_HEIGHT,
  HEADER_HEIGHT,
  SCROLL_SPAN,
} from '../constants';

const Example2Screen = ({navigation}) => {
  const [data, setData] = useState([]);

  const scrollYAnimatedValue = new Animated.Value(0);

  const animatedScaleHeaderBackground = scrollYAnimatedValue.interpolate({
    inputRange: [-HEADER_BACKGROUND_HEIGHT, 0],
    outputRange: [2, 1],
    extrapolateRight: 'clamp',
    extrapolateLeft: 'extend',
  });
  const animatedTranslateYHeaderBackground = scrollYAnimatedValue.interpolate({
    inputRange: [-SCROLL_SPAN, 0, SCROLL_SPAN],
    outputRange: [SCROLL_SPAN / 2, 0, -SCROLL_SPAN / 2],
    extrapolateRight: 'clamp',
    extrapolateLeft: 'extend',
  });
  const animatedOpacityHeaderBackgroundOverlay = scrollYAnimatedValue.interpolate(
    {
      inputRange: [0, SCROLL_SPAN / 2],
      outputRange: [0.3, 0.5],
      extrapolate: 'clamp',
    },
  );
  const animatedScaleTitle = scrollYAnimatedValue.interpolate({
    inputRange: [0, SCROLL_SPAN],
    outputRange: [1.5, 1],
    extrapolate: 'clamp',
  });
  const animatedTranslateYTitle = scrollYAnimatedValue.interpolate({
    inputRange: [-SCROLL_SPAN, 0, SCROLL_SPAN],
    outputRange: [SCROLL_SPAN, SCROLL_SPAN / 2.2, 0],
    extrapolateRight: 'clamp',
    extrapolateLeft: 'extend',
  });

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {y: scrollYAnimatedValue},
        },
      },
    ],
    {
      useNativeDriver: true,
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

  useEffect(() => {
    const array = [];
    for (let i = 1; i <= 30; i++) {
      array.push(i);
    }
    setData(array);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={[styles.headerIconContainer]}
          onPress={onPress}>
          <View style={styles.headerIcon} />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            transform: [
              {
                translateY: animatedTranslateYTitle,
              },
              {
                scale: animatedScaleTitle,
              },
            ],
          }}
          onPress={() => alert('Hey !')}>
          <Animated.Text style={styles.headerTitle}>
            Clickable Title
          </Animated.Text>
        </TouchableOpacity>
      </View>

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
      </Animated.View>

      <Animated.FlatList
        contentContainerStyle={styles.scrollViewContentContainer}
        onScroll={onScroll}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsVerticalScrollIndicator={false}
        initialNumToRender={6}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={30}
        scrollEventThrottle={16}
        overScrollMode="never" // Android
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
    marginTop: SCROLL_SPAN,
    backgroundColor: colors.white,
    paddingTop: 10,
    paddingBottom: SCROLL_SPAN,
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
    height: HEADER_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerIconContainer: {
    position: 'absolute',
    top: STATUS_BAR_HEIGHT + 15,
    left: 20,
  },
  headerIcon: {
    width: 30,
    height: 30,
    backgroundColor: colors.white,
  },
  headerBackground: {
    ...StyleSheet.absoluteFillObject,
    height: HEADER_BACKGROUND_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerBackgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.black,
  },
  headerBackgroundImage: {
    ...StyleSheet.absoluteFillObject,
  },
  headerTitle: {
    fontSize: 24,
    color: colors.white,
  },
});

export default Example2Screen;
