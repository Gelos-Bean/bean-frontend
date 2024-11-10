import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  Alert,
  Image,
  ScrollView,
} from 'react-native';

import { useRouter } from 'expo-router';
import { Button, Text, DataTable, List } from 'react-native-paper';
import { connection } from '../config/config.json';
import SearchModal from '../components/modals/SearchModal';
import NewProduct from '../components/modals/NewProduct';
import ShowError from '../components/ShowError';
import { withTimeout } from '../components/WithTimeout';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorBoundary from '../components/ErrorBoundary';
import ConfirmationModal from '../components/modals/ConfirmationModal';

import styles from '../styles/posStyles';

import Header from '../components/Header'

const Manager = () => {
  const router = useRouter();

  // Search product modal 
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  // New product modal 
  const [newProductModalVisible, setNewProductModalVisible] = useState(false);

  // Delete product modal
  const [viewConfirmationModal, setViewConfirmationModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Undefined');
  const [modalBody, setModalBody] = useState('Undefined');
  

  const Separator = () => <View style={styles.separator} />;
  
  //Get all products
  const [products, setProducts] = useState([]); 
  const [productsLoading, setProductsLoading] = useState(false);
  async function populateProducts() {
    setProductsLoading(true);
    try {
      const response = await withTimeout(fetch(`${connection}/products`, { method: 'GET' }), 5000);

      if (!response.ok) {
        const error = await response.json();
        const errorMessage = typeof error.msg === 'string' ? error.msg : 'Unexpected error';
        Alert.alert('Error', errorMessage);
        setProductsLoading(false);
        return;
      }

      const data = await response.json();

      if (data.success && Array.isArray(data.msg)) {
        setProducts(data.msg);
        populateOptions();
      } else {
        const errorMessage = typeof data.msg === 'string' ? data.msg : 'No products found';
        Alert.alert('Error', errorMessage);
      }
    } catch (err) {
      console.error('Search error:', err);
      ShowError('There was a problem retrieving products. Please check your network connection');
    } finally {
      setProductsLoading(false);
    }
  }
  const [options, setOptions] = useState([]);
  async function populateOptions() {
    try {
      const response = await fetch(`${connection}/options`, {
        method: 'GET',
      });
      const data = await response.json();
      if (data.success && Array.isArray(data.msg)) {
        setOptions(data.msg);
      }
    } catch (err) {
      console.error('Search error:', err);
      ShowError('Problem fetching options, something went wrong');
    }
  }

  //Handle options dropdown
  const [expanded, setExpanded] = useState({});

  const handlePress = (productId) => {
    setExpanded(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  //Handle Select row
  const [selectedProduct, setSelectedProduct] = useState(null);
  const handleRowSelect = (product) => {
    setSelectedProduct(product);
  };

  // Handle Add Product
  const handleAddProduct = async (newProduct) => { 
    try {
      const response = await fetch(`${connection}/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price) || 0,
          course: newProduct.course,
          options: newProduct.options || [],
          image: newProduct.image || ''
        })
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        console.error('Error:', data.msg);
        return { success: false, message: data.msg };
      }
        return { success: true, message: data.msg };
      
    } catch (error) {
      console.error('Request failed:', error);
      return { success: false, message: 'Failed to add product. Please check your network connection.' };
    }
  }

  // Handle Edit Product
  const handleEditProduct = async (id) => { };

  // Handle Delete Product 
  const [productToDelete, setProductToDelete] = useState(null);
  const ShowDeleteModal = () => {
    setProductToDelete(selectedProduct);
    setModalTitle('Delete Product')
    setModalBody(`Are you sure you would like to to delete ${selectedProduct.name}?`)
    setViewConfirmationModal(true);
  }
 async function DeleteProduct(selection) {
  if(!selection){
    setProductToDelete(null);
    return;
  } else {
    setProductToDelete(selection);
    try {
      const response = await fetch(`${connection}/products/${productToDelete._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await response.json();
      if (!data.success) {
        return Alert.alert('Error', data.msg);
      }
  
      setProductToDelete(null);
      populateProducts();
  
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

}

  // On Load:
  useEffect(() => {
    populateProducts();
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Manager"}
        location={"Sydney"}
        username={null}/>
      <Separator />
      <View style={styles.body}>
          <View style={styles.managerMainContainer}>
          <DataTable style={{ flex: 1 }}>
            <DataTable.Header>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Price</DataTable.Title>
              <DataTable.Title>Course</DataTable.Title>
              <DataTable.Title>Image</DataTable.Title>
              <DataTable.Title>Options</DataTable.Title>
            </DataTable.Header>
            <ScrollView contentContainerStyle={{ flexDirection: 'column' }}>
              {productsLoading ? (
                <LoadingIndicator />
              ) : (
                products && Array.isArray(products) && products.length > 0 && (
                  products.map((product) => (
                    <DataTable.Row
                      key={product._id}
                      onPress={() => handleRowSelect(product)}
                      style={[styles.largeRow,
                        selectedProduct && selectedProduct._id === product._id ? styles.largeHighlightedRow : null
                      ]}>
                      <DataTable.Cell><Text variant='bodyMedium'>{product.name}</Text></DataTable.Cell>
                      <DataTable.Cell><Text variant='bodyMedium'>${product.price}</Text></DataTable.Cell>
                      <DataTable.Cell><Text variant='labelMedium'>{product.course}</Text></DataTable.Cell>
                      <DataTable.Cell>{product.image}</DataTable.Cell>
                      <DataTable.Cell>
                        {product.options && product.options.length > 0 ? (
                          <List.Section
                            title="Options"
                            style={{
                              flexDirection: 'row',
                              paddingVertical: 0,
                              paddingHorizontal: 0,
                              marginHorizontal: 0,
                              marginVertical: 0,
                            }}
                          >
                            <List.Accordion
                              style={{
                                paddingVertical: 0,
                                paddingHorizontal: 0,
                                marginHorizontal: 0,
                                marginVertical: 0,
                              }}
                              expanded={expanded[product._id] || false}
                              onPress={() => handlePress(product._id)}
                            >
                              {product.options.map((option, index) => (
                                <List.Item
                                  key={index}
                                  title={<Text variant="bodySmall">{option.name} - ${option.price}</Text>}
                                />
                              ))}
                            </List.Accordion>
                          </List.Section>
                        ) : null}
                      </DataTable.Cell>
                    </DataTable.Row>
                  ))
                )
              )}
            </ScrollView>
          </DataTable>
          </View>
            <View style={[styles.managerButtonContainer, {flexDirection:'row'}]}>
                <View style={[styles.buttonRow, {flex:1}]}>
                  <Button style={[styles.squareButton, styles.wideButton]}
                      mode="contained"
                      icon="plus"
                      onPress={() => setNewProductModalVisible(true)}>              
                      Add
                  </Button>
                  <Button style={[styles.squareButton, styles.wideButton]}
                        mode="contained"
                        icon="magnify"
                        onPress={() => setSearchModalVisible(true)}>              
                        Lookup
                  </Button>
                  <Button style={[styles.squareButton, styles.wideButton]}
                      mode="contained"
                      icon="pencil"
                      disabled={true}>              
                      Edit
                  </Button>   
                  <Button style={[styles.squareButton, styles.wideButton]}
                      mode="contained"
                      icon="delete"
                      disabled={!selectedProduct}
                      onPress={ShowDeleteModal}>              
                      Delete
                  </Button>
                </View>
                <View style={styles.verticalSeparator}></View>
                <View style={[styles.buttonRow, {flex:1}]}>                  
                  <View style={styles.displayPortal}>
                    <Text variant='bodySmall'>Daily Total:</Text>
                    <Text variant='labelLarge'>$ null</Text>
                  </View>
                  <Button style={[styles.squareButton, styles.wideButton]}
                    mode="contained"
                    icon="poll"
                    disabled={true}>              
                    Report
                  </Button>
                </View>
            </View>
        </View>
      
      {/* Modals */}
      <ErrorBoundary>
        <SearchModal  visible={searchModalVisible} onDismiss={() => setSearchModalVisible(false)} />
        <NewProduct   visible={newProductModalVisible} 
                      onDismiss={() => {setNewProductModalVisible(false), populateProducts()}} 
                      onAdd={handleAddProduct}/>
        <ConfirmationModal
                      visible={viewConfirmationModal}
                      onDismiss={() => setViewConfirmationModal(false)}
                      title={modalTitle}
                      body={modalBody}
                      onSelect={DeleteProduct}/>
      </ErrorBoundary>
      </SafeAreaView>
  );
}

export default Manager;