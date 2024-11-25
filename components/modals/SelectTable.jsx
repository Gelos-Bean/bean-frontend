import { useState } from 'react';
import { Modal, View, ScrollView } from 'react-native';
import { Button, Text, IconButton, List } from 'react-native-paper';
import styles from '../../styles/modalStyles';
import LoadingIndicator from '../LoadingIndicator';

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
        <View style={styles.modalView}>
          <Text variant='headlineMedium' style={styles.modalText}>Select table</Text>
          {tables.length === 0 ? (
            <View style={styles.loadingContainer}>
              <Text variant="titleMedium" style={{textAlign:'center'}}>
                Open Tables
              </Text>
              <Text variant="bodyMedium" style={{textAlign:'center'}}>
                There are no open tables
              </Text>
           </View>
          ) : ( 
            <>
            <Text variant="bodyLarge">Table number*</Text>
            <List.Accordion
              title="Tables"
              left={props => <List.Icon {...props} icon="table-furniture" />}
              expanded={expanded}
              onPress={handlePress}>
              <ScrollView style={styles.scrollableContent}>
                {tables.map((table) => (
                    <List.Item  key={table._id}
                                variant="bodySmall"
                                title={table.tableNo}
                                onPress={() => setSelectedTable(table)}/>
                ))}
                
              </ScrollView>    
            </List.Accordion>
          </>
        )}
          <View style={styles.bottomButtonRow}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon="window-close"
              mode="contained"
              onPress={() => setVisibility(false)}
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
    </Modal>
  );
};

export default SelectTableModal;
