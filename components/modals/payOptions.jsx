import { Modal, View, TouchableWithoutFeedback } from 'react-native';
import { Button, Text } from 'react-native-paper';
import styles from '../../styles/modalStyles';


export default function PaymentOptions({ visibility, setVisibility, toPay, setToPay, disableOncePaid }) {
    
    function handleButtonPress(){     
        setToPay(0.00);
        disableOncePaid();
        setVisibility(false);
    }

    return (
        <Modal animationType="slide" transparent={true} visible={visibility}>
            <TouchableWithoutFeedback onPress={() => setVisibility(false)}>
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View style={styles.modalView}>
                            <Text variant='headlineMedium'>Total: ${parseFloat(toPay).toFixed(2)}</Text>
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