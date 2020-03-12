/**
 * @flow
 */

import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';

import colors from '../utils/colors';
import {
    HEADER_BACKGROUND_HEIGHT,
    STATUS_BAR_HEIGHT,
    HEADER_HEIGHT,
} from '../constants';
import SearchInput from '../components/SearchInput';

const Example3Screen = ({ navigation }) => {
    const [data, setData] = useState([]);

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
    const animatedTranslateYHeaderBackground = scrollYAnimatedValue.interpolate(
        {
            inputRange: [
                -HEADER_BACKGROUND_HEIGHT,
                0,
                HEADER_BACKGROUND_HEIGHT,
            ],
            outputRange: [
                HEADER_BACKGROUND_HEIGHT / 2,
                0,
                -HEADER_BACKGROUND_HEIGHT / 2,
            ],
            extrapolateRight: 'clamp',
            extrapolateLeft: 'extend',
            // useNativeDriver: true,
        },
    );
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
            HEADER_BACKGROUND_HEIGHT * 2 - HEADER_HEIGHT,
            HEADER_BACKGROUND_HEIGHT - HEADER_HEIGHT,
            0,
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

    const onScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: { y: scrollYAnimatedValue },
                },
            },
        ],
        // { useNativeDriver: true },
    );
    const renderItem = ({ index }) => {
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
            <Animated.View
                style={[
                    styles.header,
                    { backgroundColor: animatedBackgroundColorHeader },
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
                        { opacity: animatedOpacityHeaderBackgroundOverlay },
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
        top: STATUS_BAR_HEIGHT + 5,
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

export default Example3Screen;
