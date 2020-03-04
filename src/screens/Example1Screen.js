import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Animated,
    TouchableOpacity,
} from 'react-native';

import colors from '../utils/colors';
import SearchInput from '../components/SearchInput';
import {
    STATUS_BAR_HEIGHT,
    HEADER_HEIGHT,
    HERO_HEIGHT,
    TOTAL_HEIGHT,
    INPUT_CONTAINER_HEIGHT,
} from '../constants';

const Example1Screen = ({ navigation }) => {
    const [data, setData] = useState([]);

    const scrollYValue = new Animated.Value(0);

    const animatedScaleBackground = scrollYValue.interpolate({
        inputRange: [-TOTAL_HEIGHT, 0],
        outputRange: [2, 1],
        extrapolateRight: 'clamp',
        extrapolateLeft: 'extend',
        useNativeDriver: true,
    });

    const animatedScaleYBackground = scrollYValue.interpolate({
        inputRange: [0, TOTAL_HEIGHT],
        outputRange: [1, 0.5],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });

    const animatedTranslateYBackground = scrollYValue.interpolate({
        inputRange: [-TOTAL_HEIGHT, 0, TOTAL_HEIGHT],
        outputRange: [TOTAL_HEIGHT / 2, 0, -TOTAL_HEIGHT / 3],
        // outputRange: [TOTAL_HEIGHT / 2, 0, -TOTAL_HEIGHT / 1.5],
        extrapolateRight: 'clamp',
        extrapolateLeft: 'extend',
        useNativeDriver: true,
    });

    const animatedScaleTitle = scrollYValue.interpolate({
        inputRange: [0, HERO_HEIGHT],
        outputRange: [2, 0],
        // outputRange: [2, 1],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });

    const animatedScaleIconContainer = scrollYValue.interpolate({
        inputRange: [0, HERO_HEIGHT / 2, HERO_HEIGHT - INPUT_CONTAINER_HEIGHT],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });

    const animatedTranslateYTitle = scrollYValue.interpolate({
        inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
        outputRange: [HERO_HEIGHT, HERO_HEIGHT / 2, 0],
        extrapolateRight: 'clamp',
        extrapolateLeft: 'extend',
        useNativeDriver: true,
    });

    const animatedTranslateYInputContainer = scrollYValue.interpolate({
        inputRange: [-HERO_HEIGHT, 0, HERO_HEIGHT],
        outputRange: [HERO_HEIGHT * 2, HERO_HEIGHT, 0],
        extrapolateRight: 'clamp',
        extrapolateLeft: 'extend',
        useNativeDriver: true,
    });

    const animatedWidthInputContainer = scrollYValue.interpolate({
        inputRange: [
            0,
            TOTAL_HEIGHT / 2,
            TOTAL_HEIGHT - (INPUT_CONTAINER_HEIGHT + HEADER_HEIGHT),
        ],
        outputRange: ['100%', '100%', '85%'],
        extrapolate: 'clamp',
    });

    const animatedOpacityOverlay = scrollYValue.interpolate({
        inputRange: [0, TOTAL_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });

    const animatedBackgroundColorHeader = scrollYValue.interpolate({
        inputRange: [
            0,
            TOTAL_HEIGHT / 2,
            TOTAL_HEIGHT - (INPUT_CONTAINER_HEIGHT + HEADER_HEIGHT),
            TOTAL_HEIGHT,
        ],
        outputRange: [
            colors.transparent,
            colors.transparent,
            colors.transparent,
            colors.white,
        ],
        extrapolate: 'clamp',
    });

    const onScroll = Animated.event(
        [
            {
                nativeEvent: {
                    contentOffset: { y: scrollYValue },
                },
            },
        ],
        // { useNativeDriver: true },
    );

    const renderItem = ({ index }) => {
        const paddingTop = index === 0 ? 20 : 0;

        return (
            <View style={[styles.itemContainer, { paddingTop }]}>
                <View style={styles.item} />
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
        <View style={styles.screen}>
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
                    styles.background,
                    {
                        transform: [
                            {
                                translateY: animatedTranslateYBackground,
                            },
                            {
                                scale: animatedScaleBackground,
                            },
                            {
                                scaleY: animatedScaleYBackground,
                            },
                        ],
                    },
                ]}>
                <Image
                    style={styles.image}
                    resizeMode="cover"
                    source={{
                        uri: 'https://picsum.photos/800/400',
                    }}
                />
                <Animated.View
                    style={[
                        styles.overlay,
                        { opacity: animatedOpacityOverlay },
                    ]}
                />
            </Animated.View>

            <Animated.View
                style={[
                    styles.header,
                    { backgroundColor: animatedBackgroundColorHeader },
                ]}>
                <Animated.Text
                    style={[
                        styles.headerText,
                        {
                            transform: [
                                {
                                    translateY: animatedTranslateYTitle,
                                },
                                {
                                    scale: animatedScaleTitle,
                                },
                            ],
                        },
                    ]}>
                    Header Title
                </Animated.Text>

                <Animated.View
                    style={[
                        styles.iconContainer,
                        {
                            // transform: [
                            //     {
                            //         scale: animatedScaleIconContainer,
                            //     },
                            // ],
                        },
                    ]}>
                    <TouchableOpacity onPress={onPress}>
                        <View style={styles.icon} />
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>

            <View style={styles.container}>
                <Animated.FlatList
                    style={styles.flatList}
                    contentContainerStyle={styles.flatListContentContainer}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    keyboardDismissMode="on-drag"
                    initialNumToRender={8}
                    maxToRenderPerBatch={15}
                    updateCellsBatchingPeriod={30}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: colors.white,
    },
    container: {
        flex: 1,
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        height: TOTAL_HEIGHT,
    },
    image: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.blackOpacity,
    },
    header: {
        height: HEADER_HEIGHT,
        paddingTop: STATUS_BAR_HEIGHT,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 28,
        color: colors.white,
    },
    flatList: {
        flex: 1,
    },
    flatListContentContainer: {
        paddingTop: HERO_HEIGHT,
        paddingBottom: 30,
    },
    itemContainer: {
        width: '100%',
        backgroundColor: colors.white,
        paddingBottom: 10,
        paddingHorizontal: 10,
    },
    item: {
        height: 50,
        width: '100%',
        backgroundColor: colors.grey,
    },
    iconContainer: {
        position: 'absolute',
        top: STATUS_BAR_HEIGHT + 10,
        right: 20,
        zIndex: 10,
    },
    icon: {
        width: 30,
        height: 30,
        backgroundColor: colors.grey,
    },
    inputContainer: {
        top: STATUS_BAR_HEIGHT + 5,
    },
});

export default Example1Screen;
