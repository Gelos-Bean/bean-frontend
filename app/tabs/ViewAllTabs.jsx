import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { DataTable } from 'react-native-paper';
import { connection } from '../../config/config.json';

import TabBtnMenu from '../../components/tab/TabBtnMenu.jsx';
import AddTableModal from '../../components/modals/addTable.jsx';

import styles from '../../styles/posStyles.js';


export default function ViewAllTabs({ onSelectTab }) {

  const headers = ["Tab", "Arrival", "PAX", "Total"];
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState({});
  const [viewTableModal, setViewTableModal] = useState(false);


  useEffect(() => {
      fetchData();
    },[tables]);

      
  async function fetchData(){ 
      
    try { 
      const response = await fetch(`${connection}/tables`);
      const tabs = await response.json();

//------> Create functionality to display this error to user
      if (!tabs.success) {
        return console.log(`Error: ${tabs.msg}`);
      }
          
      setTables(tabs.msg);
  
    } catch(err) {
      console.log(err);
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
                        <Text>{header}</Text>
                    </DataTable.Title>
                  ))}            
            </DataTable.Header>
        
            {tables && Array.isArray(tables) && tables.length > 0 ? (
              tables.map((item, index) => (
                  <DataTable.Row key={index}
                          onPress={() => {onSelectTab(item.tableNo)}}>
                      <DataTable.Cell>
                        <Text>{item.tableNo}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text>{ item.openedAt ? formatTime(item.openedAt) : ""}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text>{item.pax}</Text>
                        </DataTable.Cell>
                      <DataTable.Cell>
                        <Text>{`$${item.total.toFixed(2)}`}</Text>
                      </DataTable.Cell>
                  </DataTable.Row>
              ))
            ) : null}
    
          </DataTable>
        </ScrollView>
      </View>
      <View style={styles.rightContainer}>
          <View style={{flex: 3}}>
            <TabBtnMenu 
              setNewTable={setNewTable}
              setViewTableModal={setViewTableModal}
            />
          </View>
      </View>
      <AddTableModal    
        visible={viewTableModal}
        setVisibility={setViewTableModal}
        onAdd={setNewTable}
      />
    </>
  );
};

