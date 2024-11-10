import { useState, useEffect } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Text, IconButton, TextInput, Button } from 'react-native-paper';
import PaymentOptions from '../modals/PayOptions.jsx';
import UserInput from '../../components/modals/UserInput.jsx';
import Discount from '../modals/Discount.jsx';


import styles from '../../styles/posStyles'; 

export default function PaymentScreen({ 
        total, 
        remaining, 
        setRemaining, 
        toPay, 
        setToPay,
        disableOncePaid
    }){

    const tips = [5, 10, 15];

    const [email, setEmail] = useState("");
    const [pressed, setPressed] = useState(
            tips.reduce((acc, tip) => ({...acc, [tip]: false}), {}));
    const [inputView, setInputView] = useState(false); 
    const [paymentOptions, setPaymentOptions] = useState(false);
    const [customAmount, setCustomAmount] = useState(0.00);
    const [customTip, setCustomTip] = useState(0.00);
    const [discount, setDiscount] = useState(null);
    const [discountModal, setDiscountModal] = useState(false);
    const [userInputConfig, setUserInputConfig] = useState(null);

    useEffect(() => {
        if (customAmount > 0 && !inputView) {
            handleCustomPayment();
        }
    }, [customAmount, inputView]);

    useEffect(() => {
        if (customTip > 0 && !inputView) {
            handleCustomTip();
        }
    }, [customTip, inputView])

    useEffect(() => {
        if (discount !== null && !discountModal) {
            handleDiscount();
        }
    }, [discount, discountModal])

    // Handles the button press for Tips 
    // Cycles through each button. Tap twice to remove tip
    function handleTipsButtons(amt) {
        const decimalAmt = amt / 100;

        setPressed((prevState) => {
            const wasSelected = prevState[amt];
            const newPressedState = tips.map(tip => [tip, false]);

            newPressedState[amt] = !wasSelected;
            const updatedTotal = !wasSelected ? total * (1 + decimalAmt) : total;

            setRemaining(updatedTotal);
            return newPressedState;
        });
    }

    function handleCustomTip(add = true) {
        let remainTip = Number(remaining);
        let tip = Number(customTip);
        add ? remainTip += tip : remainTip -= tip;

        setRemaining(remainTip);
        if (!add) setCustomTip(0);
    }

    function handleDiscount(add = true) {
        let totalDiscount = Number(total);
        let [amt, type] = discount;

        if (type) {
            let t = 1 - Number(amt);
            add ? totalDiscount *= Number(t) : total;
        } else {
            add ? totalDiscount -= Number(amt) : total;
        }
        
        setRemaining(totalDiscount);

        if (!add) setDiscount(null);
    }
    // allows dynamic use of the UserInput modal
    function handleUserInput(title, keyboard, stateFunction){
        setUserInputConfig({
            title: title,
            keyboard: keyboard,
            setValue: (value) => stateFunction(value)
        });
        setInputView(true);
    }


    function handleCustomPayment(){

        let r = Number(remaining - customAmount)
        let calcRemain = r > 0 ? r : 0;
        setRemaining(calcRemain);

        // makes sure largest amount that toPay can be is the remaining
        // amount of the tab. Remaining will never go into negative.
        r < 0 ? setToPay(Number(remaining)) : setToPay(Number(customAmount));

        setPaymentOptions(true);

        //disables ability to select items when custom payment amount is chosen
        disableOncePaid(1);
    }
    

    function handlePayment(amt, payFull = false){
        if (!amt){
            return Alert.alert('Please select amount to pay');
        }

        setToPay(amt);
        setPaymentOptions(true);
        setCustomAmount(-1);

        if(payFull) setRemaining(0);     
    }

    function handleSendEmail() {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email === "" || !re.test(email)) {
            return Alert.alert('Please input a valid email address');
        }

        Alert.alert(`Sent receipt to ${email}`);
        setEmail("");
    }


    function handleVoidItem(itemId) {
    }

    return (
        <View style={pStyles.container}>
            <View style={styles.buttonColumn}>
                <View style={styles.buttonRow}>
                    {tips && tips.length > 0 &&
                        tips.map(amt => {
                            return (
                                <Button 
                                    key={amt}
                                    style={!pressed[amt] ? styles.squareButton : [styles.squareButton, pStyles.pressedBtn]}
                                    mode="contained"
                                    onPress={() => handleTipsButtons(amt)}>
                                    {amt}%
                                </Button>
                            );
                        })}
                </View>

                <View style={styles.buttonRow}>
                    <Button style={[styles.squareButton, styles.wideButton, pStyles.textSpacing]}
                        mode="contained"
                        onPress={() => handleUserInput("Custom Tip", "numeric", setCustomTip)}
                        onLongPress={() => handleCustomTip(false)}>
                        Add Custom Tip {customTip > 0 && `: $${parseFloat(customTip).toFixed(2)}`}
                    </Button>
                </View>

                <View style={pStyles.separator} />

                <View style={styles.buttonRow}>
                    <Button style={[styles.squareButton, styles.wideButton, pStyles.textSpacing]}
                            mode="contained"
                            onPress={() => handleUserInput("Pay Custom", "numeric", setCustomAmount) }
                            disabled={customAmount >= 0 ? false : true}>
                        Pay Custom Amount{ customAmount > 0 && `: $${parseFloat(customAmount).toFixed(2)}`}
                    </Button>
                </View>
                <View style={styles.buttonRow}>
                    <Button style={[styles.squareButton, styles.wideButton, pStyles.textSpacing]}
                        mode="contained"
                        icon="percent"
                        onPress={() => setDiscountModal(true)}
                        onLongPress={() => handleDiscount(false)}>
                        Add Discount
                    </Button>
                </View>

                <View style={pStyles.separator} />

                <View style={styles.buttonRow}>
                    <Button
                        style={[styles.squareButton, styles.wideButton, pStyles.textSpacing]}
                        mode="contained"
                        onPress={() => { handlePayment(toPay) }}>                        
                        Pay Selected: 
                        ${parseFloat(toPay).toFixed(2)}
                    </Button>
                </View>
                <View style={styles.buttonRow}>
                    <Button style={[styles.squareButton, styles.wideButton, pStyles.textSpacing, {marginBottom: 10}]}
                        mode="contained"
                        icon="cash"
                        onPress={() => handlePayment(remaining, true)}>
                        Pay Remaining: 
                        ${parseFloat(remaining).toFixed(2)}
                    </Button>
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
                        onPress={() => handleVoidItem()}
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
                disableItems={disableOncePaid}
                remaining={remaining}
                toPay={toPay}
                visibility={paymentOptions}
                setToPay={setToPay}
                setVisibility={setPaymentOptions}
            />

            
            <UserInput 
                visibility={inputView}
                setVisibility={setInputView}

                {...userInputConfig}
            />

            <Discount 
                visibility={discountModal}
                setVisibility={setDiscountModal}
                setValue={setDiscount}
                remaining = {Number(remaining)}
                total = {total}
            />
        </View>
    );
};

const pStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcf8f2',
        padding: 5,
    },
    box: {
        width: '100%'
    },
    btn: {
        backgroundColor: '#58656d',
        borderRadius: 6,
        padding: 12,
        margin: 3
    },
    pressedBtn: {
        backgroundColor: '#8F5100', 
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
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