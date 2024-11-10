import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  View, 
  TextInput, 
  Alert
} from 'react-native';
import { 
  Button, 
  Text, 
} from 'react-native-paper';
import styles from '../../styles/modalStyles';
import { connection } from '../../config/config.json';

const NewOptionModal = ({ visible, onDismiss }) => {
  const [nameInput, setNameInput] = useState('');
  const [priceInput, setPriceInput] = useState('');

  const handleAdd = () => {
    if (nameInput.trim() === '') {
      Alert.alert('Error', 'Name field cannot be left blank');
      return;
    } else if (priceInput !== '' && isNaN(parseFloat(priceInput))) {
      Alert.alert('Error', 'Price field must be a valid number')
      return;
    }
    const newOption = {
      name: nameInput.trim(),
      price: parseFloat(priceInput) || 0
    };
    addNewOption(newOption);
    onDismiss();
  };

  async function addNewOption(option) {
    try {
        const response = await fetch(`${connection}/options`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(option)
        });

        const data = await response.json();

        if (response.ok && data.success) {
            Alert.alert('Success', data.msg);
            onDismiss();
        } else {
            Alert.alert('Error', data.msg || 'Failed to add option');
        }
    } catch (error) {
        console.error('Error adding option:', error);
        Alert.alert('Error', 'Failed to add option. Please check your network connection.');
    }
}



  return (
    <Modal animationType="slide" transparent={true} visible={visible} onDismiss={onDismiss}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text variant="headlineMedium" style={styles.modalText}>New Option</Text>
          <Text variant="bodyLarge">Name*</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Name"
              value={nameInput}
              onChangeText={setNameInput}
              style={styles.textInputStyle}
            />
          </View>
          <Text variant="bodyLarge">Price</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Price"
              keyboardType="number-pad"
              value={priceInput}
              onChangeText={setPriceInput}
              style={styles.textInputStyle}
            />
          </View>
          <View style={styles.bottomButtonRow}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              mode="contained"
              icon="window-close"
              onPress={onDismiss}
            >
              Cancel
            </Button>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              mode="contained"
              icon="plus"
              onPress={handleAdd}
            >
              Add
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewOptionModal;
