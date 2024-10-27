import { useState, useEffect } from 'react';
import { DataTable } from 'react-native-paper';

export default function ViewAllTabs({ onSelectTab }) {

    const headers = ["Tab", "Arrival", "PAX", "Total", "Status"];
    const [tables, setTables] = useState([{}]);

    useEffect(() => {
        fetchData();
      },[]);
      
      async function fetchData(){ 
        
        try { 
          const response = await fetch('http://10.0.2.2:8080/tables');
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

    return (
      <>
        <DataTable>
            <DataTable.Header>
                {headers.map((header, index) => (                  
                    <DataTable.Title key={index}>{header}</DataTable.Title>
                ))}            
            </DataTable.Header>
        
            {tables && Array.isArray(tables) && tables.length > 0 ? (
              tables.map((item, index) => (
                  <DataTable.Row key={index}
                          onPress={() => {onSelectTab(item.tableNo)}}>
                      <DataTable.Cell>{item.tableNo}</DataTable.Cell>
                      <DataTable.Cell>{ item.openedAt ? item.openedAt.split('T')[1].replace('.000Z', '') : ""}</DataTable.Cell>
                      <DataTable.Cell>{item.pax}</DataTable.Cell>
                      <DataTable.Cell>${item.total}</DataTable.Cell>
                      <DataTable.Cell>Status</DataTable.Cell>
                  </DataTable.Row>
              ))
            ) : null}
    
        </DataTable>
    </>
    )
}

