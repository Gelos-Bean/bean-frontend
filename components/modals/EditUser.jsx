import React, { useState, useEffect } from 'react';
import { Alert, Modal, View, TextInput } from 'react-native';
import { Button, Text, IconButton, SegmentedButtons, Avatar } from 'react-native-paper';
import styles from '../../styles/modalStyles';
import LoadingIndicator from '../LoadingIndicator';

const EditUserModal = ({ visible, onDismiss, user, onAdd}) => {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [role, setRole] = useState('');

  // Fill in fields ONLY when the modal is made visible
  useEffect(() => {
    if (visible && user) {
      setId(user._id || '')
      setName(user.name || '');
      setUsername(user.username || '');
      setImage(user.image || '');
      setRole(user.role || '');
    }
  }, [visible]);

  const roles = [
    { key: '1', label: 'Staff', icon: 'account', value: 'Staff' },
    { key: '2', label: 'Manager', icon: 'account-hard-hat', value: 'Manager' },
    { key: '3', label: 'Admin', icon: 'account-cowboy-hat', value: 'Admin' },
  ];

  const handleAdd = () => {
    if(username.length <= 2 || username.length > 12 ){
      Alert.alert('Error', 'Username must be between 2 and 12 characters in length');
    } else if (username && name) {
      const updatedUser={
        _id: id,
        name:name,
        username:username,
        image:image,
        role:role
      }
      onAdd(updatedUser)
    } else {
      Alert.alert('Error', 'Username and name are required');
    }
  };


  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          
          {!user ? (
            <LoadingIndicator />
          ) : (
            <>
              <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                <Text variant='headlineMedium' style={styles.modalText}>Edit user</Text>
                <Avatar.Image size={60} style={{marginVertical:'auto'}} source={{ uri: user.image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541' }} />
              </View>
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
              <Text variant="bodyLarge">Image URL</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  keyboardType="numeric"
                  value={image}
                  onChangeText={(value) => setImage(value)}
                  style={[styles.textInputStyle, { width: '100%' }]}
                />
              </View>
              <Text variant="bodyLarge">Role*</Text>
              <SegmentedButtons
                value={role}
                onValueChange={setRole}
                buttons={roles}
                style={{ marginVertical: '3%', marginHorizontal: '1%' }}
              />
            </>
          )}

          <View style={styles.bottomButtonRow}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon="window-close"
              mode="contained"
              onPress={onDismiss}
              >
              Cancel
            </Button>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon="account-edit"
              mode="contained"
              onPress={handleAdd}
            >
              Save
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default EditUserModal;
