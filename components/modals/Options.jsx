import * as React from 'react';
import { useEffect, useState } from 'react';
import { Alert, Modal, StyleSheet, Pressable, View, TextInput } from 'react-native';
import { Button, Text, IconButton, Checkbox } from 'react-native-paper';
import styles from '../../styles/modalStyles';

const Options = ({ visible, onDismiss, product, addToOrder }) => {
  const [currentOptions, setCurrentOptions] = useState([]);

  useEffect(() => {
    if (visible) {
      setCurrentOptions([]); // Clear any previously selected options
    }
  }, [visible]);

  const handleSelect = () => {
    const selectedOptions = product.options.filter(option => currentOptions.includes(option._id));
    addToOrder(product, selectedOptions); 
    onDismiss();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} 
          onDismiss={() => {
            setCurrentOptions([]);
            onDismiss();
    }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          {product ? (
        <>
          <Text variant='headlineMedium' style={styles.modalText}>{product.name}</Text>
          <Text variant="labelLarge">Options:</Text>
          
          {product.options.map(option => (
            <View key={option._id} style={[styles.inputContainer, {justifyContent:'space-between', paddingHorizontal:'10%'}]}>
              <Text variant="bodyLarge">{option.name} - ${option.price}</Text>
              <Checkbox
                status={currentOptions.includes(option._id) ? 'checked' : 'unchecked'}
                onPress={() => {
                  if (currentOptions.includes(option._id)) {
                    setCurrentOptions(currentOptions.filter(opt => opt !== option._id));
                  } else {
                    setCurrentOptions([...currentOptions, option._id]);
                  }
                }}
              />
            </View>
          ))}


        </>
      ) : (
        <Text variant="bodyLarge">No product selected.</Text>
      )}
          {/* Buttons */}
          <View style={styles.bottomButtonRow}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              mode="contained"
              onPress={onDismiss}
            >
              Cancel
            </Button>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              mode="contained"
              onPress={handleSelect}
            >
              Confirm
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Options;
