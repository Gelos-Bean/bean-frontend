import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, Pressable } from 'react-native';
import styles from '../../styles/posStyles';
import { IconButton, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';


export default function PaymentScreen({ props }) {
    const testTotal = 150; 
    const tips = [5, 10, 15];

    const [email, setEmail] = useState("");
    const [total, setTotal] = useState(testTotal.toFixed(2));
    const [remaining, setRemaining] = useState(testTotal.toFixed(2));
    const [selected, setSelected] = useState(' -');

    const [pressed, setPressed] = useState({
        5: false,
        10: false,
        15: false,
    });

    function handleButtonPress(amt) {
        const decimalAmt = amt / 100;
        setPressed((prevState) => ({
            ...prevState,
            [amt]: !prevState[amt]
        }));
        
        if(!pressed[amt]) {
            setTotal(total * decimalAmt);
            console.log(total);
        } else {
            setTotal(total * (1 + decimalAmt));
            console.log(total)
        }

       
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
                                    style={[pStyles.btn, pStyles.smallBtn]}
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
                    <Text style={pStyles.btnText}>${selected}</Text>
                </Pressable>
                <Pressable style={[pStyles.btn, pStyles.textSpacing]}>
                    <Text style={pStyles.btnText}>Pay Remaining: </Text>
                    <Text style={pStyles.btnText}>${remaining}</Text>
                </Pressable>
            </View>
            <View style={pStyles.box}>
                <View style={[pStyles.total, pStyles.textSpacing]}>
                    <Text>Total: </Text>
                    <Text>${remaining}</Text>
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
    smallBtn: {
        alignItems: 'center'
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
        paddingVertical: 20,
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