import { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function ViewAllTabs({ onSelectTab }) {

    const headers = ["Tab", "Arrival", "PAX", "Total"];
    const [tables, setTables] = useState([{}]);

    useEffect(() => {
        fetchData();
      },[]);
      
    async function fetchData(){ 
        
      try { 
        const response = await fetch('http://localhost:8080/tables');
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

    function sortBy(title){
      const propertyName = headers.filter(h => h === title).toString();
      console.log(`Prop Name ${propertyName}`);
      console.log(tables);

      const sortedData = [].concat(tables.sort((a, b) => (a.openedAt > b.openedAt) ? 1 : -1))
      console.log(sortedData);
      console.log(tables);

    }

    return (
      <>
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
                      <DataTable.Cell><Text>{item.tableNo}</Text></DataTable.Cell>
                      <DataTable.Cell>
                        <Text>{ item.openedAt ? formatTime(item.openedAt) : ""}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell><Text>{item.pax}</Text></DataTable.Cell>
                      <DataTable.Cell><Text>{`$${item.total}`}</Text></DataTable.Cell>
                  </DataTable.Row>
              ))
            ) : null}
    
        </DataTable>
    </>
    )
}

