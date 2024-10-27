import * as React from 'react';
import {Alert, Modal, StyleSheet, Pressable, View, TextInput } from 'react-native';
import { Button, Text, IconButton } from 'react-native-paper'

import styles from '../../styles/modalStyles';


const AddTableModal = ({ visible, onDismiss, onSearch }) => {
  
  const [tableNum, setTableNum] = React.useState(0);
  const [pax, setPax] = React.useState(0);
  const [Limit, setLimit] = React.useState(null);

  const handleAdd = () => {
    onSearch(inputValue);
    onDismiss(); 
  };

  return (

        <Modal animationType="slide" transparent={true} visible={visible} onDismiss={onDismiss}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text variant='headlineMedium' style={styles.modalText}>New table</Text>
            <Text variant="labelLarge">Table number*</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={tableNum}
                  onChangeText={setTableNum}
                  style={[styles.textInputStyle, {width: 150}]}/>
                <IconButton style={styles.roundButton}
                  icon="chevron-up"
                  iconColor='#ffff'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={25}/>
                <IconButton style={styles.roundButton}
                  icon="chevron-down"
                  iconColor='#ffff'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={25}/>
              </View>
              <Text variant="labelLarge">Pax*</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={inputValue}
                  onChangeText={setInputValue}
                  style={[styles.textInputStyle, {width: 150}]}/>
                <IconButton style={styles.roundButton}
                  icon="chevron-up"
                  iconColor='#ffff'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={25}/>
                <IconButton style={styles.roundButton}
                  icon="chevron-down"
                  iconColor='#ffff'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={25}/>
              </View>
              <Text variant="labelLarge">Limit</Text>
              <View style={styles.inputContainer}>
                <TextInput
                        placeholder="Product"
                        value={inputValue}
                        onChangeText={setInputValue}
                        style={[styles.textInputStyle, {width: 275}]}
                    />
              </View>
              <View style={styles.inputContainer}>
                <Button style={[styles.squareButton, styles.wideButton]}
                  mode="contained"
                  onPress={() => orderProducts.forEach((ep) => console.log(ep.name))}>                   
                  Cancel
                </Button>
                <Button style={[styles.squareButton, styles.wideButton]}
                  mode="contained"
                  onPress={() => orderProducts.forEach((ep) => console.log(ep.name))}>                   
                  Add Table
                </Button>
              </View>

             </View>
            </View>
        </Modal>
  );
};

export default AddTableModal;
