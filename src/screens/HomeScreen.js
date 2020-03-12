import React from 'react';
import { Button, View, StyleSheet } from 'react-native';

const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.screen}>
            <Button
                title="Example 1"
                onPress={() => navigation.navigate('Example1')}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});

export default HomeScreen;
