import React, { useState } from 'react';
import { Alert, Modal, View, TextInput, ScrollView } from 'react-native';
import { Button, Text, IconButton, Card } from 'react-native-paper';
import styles from '../../styles/modalStyles';
import { connection } from '../../config/config.json';

const FreeTextModal = ({ visible, onDismiss, onAdd, onClear }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    onAdd(inputValue);
    handleDismiss();
  };
  const handleClear = () => {
    setInputValue(''); 
    onClear(inputValue);
    handleDismiss();
  };
  const handleDismiss = () => {
    setInputValue(''); 
    onDismiss();
  }


  return (
    <Modal animationType="slide" transparent={true} visible={visible} onDismiss={onDismiss}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { width: '50%' }]}>
          <Text variant="headlineMedium" style={styles.modalText}>Free Text</Text>
          <Text variant="bodyLarge">Enter comment:</Text>
          <View style={[styles.inputContainer]}>
            <TextInput
              placeholder="Comment"
              value={inputValue}
              onChangeText={setInputValue}
              multiline
              numberOfLines={4}
              style={[styles.textInputStyle, { height:'100%', textAlignVertical:'top', paddingVertical:'1%'}]}
            />
          </View>
            <IconButton
              icon="backspace"
              iconColor="#000000"
              size={20}
              onPress={() => { setInputValue('');}}
              style={{alignSelf:'flex-end'}}
            />
          <View style={styles.bottomButtonRow}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon="window-close"
              mode="contained"
              onPress={handleDismiss}
            >
              Cancel
            </Button>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon="broom"
              mode="contained"
              onPress={handleClear}
            >
              Clear Comment
            </Button>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon="pencil"
              mode="contained"
              onPress={handleAdd}
            >
              Add Comment
            </Button>
          </View>
        </View>            
      </View>
    </Modal>
  );
};

export default FreeTextModal;
