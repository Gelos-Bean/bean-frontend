import * as React from 'react';
import styles from '../../styles/modalStyles'
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, FlatList } from 'react-native';
import { Button } from 'react-native-paper';


const DeleteModal = ({ visible, onDismiss, onDelete }) => {
  const [searchTerm, setSearchTerm] = React.useState(''); 
  const [searchResults, setSearchResults] = React.useState([]); 
  const [toDelete, setToDelete] = React.useState('');

  // Function to search for products from the DB based on the search term
  const searchProducts = async (query) => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/products/${query}`);
      const data = await response.json();
      if (response.ok) {
        setSearchResults(data.msg); 
      } else {
        console.log('Error fetching products:', data.msg);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  // Handle when user selects an option (product) from the search results
  const handleSelectOption = (option) => {
    setToDelete(option); // Add 
    setSearchResults([]); // Clear 
    setSearchTerm(''); // Clear
  };

  const handleDelete = () => {
    onDelete(toDelete);
    onDismiss();
  };

  // Search products 
  React.useEffect(() => {
    if (searchTerm) {
      searchProducts(searchTerm); 
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onDismiss={onDismiss}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Delete Product</Text>
          <Text>Select a product to delete</Text>
          <TextInput
            placeholder="Search"
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.textInputStyle}
          />
          {/* Dropdown for search results */}
          {searchResults.length > 0 && (
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <Pressable onPress={() => handleSelectOption(item)}>
                  <Text style={styles.dropdownItem}>{item.name}</Text>
                </Pressable>
              )}
              style={styles.dropdown}
            />
          )}

          {/* Display selected options */}
          {toDelete != '' && (
            <View style={styles.selectedOptions}>
              <Text>Product to delete:</Text>
                <Text>`${toDelete.name} = $${toDelete.price}`</Text>
            </View>
          )}
          <View style={styles.fixToText}>
              <Button icon="delete" mode="contained" onPress={onDismiss}>
                Delete Product
              </Button>
              <Button icon="magnify" mode="contained" onPress={handleDelete}>
                Find Product
              </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteModal;
