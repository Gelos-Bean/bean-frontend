import React, { useState } from 'react';
import {
  View,
  SafeAreaView,
  Alert,
  Image
} from 'react-native';

import { Modal, Avatar, Button, Card, Text } from 'react-native-paper';
import SearchModal from '../../components/modals/searchModal';
import NewProduct from '../../components/modals/newProduct'
import styles from '../../styles/posStyles'
import Header from '../../components/Header.jsx';

const Manager = () => {
  // Search product modal 
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const showSearchModal = () => setSearchModalVisible(true);
  const hideSearchModal = () => setSearchModalVisible(false);

  // New product modal 
  const [newProductModalVisible, setNewProductModalVisible] = useState(false);
  const showNewProductModal = () => setNewProductModalVisible(true);
  const hideNewProductModal = () => setNewProductModalVisible(false);

  
  

  const Separator = () => <View style={styles.separator} />;
  //I had to define the data types for each property of Product to make the typescript happy
  type Product = {
    _id: string;
    name: string;
    price: number;
    course: string;
    options?: { item: Product; quantity: number }[]; //optional
    image?: string;    //optional
  };

  const [products, setProducts] = useState<Product[]>([]); //Explicitly pointing the useState to the array, type AND allowing it to be null :S
  

  // Handle Add Product
  const handleAddProduct = async (newProduct : Product) => { 
    try {
          // I have to manually restructure the JSON before sending to make sure that it is correctly referencing the options
          var productToAdd = undefined;
          if(newProduct.options?.length! > 0){ // If things start breaking then look here
            console.log('Options:', newProduct.options);
            const structuredOptions = newProduct.options!.map((opt) => {
              return {
                item: {
                  $oid: opt.item 
                },
                quantity: opt.quantity || 1 
              };
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

  // Handle Find Product
  const handleFindProduct = async () => { };

   // Function to handle search
   const handleSearch = async (query: string) => {
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
  const handleEditProduct = async (id : string) => { };

  // Handle Delete Product 
  const handleDeleteProduct = async (id : string) => { };

  return (
    <SafeAreaView style={styles.container}>
          <Header
            title={"Manager"}
            location={"Sydney"}
            username={null} />

      <Text style={styles.title}>Product Details</Text>
  
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
              {/* only show this bit if there are options */}
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

  
      <Separator />
      
      <View>
        <View style={styles.fixToText}>
          <Button icon="plus-box" mode="contained" onPress={showNewProductModal}>
            Add Product
          </Button>
          <Button icon="pencil" mode="contained" onPress={() => console.log('Pressed')}>
            Edit Product
          </Button>
          <Button icon="delete" mode="contained" onPress={() => console.log('Pressed')}>
            Delete Product
          </Button>
          <Button icon="magnify" mode="contained" onPress={showSearchModal}>
            Find Product
          </Button>
        </View>
      </View>
  
      {/* Modals */}
      <SearchModal visible={searchModalVisible} onDismiss={hideSearchModal} onSearch={handleSearch} />
      <NewProduct visible={newProductModalVisible} onDismiss={hideNewProductModal} onAdd={handleAddProduct} />
    </SafeAreaView>
  );
}

export default Manager;