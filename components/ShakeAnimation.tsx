import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat, withSequence} from 'react-native-reanimated'
import { useFocusEffect } from '@react-navigation/native';
import React from 'react'

type Props = {
    children: React.ReactNode;
    focused: boolean;
}

export default function ShakeAnimation({ children, focused }: Props) {
    const rotationAnimation = useSharedValue(0);

    useFocusEffect(
        React.useCallback(() => {
            if (focused) {
                rotationAnimation.value = withRepeat(
                    withSequence(withTiming(25, { duration: 150 }), withTiming(0, { duration: 150 })),
                    1
                );
            }
        }, [focused])
    );

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${rotationAnimation.value}deg` }],
    }));

    return <Animated.View style={animatedStyle}>{children}</Animated.View>
}