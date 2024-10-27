import * as React from 'react';
import {Alert, Modal, StyleSheet, Pressable, View, TextInput } from 'react-native';
import { Button, Text, IconButton } from 'react-native-paper'

import styles from '../../styles/modalStyles';


const AddTableModal = ({ visible, onDismiss, onSearch }) => {
  
  const [tableNum, setTableNum] = React.useState(0);
  const [pax, setPax] = React.useState(0);
  const [limit, setLimit] = React.useState(null);

  const handleAdd = () => {
    onAdd(tableNum, pax, limit);
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
                  placeholder={tableNum}
                  value={tableNum}
                  onChangeText={setTableNum}
                  style={[styles.textInputStyle, {width: 150}]}/>
                <IconButton style={styles.roundButton}
                  icon="chevron-up"
                  iconColor='#ffff'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={25}
                  onPress={() => setTableNum(tableNum + 1)}/>
                <IconButton style={styles.roundButton}
                  icon="chevron-down"
                  iconColor='#ffff'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={25}
                  onPress={() => setTableNum(tableNum - 1)}/>
              </View>
              <Text variant="labelLarge">Pax*</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  value={pax}
                  onChangeText={setPax}
                  style={[styles.textInputStyle, {width: 150}]}/>
                <IconButton style={styles.roundButton}
                  icon="chevron-up"
                  iconColor='#ffff'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={25}
                  onPress={() => setPax(pax + 1)}/>
                <IconButton style={styles.roundButton}
                  icon="chevron-down"
                  iconColor='#ffff'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={25}
                  onPress={() => setPax(pax - 1)}/>
              </View>
              <Text variant="labelLarge">Limit</Text>
              <View style={styles.inputContainer}>
                <TextInput
                        placeholder="Optional"
                        value={limit}
                        onChangeText={setLimit}
                        style={[styles.textInputStyle, {width: 275}]}
                    />
              </View>
              <View style={styles.inputContainer}>
                <Button style={[styles.squareButton, styles.wideButton]}
                  mode="contained"
                  onPress={() => onDismiss()}>                   
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
