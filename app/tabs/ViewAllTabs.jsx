import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, Pressable } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import { connection } from '../../config/config.json';

import TabBtnMenu from '../../components/tab/TabBtnMenu.jsx';
import AddTableModal from '../../components/modals/addTable.jsx';
import SelectTableModal from '../../components/modals/selectTable.jsx';

import styles from '../../styles/posStyles.js';


export default function ViewAllTabs({ onSelectTab }) {

  const headers = ["Tab", "Arrival", "PAX", "Total"];
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState({});
  const [selectTable, setSelectedTable] = useState('');
  const [viewTableModal, setViewTableModal] = useState(false);
  const [viewSelectTableModal, setSelectTableModal] = useState(false);
  const [highlightOrder, setHighlightOrder] = useState(false);


  useEffect(() => {
      fetchData();
    },[]);
    
      
  async function fetchData(){ 
      
    try { 
      const response = await fetch(`${connection}/tables`);
      const tabs = await response.json();

      if (!tabs.success) {
        return Alert.alert(`Error: ${tabs.msg}`);
      }
          
      setTables(tabs.msg);
  
    } catch(err) {
      Alert.alert(`Error: ${err.message}`);
    } 
  }


  async function addNewTable(nTableNo, nPax, nLimit) {
    try { 
      const createTable = {
        tableNo: nTableNo,
        pax: nPax,
        limit: nLimit
      }

      const response = await fetch(`${connection}/add-table`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(createTable)
      });

      const data = await response.json();

      if(!data.success) {
        console.log(`heh? ${data.msg}`);
        return Alert.alert(data.msg);
      }
      
      console.log(data._id);

    } catch (err) {
      console.log(err.message);
    }
  }


  function formatTime(formatDate) {
    const date = new Date(formatDate);
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString([], options);
  }

  function sortBy(title) {

    let sortedData = [...tables];

    if (title === "PAX") {
        sortedData.sort((a, b) => (a.pax > b.pax ? 1 : -1));
    } else if (title === "Total") {
        sortedData.sort((a, b) => (a.total > b.total ? 1 : -1));
    } else if (title === "Tab") {
          sortedData.sort((a, b) => (a.tableNo > b.tableNo ? 1 : -1));
    } else if (title === "Arrival") {
        sortedData.sort((a, b) => (new Date(a.openedAt) > new Date(b.openedAt) ? 1 : -1));
    }

    setTables(sortedData);

  }

  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView>
          <DataTable>
            <DataTable.Header>
                {headers.map((header, index) => (                  
                    <DataTable.Title key={index}
                      sortDirection='descending'
                      onPress={() => sortBy(header)}>
                        <Text variant='titleMedium'>{header}</Text>
                    </DataTable.Title>
                  ))}            
            </DataTable.Header>
        
            {tables && Array.isArray(tables) && tables.length > 0 ? (
              tables.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => onSelectTab(item.tableNo)}
                  onLongPress={() => {
                    setHighlightOrder(true);
                    console.log(`Long pressed: ${item.tableNo}`);
                  }}
                >
                  <DataTable.Row>
                    <DataTable.Cell>
                      <Text>{item.tableNo}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Text>{item.openedAt ? formatTime(item.openedAt) : ""}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Text>{item.pax}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Text>{`$${item.total.toFixed(2)}`}</Text>
                    </DataTable.Cell>
                  </DataTable.Row>
                </Pressable>
              ))
            ) : null}
    
          </DataTable>
        </ScrollView>
      </View>
      <View style={styles.rightContainer}>
      <View style={{flex: 1}} />
          <View>
            <TabBtnMenu 
              tableNo={newTable.tableNo}
              setViewTableModal={setViewTableModal}
              hightlightOrder={highlightOrder}
            />
          </View>
      </View>
      <AddTableModal visible={viewTableModal} setVisibility={setViewTableModal} onAdd={addNewTable} />
      <SelectTableModal visible={viewSelectTableModal} setVisibility={setSelectTableModal} onSelect={onSelectTab} tables={tables} />
    </>
  );
};

