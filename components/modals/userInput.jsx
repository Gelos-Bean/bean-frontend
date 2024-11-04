import { useState } from 'react';
import { Modal, View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { IconButton, TextInput, Text } from 'react-native-paper';
import styles from '../../styles/modalStyles';


export default function UserInput({ visibility, setVisibility, title, keyboard, placeholder, setValue }) {
    const [input, setInput] = useState(null);

    function handleOkayButton() {
        const int = parseFloat(input);
        setValue(int);
        setVisibility(false);
    }

    return (
        <Modal animationType="slide" transparent={true} visible={visibility}>
            <TouchableWithoutFeedback onPress={() => setVisibility(false)}>
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View style={styles.modalView}>
                            <Text variant='headlineMedium'>{title}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <TextInput
                                    style={inputStyles.inputField}
                                    keyboardType={keyboard ? keyboard : 'text'}
                                    placeholder={placeholder} 
                                    onChangeText={i => {setInput(i)}}
                                />
                                <IconButton
                                    style={styles.squareButton}
                                    icon="check"
                                    size={24}
                                    mode="contained"
                                    selected={true}
                                    onPress={handleOkayButton}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
};

const inputStyles = StyleSheet.create({
    inputField: {
        flex:6,
        backgroundColor: '#fcf4f4',
        marginRight: 5,
        height: 1
    },
})