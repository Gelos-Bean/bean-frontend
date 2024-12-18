import { useState, useEffect, useContext, memo } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import { Text, IconButton, TextInput, Button } from 'react-native-paper';

import PaymentOptions from '../modals/PayOptions.jsx';
import UserInput from '../modals/UserInput.jsx';
import Discount from '../modals/Discount.jsx';
import ManagerOverride from '../modals/ManagerOverride.jsx';
import { AuthContext } from '../../app/context/AuthContext.jsx';

import styles from '../../styles/posStyles'; 

const MemoPaymentOptions = memo(PaymentOptions);
const MemoUserInput = memo(UserInput);
const MemoDiscount = memo(Discount);

export default function PaymentScreen({ 
        total, 
        remaining, 
        setRemaining, 
        toPay, 
        setToPay,
        passData,
        disableItems,
        setConfirmDelete
    }){

    const { isManager } = useContext(AuthContext);

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
    const [paidInFull, setPaidInFull] = useState(false);
    const [remainZero, setRemainZero] = useState(false);
    const [override, setOverride] = useState(false);

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

    useEffect(() => {
        if(paidInFull) {
            setConfirmDelete(true);
        }
    }, [paidInFull])


    // Handles the button press for Tips 
    // Cycles through each button. Tap twice to remove tip
    function handleTipsButtons(amt) {
        const decimalAmt = amt / 100;

        setPressed((prevState) => {
            const wasSelected = prevState[amt];
            const newPressedState = tips.map(tip => [tip, false]);

            newPressedState[amt] = !wasSelected;
            const updatedTotal = !wasSelected ? total * (1 + decimalAmt) : total;

            setRemaining(Math.max(0, updatedTotal));
            return newPressedState;
        });
    }

    function handleCustomTip(add = true) {
        let remainTip = Number(remaining);
        let tip = Number(customTip);
        add ? remainTip += tip : remainTip -= tip;

        setRemaining(Math.max(0, remainTip));
        if (!add) setCustomTip(0);
    }


    function handleCustomPayment(){
        let r = Number(remaining - customAmount)
        let calcRemain = r > 0 ? r : 0;
        setRemaining(calcRemain);
        
        // makes sure largest amount that toPay can be is the remaining
        // amount of the tab. Remaining will never go into negative.
        r < 0 ? setToPay(Number(remaining)) : setToPay(Number(customAmount));

        setPaymentOptions(true);
    }

    function handlePayment(amt, paidInFull = false){
        if (!amt){
            return Alert.alert('Please select amount to pay');
        }
        if (paidInFull)
            setRemainZero(true);
        
        setToPay(amt);
        setPaymentOptions(true);
    }

    function onDismiss() {
        if (customAmount > 0) {
            //configure for handleCustomPayment function
            disableItems(1);
            setCustomAmount(0);
        } else { 
            //configure for handlePayment function
            //disables ability to select items when custom payment amount is chosen
            setCustomAmount(-1);

            if(remainZero)
                setRemaining(0);
        }
        if(remainZero) 
            setPaidInFull(true);
    }


    function handleDiscount(add = true) {
        if (!discount) return;
        let totalDiscount = Number(total);
        let [amt, type] = discount;

        if (type) {
            let t = 1 - Number(amt);
            add ? totalDiscount *= Number(t) : total;
        } else {
            add ? totalDiscount -= Number(amt) : total;
        }
        
        setRemaining(Math.max(0, totalDiscount));

        if (!add) setDiscount(null);
    }

    // allows dynamic use of the UserInput modal
    function handleUserInput(title, keyboard, stateFunction){
        setUserInputConfig({
            title: title,
            keyboard: keyboard,
            setValue: stateFunction
        });
        setInputView(true);
    }

    function handleSendEmail() {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (email === "" || !re.test(email)) {
            return Alert.alert('Please input a valid email address');
        }

        Alert.alert(`Sent receipt to ${email}`);
        setEmail("");
    }

    function voidOrder() {
        setPaidInFull(true);
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
                                    style={[styles.squareButton, pStyles.btn]}
                                    mode= {pressed[amt] ? "contained-tonal" : "contained"}
                                    onPress={() => handleTipsButtons(amt)}>
                                    {amt}%
                                </Button>
                            );
                        })}
                </View>

                <View style={[styles.buttonRow, {marginBottom:10}]}>     
                <Button style={[styles.squareButton, styles.wideButton, { alignItems: 'flex-start' }]}
                        mode= {customTip > 0 ? "contained-tonal" : "contained"}
                        icon="cash-plus"
                        onPress={() => handleUserInput("Custom Tip", "numeric", setCustomTip)}
                        onLongPress={() => handleCustomTip(false)}>
                        Add Custom Tip {customTip > 0 && `: $${parseFloat(customTip).toFixed(2)}`}
                    </Button>
                </View>

                <View style={pStyles.separator} />

                <View style={[styles.buttonRow, {marginTop:10}]}>     
                <Button style={[styles.squareButton, styles.wideButton, { alignItems: 'flex-start' }]}
                            mode="contained"
                            icon='pencil-plus-outline'
                            onPress={() => handleUserInput("Input Amount", "numeric", setCustomAmount) }
                            disabled={customAmount >= 0 ? false : true}>
                        Pay Custom Amount
                    </Button>
                </View>
                <View style={[styles.buttonRow, {marginBottom:10}]}>     
                <Button style={[styles.squareButton, styles.wideButton, { alignItems: 'flex-start' }]}
                        mode= {discount !== null ? "contained-tonal" : "contained"}
                        icon="percent"
                        onPress={() => setDiscountModal(true)}
                        onLongPress={() => handleDiscount(false)}>
                        Add Discount                     {discount !== null && `\u2713`}
                    </Button>
                </View>

                <View style={pStyles.separator} />

                <View style={[styles.buttonRow, {marginTop:10}]}>     
                <Button
                        style={[styles.squareButton, styles.wideButton, { alignItems: 'flex-start' }]}
                        mode="contained"
                        icon="cash-multiple"
                        onPress={() => { handlePayment(toPay) }}>                     
                        Pay Selected: 
                        ${parseFloat(toPay).toFixed(2)}
                    </Button>
                </View>
            <View style={[styles.buttonRow, {marginBottom:10}]}>     
                    <Button style={[styles.squareButton, styles.wideButton, { alignItems: 'flex-start'}]}
                        mode="contained"
                        icon="cash-check"
                        onPress={() => handlePayment(remaining, true)}>
                        Pay Remaining: 
                        ${parseFloat(remaining).toFixed(2)}
                    </Button>
                </View>
                <View style={pStyles.box}>
                    <View style={[pStyles.total, pStyles.textSpacing]}>
                        <Text variant='titleMedium'>Total: </Text>
                        <Text variant='bodyLarge'>${parseFloat(remaining).toFixed(2)}</Text>
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
                        icon="send"
                        size={23}
                        mode="contained"
                        selected={true}
                        onPress={handleSendEmail}
                        accessibilityLabel="Send Email"
                    />
                </View>    
            </View>

            <View style={[styles.buttonRow, {marginTop:10}]}>     
                <Button style={[styles.squareButton, styles.wideButton]}
                    mode="contained"
                    icon="minus-circle"
                    onPress={() => handleVoidItem()}
                    >             
                Void Item
                </Button> 
                <Button style={[styles.squareButton, styles.wideButton]}
                    mode="contained"
                    icon="broom"
                    onPress={() => {
                        if (isManager)
                            return setPaidInFull(true);
                        setOverride(true)}
                    }
                >             
                Clear Tab
                </Button> 
            </View>     
            <View style={[pStyles.separator, {marginTop:10}]} />
            <View style={[styles.buttonRow, {marginTop:10}]}>     
                <Button style={[styles.squareButton, styles.wideButton]}
                    mode="contained"
                    icon="plus"
                    onPress={() => passData()}
                >             
                Add Products
                </Button> 
            </View>       
            <MemoPaymentOptions 
                remaining={remaining}
                toPay={toPay}
                visibility={paymentOptions}
                setToPay={setToPay}
                setVisibility={setPaymentOptions}
                disableItems={disableItems}
                onDismiss={() => onDismiss()}
            />

            
            <MemoUserInput 
                visibility={inputView}
                setVisibility={setInputView}

                {...userInputConfig}
            />

            <MemoDiscount 
                visibility={discountModal}
                setVisibility={setDiscountModal}
                setValue={setDiscount}
                remaining = {Number(remaining)}
                total = {total}
            />

            <ManagerOverride 
                visibility={override}
                setVisibility={setOverride}
                onDismiss={() => voidOrder()}
            />
                
        </View>
    );
};

const pStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcf8f2',
        padding: 5,
        borderRadius:9
    },
    box: {
        width: '100%'
    },
    btn: {
        margin: '1%',
        width: '30%',
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
        marginTop: 5,
        borderRadius:9, 
    },
    email: {
        flex: 6,
        backgroundColor: '#ffffff',
        borderRadius:9,
        paddingVertical: 8,
        marginRight: 5,
        height: 10
    },
    sendIcon: { 
        color: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center'
    },
});