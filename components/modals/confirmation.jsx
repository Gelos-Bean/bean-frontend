import React from 'react';
import { Modal, Button, Text } from 'react-native-paper';
import styles from '../../styles/modalStyles';

export default function ConfirmationModal ({ visible, setVisibility, onConfirm }){
    return (
        <Modal visible={visible} animationType="slide" transparent={true} >
            <View style={styles.centeredView}>
                <Text variant='headlineMedium'>Are you sure?</Text>
          
                <View style={styles.buttonContainer}>
                    <Button 
                        mode="contained"
                        selected={true} 
                        onPress={setVisibility} 
                        style={styles.button}>
                        No
                    </Button>
            
                    <Button 
                        mode="contained"
                        selected={true}
                        onPress={() => {
                            onConfirm();
                            setVisibility(false);
                        }}
                        style={styles.button}>
                        Yes
                    </Button>
                </View>
            </View>
        </Modal>
    );
};