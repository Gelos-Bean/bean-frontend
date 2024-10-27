import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Alert,
  ScrollView,
  Pressable
} from 'react-native';
import Header from '../../components/Header.jsx';
import { Button, Text, Card, IconButton, MD3Colors, DataTable } from 'react-native-paper';
import styles from '../../styles/posStyles.js';

import AddTableModal from '../../components/modals/addTable.jsx'

const App = () => {
  
  // Add table modal
  const [addTableModalVisible, setAddTableModalVisible] = useState(false);
  const showAddTableModal = () => setAddTableModalVisible(true);
  const hideAddTableModal = () => setAddTableModalVisible(false);

  const Separator = () => <View style={styles.separator} />;
  
  const [products, setProducts] = useState([]); // Use state to store products
  async function PopulateProducts() {
    try {
      const response = await fetch(`http://10.0.2.2:8080/products`, {
        method: 'GET',
      });

      if (!response.ok) {
        const error = await response.json();
        const errorMessage = typeof error.msg === 'string' ? error.msg : 'Unexpected error';
        Alert.alert('Error', errorMessage);
        return;
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.msg)) {
        setProducts(data.msg);
      } else {
        const errorMessage = typeof data.msg === 'string' ? data.msg : 'No products found';
        Alert.alert('Error', errorMessage);
      }
    } catch (err) {
      console.error('Search error:', err);
      Alert.alert('Error', 'Something went wrong');
    }
  }

  // Properties to make an order
  const [orderProducts, setOrderProducts] = useState([])
  const [total, setTotal] = useState(0);

  const [selectedTable, setSelectedTable] = React.useState(null);
  const [selectedCourse, setSelectedCourse] = React.useState('Starter');

  // Modify order
  const [selectedProduct, setSelectedProduct] = React.useState(null);
  const voidItem = () => {

    if(!selectedProduct){
      Alert.alert('Error', 'Please select a product to void');
    } else {
      var op = orderProducts.filter(p => p._id !== selectedProduct._id)
      setOrderProducts(op);
      setSelectedProduct(null); // Deselect after removing
    }
  };

  // On Load:
  useEffect(() => {
    PopulateProducts();
  }, []);

  // On orderProducts change:
  useEffect(() => {
    const newTotal = orderProducts.reduce((sum, product) => sum + product.price, 0);
    setTotal(newTotal);
  }, [orderProducts]); 
