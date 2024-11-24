import React, { useState, useEffect } from 'react';
import { View, ScrollView, Pressable, SafeAreaView, StyleSheet } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import { connection } from '../../config/config.json';

import TabBtnMenu from '../../components/tab/TabBtnMenu.jsx';

import LoadingIndicator from '../../components/LoadingIndicator.jsx';
import ShowError from '../../components/ShowError.jsx';
import { withTimeout } from '../../components/WithTimeout.jsx';
import styles from '../../styles/posStyles.js';

export default function ViewAllTabs({ onSelectTab }) {
  const headers = ["Tab", "Arrival", "PAX", "Total"];

  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTable, setSelectedTable] = useState(undefined);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if(refresh) {
      fetchData();
      setRefresh(false);
    }
  }, [refresh]);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await withTimeout(fetch(`${connection}/tables`, { method: 'GET' }), 5000);
      const tabs = await response.json();

      if (!tabs.success) {
        return ShowError('No tables found');
      }

      setTables(tabs.msg);
    } catch (err) {
      
      ShowError('Failed to load tables. ' + err);
    } finally {
      setLoading(false);
    }
  }

  function handleHighlightTable(tableNo){
    if(selectedTable == tableNo) {
      return setSelectedTable(undefined);
    }
    setSelectedTable(tableNo);
  }  


  function formatTime(formatDate) {
    const date = new Date(formatDate);
    const options = { hour: '2-digit', minute: '2-digit', hour12: true };
    return date.toLocaleTimeString([], options);
  }

  function sortBy(title) {
    let sortedData = [...tables];
    switch (title) {
      case "PAX":
        sortedData.sort((a, b) => a.pax - b.pax);
        break;
      case "Total":
        sortedData.sort((a, b) => a.total - b.total);
        break;
      case "Tab":
        sortedData.sort((a, b) => a.tableNo - b.tableNo);
        break;
      case "Arrival":
        sortedData.sort((a, b) => new Date(a.openedAt) - new Date(b.openedAt));
        break;
      default:
        break;
    }
    setTables(sortedData);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.managerMainContainer}>
      {loading ? (
            <LoadingIndicator/>
          ) : (
        <ScrollView  style={{flex:1}}>         
            <DataTable>
              <DataTable.Header>
                {headers.map((header, index) => (
                  <DataTable.Title
                    key={index}
                    sortDirection='descending'
                    onPress={() => sortBy(header)}
                  >
                    <Text variant='titleMedium'>{header}</Text>
                  </DataTable.Title>
                ))}
              </DataTable.Header>
              {tables && Array.isArray(tables) && tables.length > 0 ? (
                tables.map((item, index) => (
                  <Pressable
                    key={index}
                    onPress={() => handleHighlightTable(item.tableNo)}
                  >
                     <DataTable.Row
                        style={selectedTable === item.tableNo ? tabStyle.highlightedRow : null}
                      >
                      <DataTable.Cell>
                        <Text style={selectedTable === item.tableNo && tabStyle.highlightText}>{item.tableNo}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={selectedTable === item.tableNo && tabStyle.highlightText}>{item.openedAt ? formatTime(item.openedAt) : ""}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={selectedTable === item.tableNo && tabStyle.highlightText}>{item.pax}</Text>
                      </DataTable.Cell>
                      <DataTable.Cell>
                        <Text style={selectedTable === item.tableNo && tabStyle.highlightText}>{`$${item.total.toFixed(2)}`}</Text>
                      </DataTable.Cell>
                    </DataTable.Row>
                  </Pressable>
                ))
              ) : (
                <View style={styles.loadingContainer}>
                  <Text variant="headlineMedium" style={{}}>
                    Tables
                  </Text>
                  <Text variant="bodyLarge" style={{}}>
                    No tables are currently open
                  </Text>
                </View>
              )}
            </DataTable>
        </ScrollView>
        )}
      </View>
      <TabBtnMenu
        tableNo={tables.filter(t => t.tableNo == selectedTable).toString()}
        handleSelectedTab={() => onSelectTab(selectedTable)}
        refresh={setRefresh}
        loading={setLoading}
      />
    </SafeAreaView>
  );
}

const tabStyle = StyleSheet.create({
  highlightedRow: {
    borderBottomWidth: 1,
    borderColor: '#9C404D',
    backgroundColor: '#9C404D',
    borderRadius: 5
  },
  highlightText:{
    color: '#ffffff',
  }
})
