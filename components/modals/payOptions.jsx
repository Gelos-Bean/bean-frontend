import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import { Button, Text } from 'react-native-paper';
import styles from '../../styles/modalStyles';


export default function PaymentOptions({ visibility, setVisibility, toPay, setToPay, remaining, setRemaining, disableItems }) {
    
    function handleButtonPress(){
        setToPay(0.00);

        // avoiding issues with JS turning number into string. 
        // Using parsefloat with an equation to avoid issues with parse floating-points
        const remainingAmount = (parseFloat(remaining) * 100 - parseFloat(toPay) * 100) / 100;
        setRemaining(Number(remainingAmount.toFixed(2)));
        disableItems();
        setVisibility(false);
    }

    return (
        <Modal animationType="slide" transparent={true} visible={visibility}>
            <TouchableWithoutFeedback>
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalView}>
                            <Text variant='headlineMedium'>Total: ${parseFloat(toPay.toFixed(2))}</Text>
                            <Button
                                    style={[styles.squareButton, styles.wideButton]}
                                    mode="contained"
                                    selected={true}
                                    onPress={handleButtonPress}>
                                Eftpos
                            </Button>
                            <Button
                                    style={[styles.squareButton, styles.wideButton]}
                                    mode="contained"
                                    selected={true}
                                    onPress={handleButtonPress}>
                                Cash
                            </Button>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
};