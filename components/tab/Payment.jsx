import { useState, useEffect } from 'react';
import { View, Alert, StyleSheet, Pressable } from 'react-native';
import { Text, Button } from 'react-native-paper';
import styles from '../../styles/posStyles';
import { IconButton, TextInput } from 'react-native-paper';
import PaymentOptions from '../../components/modals/payOptions.jsx'

export default function PaymentScreen({ paySelect, remaining, setRemaining, setItemPaid }) {
    const tips = [5, 10, 15];

    const [email, setEmail] = useState("");
    const [paymentOptions, setPaymentOptions] = useState(false);
    const [toPay, setToPay] = useState(0.00);
    
    const [pressed, setPressed] = useState(
        tips.reduce((acc, tip) => ({
            ...acc,
            [tip]: false
        }), {})
    );

    function handleButtonPress(amt) {
        const decimalAmt = Number(amt / 100);

        setPressed((prevState) => {
            const wasSelected = prevState[amt];
            const newPressedState = Object.fromEntries(
                tips.map(tip => [tip, false])
            );

            newPressedState[amt] = !wasSelected;

            const updatedTotal = !wasSelected ? Number(total) * Number(1 + decimalAmt) : Number(total);

            setRemaining(updatedTotal.toFixed(2));
            return newPressedState;
        });
    }

    function handlePayment(amt){
        if (!amt){
            return Alert.alert('Please select amount to pay');
        }
        setToPay(amt);
        setPaymentOptions(true);
    }

    function handleSendEmail() {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email === "" || !re.test(email)) {
            return Alert.alert('Please input a valid email address');
        }

        Alert.alert(`Sent receipt to ${email}`);
        setEmail("");
    }

    return (
        <>
            <View style={pStyles.container}>
                <View style={pStyles.box}>
                    <View style={pStyles.buttonRow}>
                        {tips && tips.length > 0 &&
                            tips.map(amt => {
                                return (
                                    <Pressable 
                                        key={amt}
                                        style={!pressed[amt] ? pStyles.unpressedBtn : [pStyles.unpressedBtn, pStyles.pressedBtn]}
                                        onPress={() => handleButtonPress(amt)}>
                                        <Text style={[pStyles.btnText, pStyles.smallBtnText]}>{`${amt}%`}</Text>
                                    </Pressable>
                                );
                            })}
                    </View>
                </View>

                <View style={pStyles.box}>
                    <Pressable style={pStyles.btn}>
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
                <Pressable
                    style={[pStyles.btn, pStyles.textSpacing]}
                    onPress={() => {
                        handlePayment(paySelect);
                    }}>
                    <Text style={pStyles.btnText}>Pay Selected: </Text>
                    <Text style={pStyles.btnText}>${parseFloat(paySelect).toFixed(2)}</Text>
                </Pressable>

                    <Pressable style={[pStyles.btn, pStyles.textSpacing, {marginBottom: 10}]}>
                        <Text style={pStyles.btnText}>Pay Remaining: </Text>
                        <Text style={pStyles.btnText}>${parseFloat(remaining).toFixed(2)}</Text>
                    </Pressable>
                </View>
                <View style={pStyles.box}>
                    <View style={[pStyles.total, pStyles.textSpacing]}>
                        <Text variant='titleMedium'>Total: </Text>
                        <Text variant='titleMedium'>${parseFloat(remaining).toFixed(2)}</Text>
                    </View>
                </View>

                <View style={pStyles.eContainer}>
                    <TextInput
                        style={pStyles.email}
                        placeholder="Email Receipt"
                        value={email}
                        onChangeText={e => setEmail(e)}
                    />
                    <IconButton
                        style={styles.squareButton}
                        icon="send"
                        size={24}
                        mode="contained"
                        selected={true}
                        onPress={handleSendEmail}
                        accessibilityLabel="Send Email"
                    />
                </View>    
            </View>
            <View style={[styles.buttonRow]}>
                <View style={styles.buttonText}>
                    <IconButton 
                        style={styles.squareButton}
                        icon="minus-circle"
                        mode="contained"
                        selected={true}
                        onPress={() => voidItem()}
                        size={30}
                    />
                    <Text variant='bodySmall'>Void Item</Text>
                </View>
                <View style={styles.buttonText}>
                    <IconButton 
                        style={styles.squareButton}
                        icon="minus-circle-multiple"
                        mode="contained"
                        selected={true}
                        size={30}
                        onPress={() => setOrderProducts([])}
                    />
                    <Text variant='bodySmall'>Void Order</Text>
                </View>
            </View> 
            <PaymentOptions 
                visibility={paymentOptions}
                setVisibility={setPaymentOptions}
                toPay={toPay}
                setToPay={setToPay}
                remaining={remaining}
                setRemaining={setRemaining}
            />
        </>
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
        width: '100%',
        justifyContent:'space-between',
        alignItems: 'center'
    },
    btn: {
        backgroundColor: '#58656d',
        borderRadius: 6,
        padding: 12,
        margin: 3
    },
    btnText: {
        color: '#ffffff',
        fontSize: 15,
        marginLeft: 10,
    },
    unpressedBtn: {
        backgroundColor: '#58656d',
        borderRadius: 6,
        alignItems: 'center',
        padding: 12,
        margin: 3,
        width: '30%'
    },
    pressedBtn: {
        backgroundColor: '#4e90a4', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    smallBtnText: {
        marginLeft: 0,
    },
    textSpacing: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        paddingRight: 20,
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
    },

    eContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5
    },
    email: {
        flex: 6,
        backgroundColor: '#ffffff',
        marginRight: 5,
        height: 10
    },
    sendIcon: { 
        color: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
});