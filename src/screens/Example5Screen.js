/**
 * @flow
 */

import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Button,
  StatusBar,
  FlatList,
  Text,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import colors from '../utils/colors';

const Example5Screen = () => {
  const [data, setData] = useState([]);
  const [animation, setAnimation] = useState('fadeIn');

  const keyExtractor = (item, index) => `item_${index}`;
  const renderItem = ({index}) => {
    const delay = index * 200;

    return (
      <Animatable.View animation={animation} delay={delay} style={styles.item}>
        <Text>{index}</Text>
      </Animatable.View>
    );
  };
  const updateAnimation = (animationName) => {
    if (animationName !== animation) {
      setData([]);
    }
    setAnimation(animationName);
  };

  useEffect(() => {
    if (animation) {
      const array = [];
      for (let i = 1; i <= 30; i++) {
        array.push(i);
      }
      setData(array);
    }
  }, [animation]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Button title="FadeIn" onPress={() => updateAnimation('fadeIn')} />
        <Button title="FadeInUp" onPress={() => updateAnimation('fadeInUp')} />
        <Button
          title="FadeInLeft"
          onPress={() => updateAnimation('fadeInLeft')}
        />
        <Button title="FlipInX" onPress={() => updateAnimation('flipInX')} />
        <Button title="FlipInY" onPress={() => updateAnimation('flipInY')} />
        <Button
          title="LightSpeedIn"
          onPress={() => updateAnimation('lightSpeedIn')}
        />
        <Button title="ZoomIn" onPress={() => updateAnimation('zoomIn')} />
        <Button
          title="ZoomInDown"
          onPress={() => updateAnimation('zoomInDown')}
        />
        <Button title="ZoomInUp" onPress={() => updateAnimation('zoomInUp')} />
        <Button
          title="ZoomInLeft"
          onPress={() => updateAnimation('zoomInLeft')}
        />
        <Button
          title="MyPulseList"
          onPress={() => updateAnimation('myPulseList')}
        />
      </ScrollView>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.flatListContentContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
  },
  flatListContentContainer: {
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
});

export default Example5Screen;