//Test Order

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

  return (
  <SafeAreaView style={styles.container}>
    <Header title={"Home"}
      location={"Sydney"}
      username={null} />
    <Separator />
    <Pressable style={{flex:1}}
                onPress={() => setSelectedProduct(null)}>
    <View style={styles.body}>
      <View style={{flexDirection:'row', flex:100}}>
        <View style={styles.halfMainContainer}>
        <View style={styles.tabBar}>
          <Button
            style={[
              styles.tabButton,
              selectedCourse === 'Starter' ? styles.activeTab : styles.inactiveTab
            ]}
            mode="contained"
            onPress={() => setSelectedCourse('Starter')}
            disabled={selectedCourse === 'Starter'}>
            Entrees
          </Button>
          <Button
            style={[
              styles.tabButton,
              selectedCourse === 'Main Course' ? styles.activeTab : styles.inactiveTab
            ]}
            mode="contained"
            onPress={() => setSelectedCourse('Main Course')}
            disabled={selectedCourse === 'Main Course'}>
            Mains
          </Button>
          <Button
            style={[
              styles.tabButton,
              selectedCourse === 'Dessert' ? styles.activeTab : styles.inactiveTab
            ]}
            mode="contained"
            onPress={() => setSelectedCourse('Dessert')}
            disabled={selectedCourse === 'Dessert'}>
            Desserts
          </Button>
          <Button
            style={[
              styles.tabButton,
              selectedCourse === 'Beverage' ? styles.activeTab : styles.inactiveTab
            ]}
            mode="contained"
            onPress={() => setSelectedCourse('Beverage')}
            disabled={selectedCourse === 'Beverage'}>
            Beverage
          </Button>
        </View>
        <ScrollView contentContainerStyle={ styles.cardContainer }>
        {products
          .filter((p) => p.course === selectedCourse)
          .map((product) => (
            <Card key={product._id} 
                  style={styles.cardStyle}
                  onPress={() => setOrderProducts([...orderProducts, product])}>
              <Card.Cover 
                source={{ uri: product.image || 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png' }} 
                style={styles.cardCover}
              />
              <Card.Content styles={styles.cardBody}>
                <Text variant="bodySmall">{product.name}</Text>
              </Card.Content>
            </Card>
          ))}
      </ScrollView>
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
            {orderProducts.map((item) => (
              <Pressable  key={item._id} 
                          onPress={() => setSelectedProduct(item)} 
                          style={[
                            styles.row, 
                            selectedProduct && selectedProduct._id === item._id && styles.highlightedRow
                          ]}>
                <Text variant='bodyMedium' style={[styles.cell, {flex:2}]}>{item.name}</Text>
                <Text variant='bodyMedium' style={[styles.cell, {flex:1}]}>${item.price}</Text>
                <Text variant='bodyMedium' style={[styles.cell, {flex:1}]}>x{item.quantity}</Text>
              </Pressable>
            ))}
          </View>
        </ScrollView>
        </View>
        
        <View style={{flexDirection:'column',flex:2}}>
          <View style={styles.buttonRow}>
              <View style={styles.displayPortal}>
                <Text variant='bodySmall'>Total</Text>
                <Text variant='labelLarge'>${total.toFixed(2)}</Text>
              </View>
              <View style={styles.displayPortal}>
                <Text variant='bodySmall'>Tab:</Text>
                <Text variant='labelLarge'>{selectedTable}</Text>
              </View>
              <IconButton style={[styles.squareButton, {}]}
                    icon="plus"
                    iconColor='#ffff'
                    containerColor='rgb(156, 64, 77)'
                    mode="contained"
                    size={30}
                    // onPress={showAddTableModal}
                  />
          </View>
          <View style={[styles.buttonRow]}>
             <View style={styles.buttonText}>
              <IconButton style={styles.squareButton}
                  icon="minus-circle"
                  iconColor='#ffff'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  onPress={() => voidItem()}
                  size={30}
                />
                <Text variant='bodySmall'>Void Item</Text>
            </View>
            <View style={styles.buttonText}>
              <IconButton style={styles.squareButton}
                icon="minus-circle-multiple"
                iconColor='#ffff'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={30}
                onPress={() => setOrderProducts([])}
              />
              <Text variant='bodySmall'>Void Order</Text>
            </View>
            <View style={styles.buttonText}>
              <IconButton style={styles.squareButton}
                icon="pencil"
                iconColor='#ffff'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={30}
              />
              <Text variant='bodySmall'>Free Text</Text>
            </View>
            <View style={styles.buttonText}>
              <IconButton style={styles.squareButton}
                icon="magnify"
                iconColor='#ffff'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={30}
              />
              <Text variant='bodySmall'>Search</Text>
            </View>
          </View>
            
            <View style={styles.buttonRow}>
              <Button style={[styles.squareButton, styles.wideButton]}
                mode="contained"
                icon="credit-card-outline">              
                Quick Pay
              </Button>
              <Button style={[styles.squareButton, styles.wideButton]}
                mode="contained"
                icon="send"
                onPress={() => orderProducts.forEach((ep) => console.log(ep.name))}>                   
                Add to Tab
              </Button>
              <IconButton style={styles.roundButton}
                icon="home-roof"
                iconColor='#ffff'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={30}
              />
              </View>
            </View>   
        </View>
      </View>
    </Pressable>
    <AddTableModal visible={addTableModalVisible} onDismiss={hideAddTableModal} />
      
  </SafeAreaView>
)};

export default App;