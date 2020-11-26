import React from 'react';
import {Button, View, StyleSheet, Text} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const HomeScreen = ({navigation}) => {
  return (
    <View style={styles.screen}>
      {global.HermesInternal == null ? null : (
        <View style={styles.engine}>
          <Text style={styles.footer}>Engine: Hermes</Text>
        </View>
      )}

      <Button
        title="Example 1"
        onPress={() => navigation.navigate('Example1')}
      />
      <Button
        title="Example 2"
        onPress={() => navigation.navigate('Example2')}
      />
      <Button
        title="Example 3"
        onPress={() => navigation.navigate('Example3')}
      />
      <Button
        title="Example 4"
        onPress={() => navigation.navigate('Example4')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  engine: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default HomeScreen;
