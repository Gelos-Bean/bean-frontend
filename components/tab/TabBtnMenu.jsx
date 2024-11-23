import { useState } from 'react';
import { View,Alert } from 'react-native';
import { Button } from 'react-native-paper';
import ConfirmationModal from '../../components/modals/ConfirmationModal.jsx';
import AddTableModal from '../../components/modals/AddTable.jsx';

import ShowError from '../../components/ShowError.jsx';
import ErrorBoundary from '../../components/ErrorBoundary.jsx';

import { connection } from '../../config/config.json';
import styles from '../../styles/posStyles.js';
import AddTable from '../../utils/addTable.jsx';


export default function TabBtnMenu({ tableNo, handleSelectedTab, setLoading, refresh }) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [addTableModal, setAddTableModal] = useState(false);

  async function deleteTab() {
    if (!tableNo) 
      return Alert.alert('Select a table to delete');
    try { 
      const response = await fetch(`${connection}/tables/${tableNo[0]._id}`, {
          method: 'DELETE'
      });
      const res = await response.json();

      if(!res)
        return ShowError(res.msg);

      Alert.alert(res.msg);
      refresh(true);
    } catch (err) {
        ShowError(err.message);
    }
  }

  async function handleAddTable(tableNum, pax, limit) {
    await AddTable(tableNum, pax, limit);
    refresh(true);
  }

  return (
    <View style={[styles.managerButtonContainer, {flexDirection:'row'}]}>
      <View style={[styles.buttonRow, {flex:1}]}>
        <Button style={[styles.squareButton, styles.wideButton]}
            mode="contained"
            icon="plus"
            onPress={() => setAddTableModal(true)}>              
            Add Table
        </Button>
        <Button style={[styles.squareButton, styles.wideButton]}
            mode="contained"
            icon="magnify"
            disabled={true}>              
            Search Tables
        </Button>
        <Button style={[styles.squareButton, styles.wideButton]}
            mode="contained"
            icon="broom"
            onPress={() => setConfirmDelete(true)}>              
            Clear Table
        </Button>
      </View>
      <View style={styles.verticalSeparator}></View>
      <View style={[styles.buttonRow, {flex:1}]}>
        <Button style={[styles.squareButton, styles.wideButton]}
            mode="contained"
            icon="book-open-variant"
            onPress={()=> handleSelectedTab()}>              
            View Details
        </Button>
      </View>    
      
      <ErrorBoundary>
        <AddTableModal
          visible={addTableModal}
          onDismiss={() => setAddTableModal(false)} 
          onAdd={handleAddTable}
          loading={setLoading}
        />
        <ConfirmationModal 
            visible={confirmDelete}
            onSelect={deleteTab}
            onDismiss={() => setConfirmDelete(false)}
            title='Close Table?'
            body='This will delete table from view'
        />
        </ErrorBoundary>
    </View>    
  )
};
