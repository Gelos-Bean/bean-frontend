import React, { useState } from 'react';
import { Alert, Modal, View, TextInput } from 'react-native';
import { Button, Text, IconButton } from 'react-native-paper';
import styles from '../../styles/modalStyles';
import LoadingIndicator from '../LoadingIndicator';

const AddTableModal = ({ visible, onDismiss, onAdd, loading}) => {
  const [tableNum, setTableNum] = useState(0);
  const [pax, setPax] = useState(0);
  const [limit, setLimit] = useState('');

  const handleAdd = () => {
    if (tableNum && pax) {
      onAdd(tableNum, pax, limit)
        .then(() => {
          // Reset modal values on successful save
          setTableNum(0);
          setPax(0);
          setLimit('');
          onDismiss(); 
        })
        .catch((err) => {
          Alert.alert('Error', err.message || 'Failed to add table');
        });
    } else {
      Alert.alert('Error', 'Table number and pax are required');
    }
  };

  const incrementValue = (setter, value) => {
    setter(Math.max(0, value + 1));
  };

  const decrementValue = (setter, value) => {
    setter(Math.max(0, value - 1));
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text variant='headlineMedium' style={styles.modalText}>New table</Text>
          
          {loading ? (
            <LoadingIndicator />
          ) : (
            <>
              <Text variant="bodyLarge">Table number*</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="0"
                  keyboardType="numeric"
                  value={tableNum.toString()}
                  onChangeText={(value) => setTableNum(parseInt(value) || 0)}
                  style={[styles.textInputStyle, { flex: 2 }]}
                />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <IconButton
                    style={styles.roundButton}
                    icon="chevron-up"
                    mode="contained"
                    selected={true}
                    size={25}
                    onPress={() => incrementValue(setTableNum, tableNum)}
                  />
                  <IconButton
                    style={styles.roundButton}
                    icon="chevron-down"
                    mode="contained"
                    selected={true}
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
                  style={[styles.textInputStyle, { flex: 2 }]}
                />
                <View style={{ flex: 1, flexDirection: 'row' }}>
                  <IconButton
                    style={styles.roundButton}
                    icon="chevron-up"
                    mode="contained"
                    selected={true}
                    size={25}
                    onPress={() => incrementValue(setPax, pax)}
                  />
                  <IconButton
                    style={styles.roundButton}
                    icon="chevron-down"
                    mode="contained"
                    selected={true}
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
                  onChangeText={(value) => setLimit(parseInt(value) || '')}
                  style={[styles.textInputStyle, { width: '100%' }]}
                />
              </View>
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
              icon="plus"
              mode="contained"
              onPress={handleAdd}
              disabled={loading} 
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
