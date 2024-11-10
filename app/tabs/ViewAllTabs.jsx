import React, { useState, useEffect } from 'react';
import { View, Alert, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { DataTable, Text } from 'react-native-paper';
import { connection } from '../../config/config.json';

import TabBtnMenu from '../../components/tab/TabBtnMenu.jsx';
import AddTableModal from '../../components/modals/AddTable.jsx';
import SelectTableModal from '../../components/modals/SelectTable.jsx';
import LoadingIndicator from '../../components/LoadingIndicator.jsx';
import ShowError from '../../components/ShowError.jsx';
import { withTimeout } from '../../components/WithTimeout.jsx';
import styles from '../../styles/posStyles.js';
import ErrorBoundary from '../../components/ErrorBoundary.jsx';

export default function ViewAllTabs({ onSelectTab }) {
  const headers = ["Tab", "Arrival", "PAX", "Total"];
  const [tables, setTables] = useState([]);
  const [newTable, setNewTable] = useState({});
  const [viewTableModal, setViewTableModal] = useState(false);
  const [viewSelectTableModal, setSelectTableModal] = useState(false);
  const [highlightOrder, setHighlightOrder] = useState(false);
  const [loadingTables, setLoadingTables] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoadingTables(true);
    try {
      const response = await withTimeout(fetch(`${connection}/tables`, { method: 'GET' }), 5000);
      const tabs = await response.json();

      if (!tabs.success) {
        ShowError('No tables found');
        console.error('Fetch error', tabs.msg);
        return;
      }
      setTables(tabs.msg);
    } catch (err) {
      console.error('Error', err)
      ShowError('Failed to load tables. Please check your network connection');
    } finally {
      setLoadingTables(false);
    }
  }

  async function addNewTable(nTableNo, nPax, nLimit) {
    try {
      const createTable = {
        tableNo: nTableNo,
        pax: nPax,
        limit: nLimit,
      };

      const response = await fetch(`${connection}/add-table`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(createTable),
      });

      const data = await response.json();

      if (!data.success) {
        return Alert.alert(data.msg);
      }

      setNewTable(data._id);
      setViewTableModal(false);
    } catch (err) {
      console.error(err.message);
    }
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
      {loadingTables ? (
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
                    onPress={() => onSelectTab(item.tableNo)}
                    onLongPress={() => setHighlightOrder(true)}
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
              ) : (
                <View style={styles.loadingContainer}>
                  <Text variant='bodyLarge' style={{color:'grey'}}>Error loading tables</Text>
                </View>              
              )}
            </DataTable>
        </ScrollView>
        )}
      </View>
      <TabBtnMenu
        tableNo={newTable.tableNo}
        setViewTableModal={setViewTableModal}
        highlightOrder={highlightOrder}
      />
      <ErrorBoundary>
        <AddTableModal visible={viewTableModal} setVisibility={setViewTableModal} onAdd={addNewTable} />
        <SelectTableModal visible={viewSelectTableModal} setVisibility={setSelectTableModal} onSelect={onSelectTab} tables={tables} />
      </ErrorBoundary>
    </SafeAreaView>
  );
}
