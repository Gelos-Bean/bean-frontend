import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
  ScrollView
} from 'react-native';
import Header from '../../components/Header.jsx';
import { ToggleButton, Button, Text, Card, IconButton, MD3Colors, DataTable } from 'react-native-paper';
import styles from '../../styles/posStyles';

const Separator = () => <View style={styles.separator} />;

const App = () => {
  
  

  const [selectedTable, setSelectedTable] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState('Entrees');
  
  type Option = {
    _id: string;
    name: string;
    price: number;
  }
  
  type Product = {
    _id: string;

    name: string;
    price: number;
    course: string;
    options?: {item: Option}[]; //optional
    image?: string;    //optional
  };


  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0]
  );

  const [items] = React.useState([
    {
      key: 1,
      name: 'Cupcake',
      price: 1,
      quantity: 1,
    },
    {
      key: 2,
      name: 'Eclair',
      price: 1,
      quantity: 1,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      price: 1,
      quantity: 1,
    },
    {
      key: 4,
      name: 'Gingerbread',
      price: 1,
      quantity: 1,
    },
   ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
  <SafeAreaView style={styles.container}>
    <Header title={"Home"}
      location={"Sydney"}
      username={null} />
    <Separator />
    <View style={styles.body}>
      <View style={{flexDirection:'row', flex:100}}>
        <View style={styles.halfMainContainer}>
        <View style={styles.tabBar}>
          <Button
            style={[
              styles.tabButton,
              selectedTab === 'Entrees' ? styles.activeTab : styles.inactiveTab
            ]}
            mode="contained"
            onPress={() => setSelectedTab('Entrees')}
            disabled={selectedTab === 'Entrees'}>
            Entrees
          </Button>
          <Button
            style={[
              styles.tabButton,
              selectedTab === 'Mains' ? styles.activeTab : styles.inactiveTab
            ]}
            mode="contained"
            onPress={() => setSelectedTab('Mains')}
            disabled={selectedTab === 'Mains'}>
            Mains
          </Button>
          <Button
            style={[
              styles.tabButton,
              selectedTab === 'Desserts' ? styles.activeTab : styles.inactiveTab
            ]}
            mode="contained"
            onPress={() => setSelectedTab('Desserts')}
            disabled={selectedTab === 'Desserts'}>
            Desserts
          </Button>
        </View>
          <Card style={styles.cardStyle}>
            <Card.Cover 
              source={{ uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }} 
              style={{ height: 100 }}/>
            <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Example of extra text</Text>
            </Card.Content>
          </Card>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.numpadContainer}>
          <Text>Numpad</Text>
        </View>
      </View>
      
      </View>
      <View style={[styles.wideButtonContainer, {flex:47, flexDirection:'row'}]}>
        <View style={styles.tableContainer}>
        {/* Enable vertical scrolling */}
        <ScrollView>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={styles.headerRow}>
              <Text variant='bodySmall' style={[styles.cell, styles.headerText, {flex:2}]}>Product</Text>
              <Text variant='bodySmall' style={[styles.cell, styles.headerText, {flex:1}]}>Price</Text>
              <Text variant='bodySmall' style={[styles.cell, styles.headerText, {flex:1}]}>Quantity</Text>
            </View>

            {/* Table Body - Create rows dynamically */}
            {items.map((item) => (
              <View key={item.key} style={styles.row}>
                <Text variant='bodyMedium' style={[styles.cell, {flex:2}]}>{item.name}</Text>
                <Text variant='bodyMedium' style={[styles.cell, {flex:1}]}>${item.price}</Text>
                <Text variant='bodyMedium' style={[styles.cell, {flex:1}]}>x{item.quantity}</Text>
              </View>
            ))}
          </View>
        </ScrollView>
        </View>
        
        <View style={{flexDirection:'column',flex:1}}>
          <View style={styles.buttonRow}>
              <View style={styles.displayPortal}>
                <Text variant='bodySmall'>Total</Text>
                <Text variant='labelLarge'>${}</Text>
              </View>
              <View style={styles.displayPortal}>
                <Text variant='bodySmall'>Tab:</Text>
                <Text variant='labelLarge'>{selectedTable}</Text>
              </View>
              <IconButton style={[styles.squareButton, {}]}
                    icon="plus"
                    iconColor='rgb(229 220 200)'
                    containerColor='rgb(156, 64, 77)'
                    mode="contained"
                    size={30}
                  />
              <IconButton style={styles.squareButton}
                icon="cards-variant"
                iconColor='rgb(229 220 200)'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={30}
              />
          </View>
          <View style={[styles.buttonRow]}>
              <IconButton style={styles.squareButton}
                icon="minus-circle"
                iconColor='rgb(229 220 200)'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={30}
              />
              <IconButton style={styles.squareButton}
                icon="minus-circle-multiple"
                iconColor='rgb(229 220 200)'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={30}
                onPress={() => console.log('Edit not implemented')}
              />
              <IconButton style={styles.squareButton}
                icon="pencil"
                iconColor='rgb(229 220 200)'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={30}
              />
              <IconButton style={styles.squareButton}
                icon="magnify"
                iconColor='rgb(229 220 200)'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={30}
              />
              <IconButton style={styles.squareButton}
                icon="view-list"
                iconColor='rgb(229 220 200)'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={30}
              />
            </View>
            
            <View style={styles.buttonRow}>
              <Button style={[styles.squareButton, styles.wideButton]}
                mode="contained"
                icon="credit-card-outline">              
                Quick Pay
              </Button>
              <Button style={[styles.squareButton, styles.wideButton]}
                mode="contained"
                icon="send">              
                Add to Tab
              </Button>
              <IconButton style={styles.roundButton}
                icon="home-roof"
                iconColor='rgb(229 220 200)'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={30}
              />
              </View>
            </View>   
        </View>
        </View>

      
  </SafeAreaView>
)};

export default App;