import React, { useState } from 'react';
import { Alert, Modal, View, TextInput, ScrollView } from 'react-native';
import { Button, Text, IconButton, Card } from 'react-native-paper';
import styles from '../../styles/modalStyles';
import LoadingIndicator from '../LoadingIndicator';
import { connection } from '../../config/config.json';

const SearchModal = ({ visible, onDismiss, onSelect }) => {
  const [products, setProducts] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSelect = (product) => {
    onSelect(product);
    handleDismiss();
  };
  const handleDismiss = () => {
    setInputValue(''); 
    setProducts([]);
    onDismiss();
  }

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${connection}/products/${inputValue}`, {
        method: 'GET',
      });
  
      if (!response.ok) {
        const error = await response.json();
        const errorMessage = typeof error.msg === 'string' ? error.msg : 'Unexpected error';
        Alert.alert('Error', errorMessage);
        setLoading(false)
        return;
      }
  
      const data = await response.json();
      console.log('Search Results:', data);

      if (data.success && Array.isArray(data.msg)) {
        setProducts(data.msg);
      } else if (data.msg) {
        setProducts([data.msg]);
      } else {
        Alert.alert('Error', 'No products found');
      }
    } catch (err) {
      console.error('Search error:', err);
      Alert.alert('Error', 'Something went wrong');
    } finally {
      setLoading(false)
    }
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onDismiss={onDismiss}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { width: '50%' }]}>
          <Text variant="headlineMedium" style={styles.modalText}>Product Lookup</Text>
          <Text variant="bodyLarge">Enter product name to search</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Product"
              value={inputValue}
              onChangeText={setInputValue}
              style={[styles.textInputStyle, { width: '92%' }]}
            />
            <IconButton
              icon="backspace"
              iconColor="#000000"
              size={20}
              onPress={() => { setInputValue(''); setProducts([]); }}
            />
          </View>
          {loading ? (
            <LoadingIndicator />
          ) : (
            products.length > 0 ? (
              <ScrollView contentContainerStyle={styles.resultsContainer}>
                {products.map((product) => (
                  <Card 
                    key={product._id} 
                    style={styles.cardStyle}
                    onPress={() => handleSelect(product)}
                  >
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
            ) : (
              <View style={styles.loadingContainer}>
              <Text variant="titleMedium" style={{textAlign:'center'}}>
                No Results
              </Text>
              <Text variant="bodyMedium" style={{textAlign:'center'}}>
                There are no products that match that name
              </Text>
           </View>
            )
          )}
         
          <View style={styles.bottomButtonRow}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon="window-close"
              mode="contained"
              onPress={handleDismiss}
            >
              Cancel
            </Button>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon="magnify"
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
