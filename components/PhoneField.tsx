import React, { useState, useRef } from "react";
import {
    SafeAreaView,
    StyleSheet,
    View,
    StatusBar,
    TouchableOpacity,
    Text,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { Colors } from "react-native/Libraries/NewAppScreen";
import Toast from "react-native-toast-message";

type Props = {
    componentStyles?: any;
    setNumberValue: (value: string) => void;
};

const PhoneField = ({ setNumberValue, componentStyles }: Props) => {
    const [value, setValue] = useState("");
    const [formattedValue, setFormattedValue] = useState("");
    const phoneInput = useRef<PhoneInput>(null);

    const showToast = ({ type, text1, text2 }: any) => {
        Toast.show({
            type: type,
            text1: text1,
            text2: text2
        });
    }

    const formatPhoneNumber = (number: string) => {
        // Remove non-numeric characters
        const cleaned = ('' + number).replace(/\D/g, '');

        // Format according to the pattern +XX XXX-XXX-XXXX
        const match = cleaned.match(/^(\d{2})(\d{3})(\d{3})(\d{4})$/);

        if (match) {
            setFormattedValue(`+${match[1]} ${match[2]}-${match[3]}-${match[4]}`);
        }
    };

    return (
        <View style={[styles.container, { ...componentStyles }]}>
            <SafeAreaView style={styles.wrapper}>
                <PhoneInput
                    ref={phoneInput}
                    defaultValue={value}
                    defaultCode="PH"
                    layout="first"
                    textContainerStyle={{
                        backgroundColor: '#FFF',
                    }}
                    codeTextStyle={{
                        fontFamily: 'Regular',
                    }}

                    textInputStyle={{
                        fontFamily: 'Regular',
                    }}
                    containerStyle={{
                        marginBottom: 20
                    }}
                    onChangeText={(text) => {
                        setValue(text);
                    }}
                    onChangeFormattedText={(text) => {
                        formatPhoneNumber(text);
                    }}
                    withShadow
                    autoFocus
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (phoneInput.current?.isValidNumber(value)) {
                            setNumberValue(formattedValue);
                        } else {
                            showToast({ type: 'error', text1: 'Error', text2: 'Invalid phone number!' });
                        }
                    }}
                >
                    <Text style={styles.buttonText}>SUBMIT</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
    },
    wrapper: {
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        padding: 10,
        width: '100%',
        backgroundColor: '#7EC6FF',
        borderRadius: 5,
    },

    buttonText: {
        color: '#fff',
        fontFamily: 'Bold',
        fontSize: 16,
        textAlign: 'center'
    },

    message: {
        marginTop: 10,
    },
});

export default PhoneField;