import { useState, useEffect } from 'react';
import { Modal, View, TouchableWithoutFeedback, StyleSheet, Alert } from 'react-native';
import { IconButton, TextInput, Text, Button } from 'react-native-paper';
import styles from '../../styles/modalStyles';

export default function Discount({ visibility, setVisibility, setValue, remaining, total }) {
    const [input, setInput] = useState(null);
    const [disableBtn, setDisableBtn] = useState(false);
    const presetDiscounts = [5, 10, 20];


    useEffect(() => { 
        console.log(`Remaining: ${typeof remaining} ${remaining}`);
        console.log(`total: ${typeof total} ${total}`);

        if(remaining !== total) {
            console.log(disableBtn);
            setDisableBtn(true);         
        }
    }, [remaining, total])

    
    function handlePercentage(amt){
        if(amt > 100) {
            return Alert.alert('Please enter a number below 100');
        }
        if(amt === 100) {
            setValue([100, true]);
            setVisibility(false);
            return;
        }

        const percent = parseFloat(amt / 100); 
        setValue([percent, true]);
        setVisibility(false);
    }

    function handleFixed(){
        setValue([input, false]);
        setVisibility(false);
    }

    return (
        <Modal animationType="slide" transparent={true} visible={visibility}>
            <TouchableWithoutFeedback onPress={() => setVisibility(false)}>
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View style={styles.modalView}>
                            <Text variant='displaySmall'>Apply Discount</Text>
                            <View style={{flexDirection: 'column'}}>
                                <View style={inputStyles.btnRow}>
                                    {presetDiscounts && presetDiscounts.length > 0 && 
                                        presetDiscounts.map(amt => {
                                        return (
                                            <Button 
                                                key={amt}
                                                style={[styles.squareButton, inputStyles.btn]}
                                                mode="contained"
                                                labelStyle={{ fontSize: 20 }}
                                                disabled={disableBtn}
                                                onPress={() => handlePercentage(amt)}>
                                                {amt}%
                                            </Button>)
                                        })
                                    } 
                                </View>
                                <View style={{marginTop: 20, marginBottom: 10}}>
                                    <Text variant='titleMedium'>Custom Amount</Text>
                                </View>
                                <View style={inputStyles.customField}>

                                    <TextInput
                                        style={inputStyles.inputField}
                                        keyboardType= 'numeric' 
                                        onChangeText={i => {setInput(i)}}
                                    />
                                    <IconButton
                                        style={[styles.squareButton, inputStyles.btnSml]}
                                        icon="currency-usd"
                                        size={24}
                                        mode="contained"
                                        selected={true}
                                        onPress={() => handleFixed()}
                                    />
                                    <IconButton
                                        style={[styles.squareButton, inputStyles.btnSml]}
                                        icon="percent"
                                        size={24}
                                        mode="contained"
                                        selected={true}
                                        disabled={disableBtn}
                                        onPress={() => handlePercentage(input)}
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
};

const inputStyles = StyleSheet.create({
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 70,
        marginVertical: 10,
    },
    btn: {
        height: '100%',
        justifyContent:'center',
        width: '30%'
    },
    
    customField:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 50,
    },
    inputField: {
        flex: 3,
        backgroundColor: '#fcf4f4',
        marginRight: 10,
        height: 45,
    },
    btnSml: {
        flex: 1,
        height: '100%'
    }
})