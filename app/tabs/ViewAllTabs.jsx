import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { DataTable, Checkbox } from 'react-native-paper';

export default function ViewAllTabs({ onSelectTab }) {

    const headers = ["Tab", "Arrival", "PAX", "Total", "Select"];
    const [tables, setTables] = useState([{}]);
    const [checked, setChecked] = useState({});

    useEffect(() => {
        fetchData();
      },[]);
      
    async function fetchData(){ 
        
      try { 
        const response = await fetch('http://localhost:8080/tables');
        const tabs = await response.json();
  
  //------> Create functionality to display this error to user
        if (!tabs.success) {
          console.log("Error loading data");
          return;
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

    function handleCheckbox(tabId){
      setChecked({tabId});
    }

    return (
      <>
        <DataTable>
            <DataTable.Header>
                {headers.map((header, index) => (                  
                    <DataTable.Title key={index}><Text>{header}</Text></DataTable.Title>
                    ))}            
            </DataTable.Header>
        
            {tables && Array.isArray(tables) && tables.length > 0 ? (
              tables.map((item, index) => (
                  <DataTable.Row key={index}
                          onPress={() => {onSelectTab(item.tableNo)}}>
                      <DataTable.Cell><Text>{item.tableNo}</Text></DataTable.Cell>
                      <DataTable.Cell>
                        <Text>{ item.openedAt ? formatTime(openedAt) : ""}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell><Text>{item.pax}</Text></DataTable.Cell>
                      <DataTable.Cell><Text>{`$${item.total}`}</Text></DataTable.Cell>
                      <DataTable.Cell><Checkbox 
                          status={checked[item.index] ? 'checked' : 'unchecked'}
                          onPress={() => {
                            handleCheckbox(item.index);
                          }}
                        /></DataTable.Cell>
                  </DataTable.Row>
              ))
            ) : null}
    
        </DataTable>
    </>
    )
}

