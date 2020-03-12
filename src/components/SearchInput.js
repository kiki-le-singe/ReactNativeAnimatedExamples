import React from 'react';
import { StyleSheet, Animated, TextInput } from 'react-native';

import { INPUT_CONTAINER_HEIGHT } from '../constants';
import colors from '../utils/colors';

const SearchInput = ({ style }) => {
    const [value, onChangeText] = React.useState('');
    const _onChangeText = text => onChangeText(text);

    return (
        <Animated.View
            pointerEvents="box-none"
            style={[styles.inputContainer, { ...style }]}>
            <TextInput
                style={styles.input}
                placeholder="Placeholder"
                onChangeText={_onChangeText}
                value={value}
            />
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    inputContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        zIndex: 10,
        height: INPUT_CONTAINER_HEIGHT,
        paddingHorizontal: 10,
    },
    input: {
        width: '100%',
        height: '100%',
        borderColor: colors.grey,
        backgroundColor: colors.white,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});

export default SearchInput;
