import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.screen}>
            <Button
                title="Example 1"
                onPress={() => navigation.navigate('Example1')}
            />
            <Button
                title="Example 2 (useNativeDriver: true)"
                onPress={() => navigation.navigate('Example2')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default HomeScreen;
