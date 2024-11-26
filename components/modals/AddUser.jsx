import React, { useState } from 'react';
import { Alert, Modal, View, TextInput } from 'react-native';
import { Button, Text, IconButton } from 'react-native-paper';
import styles from '../../styles/modalStyles';
import LoadingIndicator from '../LoadingIndicator';

const AddUserModal = ({ visible, onDismiss, onAdd, loading}) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [pin, setPin] = useState('');
  const [image, setImage] = useState('');

  function resetFields() {
    setUsername('');
    setName('');
    setPin('');
    setImage('');
  }

  const handleAdd = () => {
    if (pin.toString().length >= 0 || pin.toString().length > 7 ){
    Alert.alert('Error', 'Pin must be between 1 and 8 digits in length');
    } else if(isNaN(pin)){
      Alert.alert('Error', 'Pin must contain only numbers');
    }else if(username.length <= 2 || username.length > 12 ){
      Alert.alert('Error', 'Username must be between 2 and 12 characters in length');
    } else if (username && name && pin) {
      onAdd(name, username, pin, image)
        .then(() => {
          resetFields();
          onDismiss(); 
        })
        .catch((err) => {
          Alert.alert('Error', err.message || 'Failed to add user');
        });
    } else {
      Alert.alert('Error', 'Username, name and pin are required');
    }
  };


  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text variant='headlineMedium' style={styles.modalText}>New user</Text>
          
          {loading ? (
            <LoadingIndicator />
          ) : (
            <>
              <Text variant="bodyLarge">Name*</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={name}
                  onChangeText={(value) => setName(value)}
                  style={[styles.textInputStyle, { flex: 2 }]}
                />
              </View>

              <Text variant="bodyLarge">Username*</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={username}
                  onChangeText={(value) => setUsername(value)}
                  style={[styles.textInputStyle, { flex: 2 }]}
                />
              </View>

              <Text variant="bodyLarge">Pin*</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  keyboardType="numeric"
                  value={pin.toString()}
                  onChangeText={(value) => setPin(value)}
                  style={[styles.textInputStyle, { width: '100%' }]}
                />
              </View>
              <Text variant="bodyLarge">Image URL</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  keyboardType="numeric"
                  value={image}
                  onChangeText={(value) => setImage(value)}
                  style={[styles.textInputStyle, { width: '100%' }]}
                />
              </View>
              <Text variant="bodyLarge">Role</Text>
              <View style={styles.inputContainer}>
                <Text
                  style={[styles.textInputStyle, { width: '100%', paddingVertical:'3%', color:'grey' }]}>Staff</Text>
              </View>
            </>
          )}

          <View style={styles.bottomButtonRow}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon="window-close"
              mode="contained"
              onPress={() => {
                resetFields();
                onDismiss()
              }}
              >
              Cancel
            </Button>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon="account-plus"
              mode="contained"
              onPress={handleAdd}
              disabled={loading} 
            >
              Add User
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddUserModal;
