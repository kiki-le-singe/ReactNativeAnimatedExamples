import React from 'react';
import { StyleSheet, Animated, TextInput } from 'react-native';

import { INPUT_CONTAINER_HEIGHT, STATUS_BAR_HEIGHT } from '../constants';
import colors from '../utils/colors';

const SearchInput = ({ style, onFocus }) => {
    const [value, onChangeText] = React.useState('');
    const _onChangeText = text => onChangeText(text);
    const _onFocus = () => onFocus();

    return (
        <Animated.View
            pointerEvents="box-none"
            style={[styles.inputContainer, { ...style }]}>
            <TextInput
                style={styles.input}
                placeholder="Placeholder"
                placeholderTextColor={colors.grey}
                onChangeText={_onChangeText}
                onFocus={_onFocus}
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
        color: colors.black,
        borderWidth: 1,
        paddingHorizontal: 10,
    },
});

export default SearchInput;
