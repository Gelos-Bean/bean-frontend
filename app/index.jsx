import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Alert,
  ScrollView,
  Pressable
} from 'react-native';
import Header from '../components/Header.jsx';
import { Button, Text, Card, IconButton, MD3Colors, DataTable } from 'react-native-paper';
import { connection } from '../config/config.json';
import styles from '../styles/posStyles';

import AddTableModal from '../components/modals/addTable.jsx'
import SelectTableModal from '../components/modals/selectTable.jsx'
import OptionModal from '../components/modals/options.jsx'

const App = () => {
  
  // Modals
// ---> NB Cut down extra function calls for setting visible state of add table model
  const [viewTableModal, setViewTableModal] = useState(false);

  const [selectTableModalVisible, setSelectTableModalVisible] = useState(false);
  const showSelectTableModal = () => setSelectTableModalVisible(true);
  const hideSelectTableModal = () => setSelectTableModalVisible(false);

  const [optionModalVisible, setOptionModalVisible] = useState(false);


  const Separator = () => <View style={styles.separator} />;
  
  //Products
  const [products, setProducts] = useState([]); 
  async function PopulateProducts() {
    try {
      const response = await fetch(`${connection}/products`, {
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
  const [selectedCourse, setSelectedCourse] = useState('Starter');

  // Make an order
  const [orderProducts, setOrderProducts] = useState([])
  const [total, setTotal] = useState(0);
  const [comment, setComment] = useState('');

  // Modify order
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  //Add item to order
  const handleProductSelect = (product) => {
    if (product.options && product.options.length > 0) {
      setSelectedProduct(product);
      setOptionModalVisible(true);
    } else {
      addToOrder(product, []);
    }
  };

  const addToOrder = (product, options) => {
    const existingProductIndex = orderProducts.findIndex(p => p._id === product._id && JSON.stringify(p.selectedOptions) === JSON.stringify(options));
    
    if (existingProductIndex !== -1) {
      const updatedOrderProducts = [...orderProducts];
      updatedOrderProducts[existingProductIndex].quantity += 1;
      setOrderProducts(updatedOrderProducts);
    } else {
      const newProduct = {
        ...product,
        selectedOptions: options,
        quantity: 1
      };
      setOrderProducts([...orderProducts, newProduct]);
    }
    setSelectedProduct(null);
    setSelectedOptions([]);
  };
  
  const voidItem = () => {
    if (!selectedProduct) {
      Alert.alert('Error', 'Please select a product to void');
      console.log('Error', 'Please select a product to void')
    } else {
      const updatedOrderProducts = orderProducts
        .map((p) => {
          if (p._id === selectedProduct._id) {
            if (p.quantity > 1) {
              return { ...p, quantity: p.quantity - 1 };
            }
            return null;
          }
          return p;
        })
        .filter(p => p !== null); 
  
      setOrderProducts(updatedOrderProducts);
    }
  };
  
  //Tables:
  const [tables, setTables] = React.useState([])
  const [selectedTable, setSelectedTable] = React.useState(null);

  //Populate tables
  async function PopulateTables() {
    try {
      const response = await fetch(`${connection}/tables`, {
        method: 'GET',
      });

      if (!response.ok) {
        const error = await response.json();
        const errorMessage = typeof error.msg === 'string' ? error.msg : 'Unexpected error';
        Alert.alert('Error', errorMessage);
        return;
      }

      const data = await response.json();

      if (data.success) {
        setTables(data.msg);
      } else {
        const errorMessage = typeof data.msg === 'string' ? data.msg : 'Error collating tables';
        Alert.alert('Error', errorMessage);
      }
    } catch (err) {
      Alert.alert('Error', err);
    }
  }

  // New table:
  async function AddTable(tableNum, pax, limit) {
    try {
      const table = {
        tableNo: tableNum,
        pax: pax,
        limit: limit
      };
      try {
        const response = await fetch(`${connection}/tables/${table.tableNo}`, {
        method: 'GET',
        });

        const data = await response.json();

        if (data.success) {
          Alert.alert('Error', `Table ${tableNum} already exists`);
          console.log('Error', `Table ${tableNum} already exists`)
          return;
        }

        //Table number is free
          try {
            const tableJSON = JSON.stringify(table);

            const addResponse = await fetch(`${connection}/tables`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', 
              },
              body: tableJSON
            });

            const addData = await addResponse.json();
            if (addData.success) {
              
              const newTableResponse = await fetch(`${connection}/tables/${table.tableNo}`, {
                method: 'GET',
              });

              const newTableData = await newTableResponse.json();

              if (newTableData.success) {
                setSelectedTable(newTableData.msg);
                console.log(`New table created and selected:`, newTableData.msg);
              } else {
                Alert.alert('Error', `Unable to retrieve newly created table`);
              }

            } else {
              Alert.alert('Error', addData.msg);
            }
            } catch (err) {
              Alert.alert('Error', err.message)
            }
      } catch (err) {
        Alert.alert('Error', err.message);
      }
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  }

  // Select existing table:
  function SelectTable(table){
    setSelectedTable(table)
  }

  // Place order:
  async function PlaceOrder() {
    if(selectedTable === null)
    {
      Alert.alert('Error', 'Please select a table before placing an order')
      console.log('Error', 'Please select a table before placing an order')
      return;
    }
    if(orderProducts.length === 0)
      {
        Alert.alert('Error', 'No products selected')
        console.log('Error', 'No products selected')
        return;
      }
    const order = {
      table: selectedTable, 
      products: orderProducts.map(item => ({
        item: item._id,
        selectedOptions: item.selectedOptions.map(option => option._id),
        quantity: item.quantity
      })),
      comment:comment
    };
  
    try {
      const response = await fetch(`${connection}/add-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });
  
      const data = await response.json();
      if (data.success) {
        await AddProductsToTable();
        setOrderProducts([]);
        setSelectedTable(null);
      } else {
        Alert.alert('Error', data.msg);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }
  
  async function AddProductsToTable() {
    const updatedProducts = [
      ...selectedTable.products,
      ...orderProducts.map(product => ({
        item: product._id, 
        selectedOptions: product.selectedOptions || [], 
        quantity: product.quantity,
        _id: product._id 
      }))
    ];
    const updatedTable = {
      ...selectedTable, 
      products: updatedProducts, 
    };

    try {
      const response = await fetch(`${connection}/tables/${selectedTable._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedTable),
      });
  
      const data = await response.json();
      if (!data.success) {
        Alert.alert('Error', data.msg);
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

  // On Load:
  useEffect(() => {
    PopulateProducts();
    PopulateTables();
  }, []);

  // On orderProducts change:
  useEffect(() => {
    const newTotal = orderProducts.reduce((sum, product) => {
      // Calculate product price including selected options
      const productTotal = product.price + 
        (product.selectedOptions?.reduce((optionSum, option) => optionSum + option.price, 0) || 0);
      return sum + (productTotal * product.quantity);
    }, 0);
    setTotal(newTotal);
  }, [orderProducts]);


  return (
  <SafeAreaView style={styles.container}>
    <Header title={"Home"}
      location={"Sydney"}
      username={null} />
    <Separator />
    <Pressable style={{flex:1}}
                onPress={() => setSelectedProduct(null)}>
    <View style={styles.body}>
      <View style={{flexDirection:'row', flex:2}}>
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
                  onPress={() => handleProductSelect(product)}>
              <Card.Cover 
                source={{ uri: product.image || 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png' }} 
                style={styles.cardCover}
              />
              <Card.Content>
                <Text variant="bodySmall">{product.name}</Text>
              </Card.Content>
            </Card>
          ))}
      </ScrollView>
      </View>
      </View>
      <View style={[styles.wideButtonContainer, {flex:1, flexDirection:'row'}]}>
        <View style={styles.tableContainer}>
          <ScrollView>
            <View style={styles.table}>
              <View style={styles.headerRow}>
                <Text variant="bodySmall" style={[styles.cell, styles.headerText, { flex: 2 }]}>Product</Text>
                <Text variant="bodySmall" style={[styles.cell, styles.headerText, { flex: 1 }]}>Price</Text>
                <Text variant="bodySmall" style={[styles.cell, styles.headerText, { flex: 1 }]}>Quantity</Text>
              </View>

              {orderProducts.map((item, index) => (
                <View key={`${item._id}-${index}`}>
                  <Pressable onPress={() => setSelectedProduct(item)} 
                  style={[styles.row,
                          selectedProduct && selectedProduct._id === item._id && styles.highlightedRow
                        ]}>
                    <Text variant="bodyMedium" style={[styles.cell,
                                                        { flex: 2 },
                                                        selectedProduct && selectedProduct._id === item._id && styles.highlightedText
                                                        ]}>
                      {item.name}</Text>
                    <Text variant="bodyMedium" style={[styles.cell,
                                                        { flex: 1 },
                                                        selectedProduct && selectedProduct._id === item._id && styles.highlightedText
                                                      ]}>
                      ${(item.price + (item.selectedOptions?.reduce((sum, opt) => sum + opt.price, 0) || 0)) * item.quantity}
                    </Text>
                    <Text variant="bodyMedium" style={[styles.cell,
                                                        { flex: 1 },
                                                        selectedProduct && selectedProduct._id === item._id && styles.highlightedText
                                                      ]}>
                      x{item.quantity}</Text>
                  </Pressable>

                  {item.selectedOptions && item.selectedOptions.length > 0 && (
                    <View style={[styles.row, { paddingLeft: '5%' }]}>
                      <Text variant="bodySmall">Options:</Text>
                      {item.selectedOptions.map((option) => (
                        <Text key={option._id} variant="bodySmall">
                          - {option.name} (${option.price})
                        </Text>
                      ))}
                    </View>
                  )}
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
        <View style={{flexDirection:'column',flex:2, margin:'1%'}}>
          <View style={styles.buttonRow}>
              <View style={styles.displayPortal}>
                <Text variant='bodySmall'>Total</Text>
                <Text variant='labelLarge'>${total.toFixed(2)}</Text>
              </View>
              <View style={styles.displayPortal}>
                <Text variant='bodySmall'>Table:</Text>
                <Text variant='labelLarge'>{selectedTable === null ? '-' : selectedTable.tableNo}</Text>
                <IconButton
                  icon="close-circle-outline"
                  iconColor='#000000'
                  size={20}
                  onPress={() => setSelectedTable(null)}
                />
              </View>
              <IconButton style={[styles.squareButton, {}]}
                    icon="plus"
                    mode="contained"
                  selected={true}
                    size={30}
                    onPress={() => setViewTableModal(true)}
                  />
          </View>
          <View style={[styles.buttonRow]}>
             <View style={styles.buttonText}>
              <IconButton style={styles.squareButton}
                  icon="minus-circle"
                  mode="contained"
                  selected={true}
                  onPress={() => voidItem()}
                  size={30}
                />
                <Text variant='bodySmall'>Void Item</Text>
            </View>
            <View style={styles.buttonText}>
              <IconButton style={styles.squareButton}
                icon="minus-circle-multiple"
                mode="contained"
                selected={true}
                size={30}
                onPress={() => setOrderProducts([])}
              />
              <Text variant='bodySmall'>Void Order</Text>
            </View>
            <View style={styles.buttonText}>
              <IconButton style={styles.squareButton}
                icon="pencil"
                mode="contained"
                selected={true}
                size={30}
                disabled={true}
              />
              <Text variant='bodySmall'>Free Text</Text>
            </View>
            <View style={styles.buttonText}>
              <IconButton style={styles.squareButton}
                icon="magnify"
                mode="contained"
                selected={true}
                size={30}
                disabled={true}
              />
              <Text variant='bodySmall'>Search</Text>
            </View>
            <View style={styles.buttonText}>
              <IconButton style={styles.squareButton}
                icon="table-furniture"
                mode="contained"
                selected={true}
                size={30}
                onPress={showSelectTableModal}
              />
              <Text variant='bodySmall'>Table</Text>
            </View>
          </View>
            
            <View style={styles.buttonRow}>
              <Button style={[styles.squareButton, styles.wideButton]}
                mode="contained"
                icon="credit-card-outline"
                disabled={true}>              
                Quick Pay
              </Button>
              <Button style={[styles.squareButton, styles.wideButton]}
                mode="contained"
                icon="send"
                onPress={PlaceOrder}>                   
                Add to Tab
              </Button>
              <IconButton style={styles.roundButton}
                icon="home-roof"
                mode="contained"
                selected={true}
                size={30}
                disabled={true}
              />
              </View>
            </View>   
        </View>
      </View>
    </Pressable>
    {/* Modals */}
{/* NB passed viewTable state & it's setter to TableModal */}
    <AddTableModal    visible={viewTableModal} setVisibility={setViewTableModal} onAdd={AddTable} />
    <SelectTableModal visible={selectTableModalVisible} onDismiss={hideSelectTableModal} 
                      tables={tables} onSelect={SelectTable}/>
    <OptionModal      visible={optionModalVisible} onDismiss={() => setOptionModalVisible(false)} 
                      product={selectedProduct} addToOrder={addToOrder}/>
  </SafeAreaView>
)};

export default App;