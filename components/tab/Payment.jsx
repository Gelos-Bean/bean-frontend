import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, Pressable } from 'react-native';
import styles from '../../styles/posStyles';
import { IconButton, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function PaymentScreen({ paySelect, total }) {
    const tips = [5, 10, 15];

    const [email, setEmail] = useState("");
    const [remaining, setRemaining] = useState(total);

    const [pressed, setPressed] = useState(
        tips.reduce((acc, tip) => ({
            ...acc,
            [tip]: false
        }), {})
    );

    function handleButtonPress(amt) {
        const decimalAmt = amt / 100;

        setPressed((prevState) => {
            const wasSelected = prevState[amt];
            const newPressedState = Object.fromEntries(
                tips.map(tip => [tip, false])
            );
            
            newPressedState[amt] = !wasSelected;

            const updatedTotal = !wasSelected ? 
                total * (1 + decimalAmt) : 
                total;
    
            setRemaining(updatedTotal.toFixed(2));
            return newPressedState;
        });

    }
    
    function handleSendEmail(){
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]/;
        if(email === "" || (!re.test(email))) {
            return Alert.alert('Please input email');            
        }

        Alert.alert(`Sent Email to ${email}`);
        setEmail("");
    }


    return (
        <View style={pStyles.container}>
            <View style={pStyles.box}>
                <View style={pStyles.buttonRow}>
                    {tips && Array.isArray(tips) && tips.length > 0 && 
                        tips.map(amt => {
                            return (
                                <Pressable 
                                    key={amt}
                                    style={!pressed[amt] ? pStyles.unpressedBtn : [pStyles.unpressedBtn, pStyles.pressedBtn] }
                                    onPress={() => handleButtonPress(amt)}>
                                    <Text style={[pStyles.btnText, pStyles.smallBtnText]}>{`${amt}%`}</Text>
                                </Pressable>
                            )
                        })}
                </View>
            </View>

            <View style={pStyles.box}>
                <Pressable style={pStyles.btn}
                    value={custom => setRemaining(total * custom)}>
                    <Text style={pStyles.btnText}>Add Custom Tip</Text>
                </Pressable>
            </View>

            <View style={pStyles.separator} />

            <View style={pStyles.box}>
                <Pressable style={pStyles.btn}>
                    <Text style={pStyles.btnText}>Pay Custom Amount</Text>
                </Pressable>
                <Pressable style={pStyles.btn}>
                    <Text style={pStyles.btnText}>Void Selected Items</Text>
                </Pressable>
                <Pressable style={pStyles.btn}>
                    <Text style={pStyles.btnText}>Add Discount</Text>
                </Pressable>
            </View>

            <View style={pStyles.separator} />

            <View style={pStyles.box}>
                <Pressable style={[pStyles.btn, pStyles.textSpacing]}>
                    <Text style={pStyles.btnText}>Pay Selected: </Text>
                    <Text style={pStyles.btnText}>${paySelect.toFixed(2)}</Text>
                </Pressable>
                <Pressable style={[pStyles.btn, pStyles.textSpacing]}>
                    <Text style={pStyles.btnText}>Pay Remaining: </Text>
                    <Text style={pStyles.btnText}>${remaining}</Text>
                </Pressable>
            </View>
            <View style={pStyles.box}>
                <View style={[pStyles.total, pStyles.textSpacing]}>
                    <Text style={{fontWeight: '600', fontSize: '1.2rem'}}>Total: </Text>
                    <Text style={{fontSize: '1.3rem'}}>${remaining}</Text>
                </View>
            </View>
            <View style={pStyles.box}>
                <View style={pStyles.eContainer}>
                    <TextInput
                        style={pStyles.email}
                        placeholder="Email Receipt"
                        underlineColor
                        value={email}
                        onChangeText={e => setEmail(e)} 
                    />
                    <View style={pStyles.btn}>
                        <Icon name="send" 
                            size={24}
                            style={pStyles.sendIcon}
                            onPress={() => handleSendEmail()}
                            accessibilityLabel="Send Email"
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};


const pStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcf8f2',
        padding: 10,
    },
    box: {
        width: '100%'
    },
    buttonRow: {
        flexDirection: 'row',
        flex: 1,

        width: '100%',
    },
    btn: {
        flex: 1,
        backgroundColor: '#58656d',
        borderRadius: 6,

        padding: 12,
        margin: 3,
    },
    btnText: {
        color: '#ffffff',
        fontWeight: 600,
        marginLeft: 10,
    },
    unpressedBtn: {
        flex: 1,
        backgroundColor: '#58656d',
        borderRadius: 6,
        alignItems: 'center',

        padding: 12,
        margin: 3,
    },
    pressedBtn: {
        backgroundColor: '#4e90a4', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,

    },
    smallBtnText: {
        marginLeft: 0
    },
    textSpacing: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingRight: 20
    },

    separator: {
        width: '100%',
        borderBottomColor: '#9c404d',
        borderBottomWidth: 1,
        marginVertical: 6,
    },

    total: {
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 6,
        padding: 10,
        paddingVertical: 10,
    },

    eContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    email: {
        flex: 6,
        backgroundColor: 'white',
        border: 'none',
        fontSize: '.8rem',
        marginRight: 5,
        paddingVertical: 8,
    },
    sendIcon: { 
        color: '#ffffff',
        transform: [{ rotate: '320deg' }]     
    },
});