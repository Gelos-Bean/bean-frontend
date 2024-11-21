import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Alert,
  ScrollView,
  Pressable
} from 'react-native';
import { 
  Button, 
  Text, 
  Card, 
  IconButton
 } from 'react-native-paper';

import Header from '../components/Header.jsx';
import { connection } from '../config/config.json';
import styles from '../styles/posStyles';
import ErrorBoundary from '../components/ErrorBoundary.jsx';
import LoadingIndicator from '../components/LoadingIndicator.jsx';
import ShowError from '../components/ShowError.jsx';
import { withTimeout } from '../components/WithTimeout.jsx';

import AddTableModal from '../components/modals/AddTable.jsx';
import SelectTableModal from '../components/modals/SelectTable.jsx';
import OptionModal from '../components/modals/Options.jsx';
import SearchModal from '../components/modals/SearchModal.jsx';
import FreeTextModal from '../components/modals/FreeText.jsx';
import ConfirmationModal from '../components/modals/ConfirmationModal.jsx';

const App = () => {
  
  // Loading indicators
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingAddTable, setLoadingAddTable] = useState(false);

  // Modals
  const [viewAddTableModal, setViewAddTableModal] = useState(false);
  const [selectTableModal, setSelectTableModal] = useState(false);
  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [freeTextModalVisible, setFreeTextModalVisible] = useState(false);
  // Confirmation modal
  const [viewConfirmationModal, setViewConfirmationModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Undefined');
  const [modalBody, setModalBody] = useState('Undefined');



  const Separator = () => <View style={styles.separator} />;
  
  //Products
  const [products, setProducts] = useState([]); 
  async function PopulateProducts() {
    setLoadingProducts(true);
    if (!connection) {
      ShowError('Connection configuration is missing');
      setLoadingProducts(false); 
      return;
    }
    try {
      const response = await withTimeout(fetch(`${connection}/products`, { method: 'GET' }), 5000);
  
      if (!response.ok) {
        const errorMessage = 'Server responded with an error';
        ShowError(errorMessage);
        console.error(errorMessage, response.statusText);
        return;
      }
  
      const data = await response.json();
  
      if (data.success && Array.isArray(data.msg)) {
        setProducts(data.msg);
      } else {
        const errorMessage = typeof data.msg === 'string' ? data.msg : 'No products found';
        ShowError(errorMessage);
      }
    } catch (err) {
      console.error('Search error:', err);
      ShowError('Failed to load products. Please check your network connection.');
    } finally {
      setLoadingProducts(false);
    }
  }
  

  const [selectedCourse, setSelectedCourse] = useState('Starter');

  // Make an order
  const [orderProducts, setOrderProducts] = useState([])
  const [total, setTotal] = useState(0);

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
  
  //Add comment to order
  const [comment, setComment] = useState('');
  const addComment = (newComment) => {
    console.log(newComment);
    if(newComment.length <= 0) {
      Alert.alert('Error', 'Comment must be longer than 0 characters')
      return;
    } else if (newComment.length >= 200 ) {
      Alert.alert('Error', 'Comment cannot be longer than 200 characters');
      return;
    } else {
      setComment(newComment);
    }
  }
  const clearCommentModal = () => {
    setModalTitle('Clear Comment')
    setModalBody(`Are you sure you would like to to clear the comment?`)
    setViewConfirmationModal(true);
  }
  const clearComment = (selection) => {
    selection ? setComment('') : null;
  }

  //Void item
  const voidItem = () => {
    if (!selectedProduct) {
      Alert.alert('Error', 'Please select a product to void');
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
  const [tables, setTables] = useState([])
  const [selectedTable, setSelectedTable] = useState(null);

  //Populate tables
  async function PopulateTables() {
    if (!connection) {
      ShowError('Connection configuration is missing');
      return;
    }
    try {
      const response = await fetch(`${connection}/tables`, {
        method: 'GET',
      });

      if (!response.ok) {
        const errorMessage = 'Server responded with an error';
        ShowError(errorMessage);
        console.error(errorMessage, response.statusText);
        return;
      }

      const data = await response.json();

      if (data.success) {
        setTables(data.msg);
      } else {
        const errorMessage = typeof data.msg === 'string' ? data.msg : 'Error retrieving tables';
        ShowError(errorMessage);
      }
    } catch (err) {
      console.error('Error fetching tables:', err);
      ShowError('Failed to load tables. Please check your network connection.');
    }
  }

  // New table:
  async function AddTable(tableNum, pax, limit) {
    if (!connection) {
      ShowError('Connection configuration is missing');
      return;
    }

    setLoadingAddTable(true); 

    try {
      const table = {
        tableNo: tableNum,
        pax: pax,
        limit: limit,
      };

      const addResponse = await fetch(`${connection}/tables`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(table),
      });

      if (!addResponse.ok) {
        const errorData = await addResponse.json();
        ShowError(errorData.msg || 'Failed to add table');
        return;
      }

      const data = await addResponse.json();

      if (!data.success) {
        ShowError(data.msg);
        console.error('Error', data.msg);
        return;
      }

      setSelectedTable({ tableNo: tableNum, _id: data._id });
      setViewAddTableModal(false);  

    } catch (err) {
      ShowError('Failed to connect to the server. Please check your network.');
      console.error('Error', err);
      
    } finally {
      setLoadingAddTable(false); 
    }
  }
    

  // Place order:
  async function PlaceOrder() {
    if(selectedTable === null)
    {
      Alert.alert('Error', 'Please select a table before placing an order')
      return;
    }
    if(orderProducts.length === 0)
      {
        Alert.alert('Error', 'No products selected')
        return;
      }

    const order = {
      table: selectedTable, 
      products: orderProducts.map(item => ({
        item: item._id,
        selectedOptions: item.selectedOptions.map(option => option._id),
        quantity: item.quantity
      })),
      comment:comment,
      total: total
    };

    if (!connection) {
      ShowError('Connection configuration is missing');
      return;
    }
  
    try {
      const response = await fetch(`${connection}/add-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order)
      });

      if (!response.ok) {
        const errorMessage = 'Order not placed. The server responded with an error';
        ShowError(errorMessage);
        console.error(errorMessage, response.statusText);
        return;
      }
  
      const data = await response.json();
      if (!data.success) {
        ShowError(data.msg);
        console.error('Error', data.msg);

      }

      setOrderProducts([]);
      setSelectedTable(null);
      setComment('');

    } catch (error) {
      console.error('Error placing order:', error);
      ShowError('Failed to place order. Please check your network connection.');
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
            icon="baguette"
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
            icon="food-turkey"
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
            icon="cupcake"
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
            icon="glass-mug-variant"
            onPress={() => setSelectedCourse('Beverage')}
            disabled={selectedCourse === 'Beverage'}>
            Beverages
          </Button>
        </View>
        {loadingProducts ? (
                <LoadingIndicator />
              ) : (
        <ScrollView contentContainerStyle={ styles.cardContainer }>
        {products && Array.isArray(products) && products.length > 0 ? (
          products
          .filter((p) => p.course === selectedCourse)
          .map((product) => (
            <Card key={product._id} 
                  style={styles.cardStyle}
                  mode='outlined'
                  onPress={() => handleProductSelect(product)}>
              <Card.Cover 
                source={{ uri: product.image || 'https://www.pngkey.com/png/detail/233-2332677_image-500580-placeholder-transparent.png' }} 
                style={styles.cardCover}
              />
              <Card.Content >
                <Text variant="bodyMedium" style={{marginTop:'5%'}}>{product.name}</Text>
              </Card.Content>
            </Card>
          ))) : (
            <View style={styles.loadingContainer}>
              <Text variant="headlineMedium" style={{}}>
                Products
              </Text>
              <Text variant="bodyLarge" style={{}}>
                No products found on the database
              </Text>
          </View>
          )}
      </ScrollView>
              )}
      </View>
      </View>
      <View style={styles.wideButtonContainer}>
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
          <View style={styles.commentContainer}>
            <Text variant='labelLarge'>
              Comment: </Text>
            <Text variant='bodyMedium' numberOfLines={1} ellipsizeMode="tail">
              {comment}</Text>
          </View>
          
        </View>
        <View style={styles.verticalSeparator}></View>
        <View style={styles.buttonColumn}>
          <View style={styles.buttonRow}>
              <View style={styles.displayPortal}>
                <Text variant='bodySmall'>Total</Text>
                <Text variant='labelLarge'>${total.toFixed(2)}</Text>
              </View>
              <View style={styles.displayPortal}>
                <Text variant='bodySmall'>Table:</Text>
                <Text variant='labelLarge'>{selectedTable === null ? '-' : selectedTable.tableNo}</Text>
                <IconButton
                  icon="close-circle"
                  iconColor='#000000'
                  onPress={() => setSelectedTable(null)}
                />
              </View>
              <IconButton style={styles.squareButton}
                    icon="plus"
                    mode="contained"
                    selected={true}
                    size={30}
                    onPress={() => setViewAddTableModal(true)}
                  />
          </View>
          <View style={styles.buttonRow}>
             <View>
              <IconButton style={styles.squareButton}
                  icon="minus-circle"
                  mode="contained"
                  selected={true}
                  onPress={() => voidItem()}
                  size={30}
                />
                <Text variant='bodySmall' style={styles.buttonText}>Void Item</Text>
            </View>
            <View>
              <IconButton style={styles.squareButton}
                icon="minus-circle-multiple"
                mode="contained"
                selected={true}
                size={30}
                onPress={() => setOrderProducts([])}
              />
              <Text variant='bodySmall' style={styles.buttonText}>Void Order</Text>
            </View>
            <View>
              <IconButton style={styles.squareButton}
                icon="pencil"
                mode="contained"
                selected={true}
                size={30}
                onPress={() => setFreeTextModalVisible(true)}
              />
              <Text variant='bodySmall' style={styles.buttonText}>Free Text</Text>
            </View>
            <View>
              <IconButton style={styles.squareButton}
                icon="magnify"
                mode="contained"
                selected={true}
                size={30}
                onPress={() => setSearchModalVisible(true)}
              />
              <Text variant='bodySmall' style={styles.buttonText}>Search</Text>
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
              <IconButton style={styles.squareButton}
                icon="table-furniture"
                mode="contained"
                selected={true}
                size={30}
                onPress={() => setSelectTableModal(true)}/>
            </View>
          </View>   
        </View>
      </View>
    </Pressable>
    {/* Modals */}
    <ErrorBoundary>
      <AddTableModal    visible={viewAddTableModal} onDismiss={() => setViewAddTableModal(false)} 
                        onAdd={AddTable}  loading={loadingAddTable}
/>
      <SelectTableModal visible={selectTableModal} setVisibility={setSelectTableModal} 
                        tables={tables} onSelect={setSelectedTable}/>
      <OptionModal      visible={optionModalVisible} onDismiss={() => setOptionModalVisible(false)} 
                        product={selectedProduct} addToOrder={addToOrder}/>
      <SearchModal      visible={searchModalVisible} onDismiss={() => setSearchModalVisible(false)} 
                        onSelect={handleProductSelect}/>
      <FreeTextModal    visible={freeTextModalVisible} onDismiss={() => setFreeTextModalVisible(false)} 
                        onAdd={addComment} onClear={clearCommentModal}/>
      <ConfirmationModal
                        visible={viewConfirmationModal}
                        onDismiss={() => setViewConfirmationModal(false)}
                        title={modalTitle}
                        body={modalBody}
                        onSelect={clearComment}/>
    </ErrorBoundary>
  </SafeAreaView>
  
)};

export default App;