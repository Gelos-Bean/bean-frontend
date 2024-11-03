import { useState } from 'react';
import { Modal, View, ScrollView } from 'react-native';
import { Button, Text, IconButton, List } from 'react-native-paper';
import styles from '../../styles/modalStyles';

const SelectTableModal = ({ visible, setVisibility, tables, onSelect }) => {
  const [selectedTable, setSelectedTable] = useState(null);


  const handleSelect = () => {
    onSelect(selectedTable); 
    setVisibility(false);
  };

  const [expanded, setExpanded] = useState(true);

  const handlePress = () => setExpanded(!expanded);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} >
      <View style={styles.centeredView}>
        <View style={[styles.modalView]}>
          <Text variant='headlineMedium' style={styles.modalText}>Select table</Text>

          <Text variant="bodyLarge">Table number*</Text>
          <List.Section style={{height:'60%'}}>
          <ScrollView style={{flexDirection:'column'}}>
            <List.Accordion
              title="Tables"
              left={props => <List.Icon {...props} icon="table-furniture" />}
              expanded={expanded}
              onPress={handlePress}>
                
                  {tables.map((table) => (
                    // <Pressable>
                      <List.Item  key={table._id}
                                  variant="bodySmall"
                                  title={table.tableNo}
                                  onPress={() => setSelectedTable(table)}/>
                    // </Pressable>
                  ))}
                
            </List.Accordion>
            </ScrollView>
          </List.Section>
          <Text variant="titleMedium" style={{textAlign:'center'}}>
            Selected table: 
            {selectedTable === null ? '-' : selectedTable.tableNo}
          </Text>
          {/* Buttons */}
          <View style={styles.bottomButtonRow}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              mode="contained"
              onPress={() => setVisibility(false)}
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
