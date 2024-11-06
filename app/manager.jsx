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
import SearchModal from '../components/modals/searchModal';
import NewProduct from '../components/modals/newProduct';
import DeleteModal from '../components/modals/deleteProduct'

import styles from '../styles/posStyles';

import Header from '../components/Header'

const Manager = () => {
  const router = useRouter();

  // Search product modal 
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  // New product modal 
  const [newProductModalVisible, setNewProductModalVisible] = useState(false);

  // Delete product modal
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  

  const Separator = () => <View style={styles.separator} />;
  
  //Get all products
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

  //Handle options dropdown
  const [expanded, setExpanded] = useState({});

  const handlePress = (productId) => {
    setExpanded(prevState => ({
      ...prevState,
      [productId]: !prevState[productId]
    }));
  };

  // Handle Add Product
  const handleAddProduct = async (newProduct) => { 
    try {
          // I have to manually restructure the JSON before sending to make sure that it is correctly referencing the options
          var productToAdd = undefined;
          if(newProduct.options?.length > 0){ // If things start breaking then look here
            console.log('Options:', newProduct.options);
            const structuredOptions = newProduct.options.map((opt) => {
              return { opt };
            });
          // Create the new product object with structured options
          productToAdd = {
            ...newProduct, 
            price: Number(newProduct.price), // Will need to add proper input validation here
            options: structuredOptions
          };
          
        } else {
          productToAdd = {
            ...newProduct,
            price: Number(newProduct.price), 
            options: []
        }};
        
        const productJSON = JSON.stringify(productToAdd);
        console.log(productJSON);
        const response = await fetch(`${connection}/add-item`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json', 
          },
          body: productJSON, 
        });
        if (!response.ok) {
          const error = await response.json();
          const errorMessage = typeof error.msg === 'string' ? error.msg : 'Unexpected error';
          Alert.alert('Error', errorMessage);
          return;
        } else {
          Alert.alert('Success', `${newProduct.name} added successfully`)
        }
      console.log('Gluten Free Bun saved successfully');
    } catch (err) {
      console.error('Add error:', err);
      Alert.alert('Error', 'Something went wrong');
    }
  };

   // Function to handle search
   
  

  // Handle Edit Product
  const handleEditProduct = async (id) => { };

  // Handle Delete Product 
  const handleDeleteProduct = async (id) => { console.log(`Deleting ID: ${id}`)};

  // On Load:
  useEffect(() => {
    PopulateProducts();
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Manager"}
        location={"Sydney"}
        username={null}/>
      <Separator />
      <View style={styles.body}>
          <View style={styles.managerMainContainer}>
            <DataTable style={{flex:1}}>
              <DataTable.Header>
                <DataTable.Title>Name</DataTable.Title> 
                <DataTable.Title>Price</DataTable.Title>  
                <DataTable.Title>Course</DataTable.Title>
                <DataTable.Title>Image</DataTable.Title>    
                <DataTable.Title>Options</DataTable.Title>              
              </DataTable.Header>
              <ScrollView contentContainerStyle={{flexDirection:'column'}}>
              {products && Array.isArray(products) && products.length > 0 ? (
               products.map((product) => (
                <DataTable.Row key={product._id}>
                  <DataTable.Cell>{product.name}</DataTable.Cell>
                  <DataTable.Cell>${product.price}</DataTable.Cell>
                  <DataTable.Cell>{product.course}</DataTable.Cell>
                  <DataTable.Cell>{product.image}</DataTable.Cell>
                  <DataTable.Cell>
                    {product.options && product.options.length > 0 ? (
                      <List.Section title="Options" style={[{flexDirection:'row',paddingVertical:0, paddingHorizontal:0, marginHorizontal:0, marginVertical:0}]}>
                        <List.Accordion
                          style={[{paddingVertical:0, paddingHorizontal:0, marginHorizontal:0, marginVertical:0}]}
                          expanded={expanded[product._id] || false}
                          onPress={() => handlePress(product._id)}
                        >
                          {product.options.map((option, index) => (
                            <List.Item
                              key={index}
                              title={<Text variant='bodyMedium'>{option.name}</Text>}
                              description={<Text variant='bodySmall'>{option.price}</Text>}
                            >                          
                            </List.Item>
                          ))}
                        </List.Accordion>
                      </List.Section>
                    ) : null} 
                  </DataTable.Cell>
                </DataTable.Row>
                  ))
                  ) : null}
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
                      icon="pencil"
                      disabled={true}>              
                      Edit
                  </Button>
                  <Button style={[styles.squareButton, styles.wideButton]}
                        mode="contained"
                        icon="magnify"
                        onPress={() => setSearchModalVisible(true)}>              
                        Lookup
                  </Button>
                  <Button style={[styles.squareButton, styles.wideButton]}
                      mode="contained"
                      icon="delete"
                      onPress={() => setDeleteModalVisible(true)}>              
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
      <SearchModal visible={searchModalVisible} onDismiss={() => setSearchModalVisible(false)} />
      <NewProduct visible={newProductModalVisible} onDismiss={() => setNewProductModalVisible(false)} onAdd={handleAddProduct} />
      <DeleteModal visible={deleteModalVisible} onDismiss={() => setDeleteModalVisible(false)} onDelete={handleDeleteProduct} />
    </SafeAreaView>
  );
}

export default Manager;