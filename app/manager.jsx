import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Alert,
  Image
} from 'react-native';

import { useRouter } from 'expo-router';
import { Button, Text, IconButton, MD3Colors } from 'react-native-paper';
import SearchModal from '../components/modals/searchModal';
import NewProduct from '../components/modals/newProduct';
import DeleteModal from '../components/modals/deleteProduct'

import styles from '../styles/posStyles';

import Header from '../components/Header'


const Manager = () => {
  const router = useRouter();

  // Search product modal 
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const showSearchModal = () => setSearchModalVisible(true);
  const hideSearchModal = () => setSearchModalVisible(false);

  // New product modal 
  const [newProductModalVisible, setNewProductModalVisible] = useState(false);
  const showNewProductModal = () => setNewProductModalVisible(true);
  const hideNewProductModal = () => setNewProductModalVisible(false);

  // Delete product modal
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const showDeleteModal = () => setDeleteModalVisible(true);
  const hideDeleteModal = () => setDeleteModalVisible(false);
  

  const Separator = () => <View style={styles.separator} />;
  //I had to define the data types for each property of Product to make the typescript happy


  const [products, setProducts] = useState([]); //Explicitly pointing the useState to the array, type AND allowing it to be null :S  

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
        const response = await fetch(`http://10.0.2.2:8080/add-item`, {
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
   const handleSearch = async (query) => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/products/${query}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        const error = await response.json();
        const errorMessage = typeof error.msg === 'string' ? error.msg : 'Unexpected error';
        Alert.alert('Error', errorMessage);
        return;
      }
  
      const data = await response.json();
      console.log('Search Results:', data); // Ben dont forget to remove this
      
      

      if (data.status && Array.isArray(data.msg)) {
        setProducts(data.msg); // if array
      } else if (data.status) {
        setProducts([data.msg]); // add to array if only 1
      } else {
        const errorMessage = typeof data.msg === 'string' ? data.msg : 'No products found';
        Alert.alert('Error', errorMessage);
      }
    } catch (err) {
      console.error('Search error:', err);
      Alert.alert('Error', 'Something went wrong');
    }
  };
  

  // Handle Edit Product
  const handleEditProduct = async (id) => { };

  // Handle Delete Product 
  const handleDeleteProduct = async (id) => { console.log(`Deleting ID: ${id}`)};

  return (
    <SafeAreaView style={styles.container}>
      <Header title={"Manager"}
        location={"Sydney"}
        username={null}/>
      <Separator />
      <View style={styles.body}>
        <View style={{flexDirection: 'row', flex:1}}>
          <View style={styles.mainContainer}>
            <Text variant="displaySmall">Product Details</Text>
            {/* only show this bit if there are products */}
            {products && products.length > 0 && (
            <View>
              {products.map((product, index) => (
                product && (
                  <View key={index} style={styles.table}>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableCell}>Name:</Text>
                      <Text style={styles.tableCell}>{product.name}</Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableCell}>Price:</Text>
                      <Text style={styles.tableCell}>${product.price}</Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableCell}>Course:</Text>
                      <Text style={styles.tableCell}>{product.course}</Text>
                    </View>
                    <View style={styles.tableRow}>
                      <Text style={styles.tableCell}>Image:</Text>
                      {product.image ? (
                        <Image source={{ uri: product.image }} style={{ width: 100, height: 100 }} />
                      ) : (
                        <Text>No image available</Text>
                      )}
                    </View>
                    {product.options && product.options.length > 0 && (
                    <View style={styles.tableRow}>
                      <Text style={styles.tableCell}>Options:</Text>
                      {product.options.map((option, optIndex) => (
                        option && option.item && (
                          <Text key={optIndex} style={styles.tableCell}>
                            {option.item.name} - ${option.item.price}
                          </Text>
                        )
                      ))}
                    </View>
                  )}
                  </View>
                )
              ))}
            </View>
            )}      
          </View>
          <View style={styles.rightContainer}>
            <View style={styles.numpadContainer}>
              <Text>Numpad</Text>
            </View>
            <View style={[styles.buttonContainer]}>
              <View style={styles.buttonRow}>
                <IconButton style={styles.squareButton}
                  icon="plus-box"
                  iconColor='rgb(229 220 200)'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={30}
                  onPress={showNewProductModal}
                />
                <IconButton style={styles.squareButton}
                  icon="pencil"
                  iconColor='rgb(229 220 200)'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={30}
                  onPress={() => console.log('Edit not implemented')}
                />
              </View>
              <View style={styles.buttonRow}>
                <IconButton style={styles.squareButton}
                  icon="magnify"
                  iconColor='rgb(229 220 200)'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={30}
                  onPress={showSearchModal}
                />
                <IconButton style={styles.squareButton}
                  icon="delete"
                  iconColor='rgb(229 220 200)'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={30}
                  onPress={showDeleteModal}
                />
              </View>
              <View style={styles.buttonRow}>
                <Button style={[styles.squareButton, styles.wideButton]}
                  mode="contained"
                  icon="poll">              
                  Report
                </Button>
                <IconButton style={styles.roundButton}
                  icon="home-roof"
                  iconColor='rgb(229 220 200)'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={30}
                  onPress={() => router.push('/')}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
      
      {/* Modals */}
      <SearchModal visible={searchModalVisible} onDismiss={hideSearchModal} onSearch={handleSearch} />
      <NewProduct visible={newProductModalVisible} onDismiss={hideNewProductModal} onAdd={handleAddProduct} />
      <DeleteModal visible={deleteModalVisible} onDismiss={hideDeleteModal} onDelete={handleDeleteProduct} />
    </SafeAreaView>
  );
}

export default Manager;