import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Pressable, View, TextInput } from 'react-native';
import { Button, Text, IconButton } from 'react-native-paper';
import styles from '../../styles/modalStyles';

const AddTableModal = ({ visible, setVisibility, onAdd }) => {
  const [tableNum, setTableNum] = useState(0);
  const [pax, setPax] = useState(0);
  const [limit, setLimit] = useState('');



  const handleAdd = () => {
    if (tableNum && pax) {
      onAdd(tableNum, pax, limit); 
//---------> Reset modal values on successful save
      setTableNum(0);
      setPax(0);
      setLimit('');
      setVisibility(false);  
    } else {
      Alert.alert('Error', 'Table number and pax are required');
      console.log('Error', 'Table number and pax are required');
    }
  };

  // Function to handle incrementing and decrementing values safely
  const incrementValue = (setter, value) => {
    setter(Math.max(0, value + 1)); // Prevent below 0
  };
  
  const decrementValue = (setter, value) => {
    setter(Math.max(0, value - 1)); // Prevent below 0
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text variant='headlineMedium' style={styles.modalText}>New table</Text>
          <Text variant="bodyLarge">Table number*</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="0"
              keyboardType="numeric"
              value={tableNum.toString()} 
              onChangeText={(value) => setTableNum(parseInt(value) || 0)}
              style={[styles.textInputStyle, {flex:2}]}
            />
            <View style={{flex:1, flexDirection:'row'}}>
              <IconButton
                style={styles.roundButton}
                icon="chevron-up"
                iconColor='#ffff'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={25}
                onPress={() => incrementValue(setTableNum, tableNum)}
              />
              <IconButton
                style={styles.roundButton}
                icon="chevron-down"
                iconColor='#ffff'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={25}
                onPress={() => decrementValue(setTableNum, tableNum)}
                disabled={tableNum === 0}
              />
              </View>
            
            
          </View>


          <Text variant="bodyLarge">Pax*</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="0"
              keyboardType="numeric"
              value={pax.toString()}
              onChangeText={(value) => setPax(parseInt(value) || 0)}
              style={[styles.textInputStyle, {flex:2}]}
            />
            <View style={{flex:1, flexDirection:'row'}}>
              <IconButton
                style={styles.roundButton}
                icon="chevron-up"
                iconColor='#ffff'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={25}
                onPress={() => incrementValue(setPax, pax)}
              />
              <IconButton
                style={styles.roundButton}
                icon="chevron-down"
                iconColor='#ffff'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={25}
                onPress={() => decrementValue(setPax, pax)}
                disabled={pax === 0}
              />
            </View>
            </View>
            

          <Text variant="bodyLarge">Limit</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Optional"
              keyboardType="numeric"
              value={limit.toString()}
              onChangeText={(value) => setLimit(parseInt(value) || null)}
              style={[styles.textInputStyle, {width:'100%'}]}
            />
          </View>

          {/* Buttons */}
          <View style={styles.bottomButtonRow}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon='window-close'
              mode="contained"
              onPress={() => {setVisibility(false)}}
            >
              Cancel
            </Button>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon='plus'
              mode="contained"
              onPress={handleAdd}
            >
              Add Table
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddTableModal;