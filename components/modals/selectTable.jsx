import * as React from 'react';
import { useEffect } from 'react';
import { Alert, Modal, StyleSheet, Pressable, View, TextInput, ScrollView } from 'react-native';
import { Button, Text, IconButton, List } from 'react-native-paper';
import styles from '../../styles/modalStyles';

const SelectTableModal = ({ visible, onDismiss, tables, onSelect }) => {
  const [selectedTable, setSelectedTable] = React.useState(null);


  const handleSelect = () => {
    onSelect(selectedTable); 
    onDismiss();
  };

  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onDismiss={onDismiss}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {height:600}]}>
          <Text variant='headlineMedium' style={styles.modalText}>Select table</Text>

          <Text variant="labelLarge">Table number*</Text>
          <List.Section style={{height:200}}>
            
            <List.Accordion
              title="Tables"
              left={props => <List.Icon {...props} icon="table-furniture" />}
              expanded={expanded}
              onPress={handlePress}>
                <ScrollView style={{flexDirection:'column'}}>
                  {tables.map((table) => (
                    // <Pressable>
                      <List.Item  key={table._id}
                                  variant="bodySmall"
                                  title={table.tableNo}
                                  onPress={() => setSelectedTable(table)}/>
                    // </Pressable>
                  ))}
                </ScrollView>
            </List.Accordion>
            
          </List.Section>
          <View style={[styles.inputContainer,{marginTop:'5%'}]}>
            <Text variant="titleMedium">Selected table: {selectedTable === null ? '-' : selectedTable.tableNo}</Text>
          </View>     
          {/* Buttons */}
          <View style={[styles.inputContainer,{marginTop:'1%'}]}>
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
              Select
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default SelectTableModal;
