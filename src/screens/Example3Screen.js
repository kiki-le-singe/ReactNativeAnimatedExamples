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
import {STATUS_BAR_HEIGHT, HEADER_HEIGHT} from '../constants';
import {vh} from '../utils/units';

const HEADER_BACKGROUND_HEIGHT = vh(16);
const SCROLL_SPAN = HEADER_BACKGROUND_HEIGHT - HEADER_HEIGHT;

const TITLE = 'My Title';

const Example3Screen = ({navigation}) => {
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
      inputRange: [0, SCROLL_SPAN, SCROLL_SPAN + HEADER_BACKGROUND_HEIGHT],
      outputRange: [0, 0, 0.5],
      extrapolate: 'clamp',
    },
  );
  const animatedOpacityTitle = scrollYAnimatedValue.interpolate({
    inputRange: [0, SCROLL_SPAN + HEADER_BACKGROUND_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const animatedTranslateYTitle = scrollYAnimatedValue.interpolate({
    inputRange: [0, SCROLL_SPAN + HEADER_BACKGROUND_HEIGHT],
    outputRange: [SCROLL_SPAN + 10, 0],
    extrapolate: 'clamp',
  });

  const animatedTranslateYProfilePicture = scrollYAnimatedValue.interpolate({
    inputRange: [0, SCROLL_SPAN],
    outputRange: [0, SCROLL_SPAN - 15],
    extrapolate: 'clamp',
  });

  const animatedScaleProfilePicture = scrollYAnimatedValue.interpolate({
    inputRange: [0, SCROLL_SPAN],
    outputRange: [1.5, 1],
    extrapolate: 'clamp',
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
  const ListHeaderComponent = () => {
    return (
      <View style={styles.listHeader}>
        <Animated.Image
          source={{
            uri: 'https://picsum.photos/id/102/4320/3240',
          }}
          style={[
            styles.profilePicture,
            {
              transform: [
                {
                  translateY: animatedTranslateYProfilePicture,
                },
                {
                  scale: animatedScaleProfilePicture,
                },
              ],
            },
          ]}
        />
        <Text style={styles.listHeaderTitle}>{TITLE}</Text>
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

        <Animated.Text
          style={[
            styles.headerTitle,
            {
              transform: [
                {
                  translateY: animatedTranslateYTitle,
                },
              ],
              opacity: animatedOpacityTitle,
            },
          ]}>
          {TITLE}
        </Animated.Text>
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
            uri: 'https://picsum.photos/id/1011/5472/3648',
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
        ListHeaderComponent={ListHeaderComponent}
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
    backgroundColor: colors.black,
  },
  scrollViewContentContainer: {
    marginTop: SCROLL_SPAN,
    backgroundColor: colors.black,
    // paddingTop: 50,
    paddingTop: 10,
    paddingBottom: SCROLL_SPAN,
    paddingHorizontal: 20,
  },
  item: {
    borderRadius: 10,
    marginVertical: 10,
    height: 100,
    backgroundColor: colors.twitter,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    width: 40,
    height: 40,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.black,
    position: 'absolute',
    top: -30,
    left: 8,
    zIndex: 10,
  },
  header: {
    height: HEADER_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
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
  listHeader: {
    backgroundColor: 'red',
    paddingTop: 32,
    // marginTop: 32,
  },
  listHeaderTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white,
  },
});

export default Example3Screen;
