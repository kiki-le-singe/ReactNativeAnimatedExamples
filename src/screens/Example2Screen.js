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

const Example2Screen = ({ navigation }) => {
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
        outputRange: [1, 0.7],
        extrapolate: 'clamp',
        useNativeDriver: true,
    });

    const animatedTranslateYBackground = scrollYValue.interpolate({
        inputRange: [-TOTAL_HEIGHT, 0, TOTAL_HEIGHT],
        outputRange: [TOTAL_HEIGHT / 2, 0, -TOTAL_HEIGHT / 2],
        extrapolateRight: 'clamp',
        extrapolateLeft: 'extend',
        useNativeDriver: true,
    });

    const animatedScaleTitle = scrollYValue.interpolate({
        inputRange: [0, HERO_HEIGHT],
        outputRange: [1.5, 0],
        // outputRange: [2, 1],
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

    const animatedTranslateYInputContainerHeader = scrollYValue.interpolate({
        inputRange: [
            0,
            HERO_HEIGHT / 2,
            HERO_HEIGHT - INPUT_CONTAINER_HEIGHT,
            HERO_HEIGHT,
        ],
        outputRange: [
            INPUT_CONTAINER_HEIGHT + 15,
            INPUT_CONTAINER_HEIGHT + 15,
            INPUT_CONTAINER_HEIGHT + 15,
            0,
        ],
        extrapolate: 'clamp',
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
            TOTAL_HEIGHT - INPUT_CONTAINER_HEIGHT,
        ],
        outputRange: [colors.transparent, colors.transparent, colors.white],
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

    const ListHeaderComponent = () => {
        return (
            <SearchInput
                style={{
                    ...styles.inputContainer,
                    width: animatedWidthInputContainer,
                }}
            />
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
                <Animated.Text
                    style={[
                        styles.headerText,
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

            <Animated.View
                style={[
                    styles.header,
                    { backgroundColor: animatedBackgroundColorHeader },
                ]}>
                <SearchInput
                    style={{
                        ...styles.inputContainerHeader,
                        transform: [
                            {
                                translateY: animatedTranslateYInputContainerHeader,
                            },
                        ],
                    }}
                />

                <Animated.View style={[styles.iconContainer]}>
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
                    ListHeaderComponent={ListHeaderComponent}
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        ...StyleSheet.absoluteFillObject,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: colors.blackOpacity,
    },
    header: {
        flexDirection: 'row',
        height: HEADER_HEIGHT,
        paddingTop: STATUS_BAR_HEIGHT,
        alignItems: 'center',
        justifyContent: 'space-between',
        overflow: 'hidden',
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
        right: 20,
        zIndex: 10,
    },
    icon: {
        width: 30,
        height: 30,
        backgroundColor: colors.grey,
    },
    inputContainer: {
        top: -INPUT_CONTAINER_HEIGHT - 10,
    },
    inputContainerHeader: {
        position: 'relative',
        width: '85%',
    },
});

export default Example2Screen;
