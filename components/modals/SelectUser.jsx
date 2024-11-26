import { useState } from 'react';
import { Modal, View, ScrollView } from 'react-native';
import { Button, Text, IconButton, List, Avatar } from 'react-native-paper';
import styles from '../../styles/modalStyles';
import LoadingIndicator from '../LoadingIndicator';
import EditUserModal from './EditUser';

const SelectUserModal = ({ visible, onDismiss, users, onEdit, onDelete }) => {
  
  const [selectedUser, setSelectedUser] = useState(null);
  
  const [viewEditUserModal, setViewEditUserModal] = useState(false);

  const handleSelect = (user) => {
    setSelectedUser(user);
    setViewEditUserModal(true);
    };

  function handleAdd(updatedUser){
    onEdit(updatedUser);
    onDismiss();
  }

  function handleDelete(userId){
    onDelete(userId);
    onDismiss();
  }

  function handleDismiss(){
    onDismiss();
  }

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);
  return (
    <Modal animationType="slide" transparent={true} visible={visible} >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {width:'40%'}]}>
          <Text variant='headlineMedium' style={styles.modalText}>Manage Users</Text>
          <Text variant="bodyLarge">Select a user to edit</Text>
          <ScrollView style={styles.scrollableContent}>
            <List.Accordion
              title={<Text variant='titleMedium'>Users</Text>}
              left={props => <List.Icon {...props} icon="account-group" />}
              expanded={expanded}
              onPress={handlePress}
              background='#ffffff'
              style={
                { backgroundColor:'#ffffff',
                  borderRadius:999,
                }
              }
              titleStyle={
                { color:'#ffffff'
                }
              }>
                
                {users.length === 0 ? (
                <LoadingIndicator />
              ) : (

                  users.map((user) => (
                      <List.Item  key={user._id}
                                  left={props => <Avatar.Image size={50} source={{ uri: user.image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541' }} />}
                                  title={<Text variant="bodyLarge">{user.username}</Text>}
                                  description={user.name}
                                  onPress={() => {handleSelect(user)}}
                      />
                  ))
              )} 
            </List.Accordion>
            </ScrollView>    
          {/* Buttons */}
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
              icon="check"
              mode="contained"
              onPress={handleSelect}
            >
              Select
            </Button>
          </View>
        </View>
      </View>
      <EditUserModal 
        visible={viewEditUserModal} onDismiss={() => setViewEditUserModal(false)}
        user={selectedUser} onAdd={handleAdd} onDelete={handleDelete}/>
    </Modal>
  );
};

export default SelectUserModal;
