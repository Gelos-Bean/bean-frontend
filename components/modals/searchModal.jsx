import React, { useState } from 'react';
import { Alert, Modal, StyleSheet, Pressable, View, TextInput, ScrollView } from 'react-native';
import { Button, Text, IconButton, Card } from 'react-native-paper';
import styles from '../../styles/modalStyles';
import { connection } from '../../config/config.json';


const SearchModal = ({ visible, onDismiss, onSelect }) => {

  const [products, setProducts] = useState([])
  const [inputValue, setInputValue] = useState('');
  const [selectedProduct, setSelectedProduct] = useState();

  const handleSelect = () => {
    onSelect(selectedProduct); 
    onDismiss();
  };

  const handleSearch = async() => {
    try {
      const response = await fetch(`${connection}/products/${inputValue}`, {
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
      
      

      if (data.success && Array.isArray(data.msg)) {
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

  return (

        <Modal animationType="slide" transparent={true} visible={visible} onDismiss={onDismiss}>
          <View style={styles.centeredView}>
            <View style={[styles.modalView, {width:'50%'}]}>
              <Text variant='headlineMedium' style={styles.modalText}>Product Lookup</Text>
                <Text variant="bodyLarge">Enter product name to search</Text>
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Product"
                      value={inputValue}
                      onChangeText={setInputValue}
                      style={[styles.textInputStyle, {width:'92%'}]}>
                    </TextInput>
                    <IconButton
                      icon="close-circle-outline"
                      iconColor='#000000'
                      size={20}
                      onPress={() => {setInputValue(''), setProducts([])}}/>
                  </View>
                  {products.length !== 0 && (
                    <ScrollView contentContainerStyle={styles.resultsContainer}>
                      {products.map((product) => (
                        <Card key={product._id} 
                              style={styles.cardStyle}
                              onPress={() => {setSelectedProduct(product), handleSelect()}}>
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
                  )}                
                  <View style={styles.bottomButtonRow}>
                    <Button
                      style={[styles.squareButton, styles.wideButton]}
                      mode="contained"
                      onPress={onDismiss}
                    >
                      Cancel
                    </Button>
                    <Button
                      style={[styles.squareButton, styles.wideButton]}
                      mode="contained"
                      onPress={handleSearch}
                    >
                      Search
                    </Button>
                  </View>
            </View>            
          </View>
        </Modal>
  );
};

export default SearchModal;
