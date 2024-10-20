import * as React from 'react';
import { Alert, Modal, StyleSheet, Text, Pressable, View, TextInput, FlatList } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const NewProductModal = ({ visible, onDismiss, onAdd }) => {
  const [nameInput, setNameInput] = React.useState('');
  const [priceInput, setPriceInput] = React.useState('');
  const [selectedCourse, setSelectedCourse] = React.useState('');
  const [options, setOptions] = React.useState([]); // To store selected options
  const [searchTerm, setSearchTerm] = React.useState(''); // To store search term
  const [searchResults, setSearchResults] = React.useState([]); // To store fetched search results
  const [imageInput, setImageInput] = React.useState('');

  const courses = [
    { key: '1', value: 'Entree' },
    { key: '2', value: 'Main' },
    { key: '3', value: 'Dessert' },
    { key: '4', value: 'Beverage' },
  ];

  // Function to search for products from the DB based on the search term
  const searchProducts = async (query) => {
    try {
      const response = await fetch(`http://10.0.2.2:8080/products/${query}`);
      const data = await response.json();
      if (response.ok) {
        setSearchResults(data); // Assume data is an array of matching products
      } else {
        console.log('Error fetching products:', data.msg);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  

  // Handle when user selects an option (product) from the search results
  const handleSelectOption = (option) => {
    setOptions([...options, option]); // Add selected option to options array
    setSearchResults([]); // Clear search results after selecting
    setSearchTerm(''); // Clear search input
  };

  const handleAdd = () => {
    const newProduct = {
      name: nameInput,
      price: priceInput,
      course: selectedCourse,
      options: options.map((opt) => ({ item: opt._id, quantity: 1 })), // Add selected options
      image: imageInput,
    };
    onAdd(newProduct);
    onDismiss();
  };

  // Search products as the user types
  React.useEffect(() => {
    if (searchTerm) {
      searchProducts(searchTerm); // Fetch products matching search term
    } else {
      setSearchResults([]); // Clear search results if no search term
    }
  }, [searchTerm]);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onDismiss={onDismiss}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>New Product</Text>

          <Text>Product Name:</Text>
          <TextInput
            placeholder="Name"
            value={nameInput}
            onChangeText={setNameInput}
            style={styles.textInputStyle}
          />

          <Text>Price:</Text>
          <TextInput
            placeholder="Price"
            keyboardType="number-pad"
            value={priceInput}
            onChangeText={setPriceInput}
            style={styles.textInputStyle}
          />

          <Text>Course:</Text>
          <SelectList setSelected={setSelectedCourse} data={courses} save="value" />

          <Text>Options:</Text>
          <TextInput
            placeholder="Search for options"
            value={searchTerm}
            onChangeText={setSearchTerm}
            style={styles.textInputStyle}
          />

          {/* Dropdown for search results */}
          {searchResults.length > 0 && (
            <>
            <SelectList 
                setSelected={handleSelectOption} 
                data={searchResults}/>
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
            </>
            
          )}

          {/* Display selected options */}
          {options.length > 0 && (
            <View style={styles.selectedOptions}>
              <Text>Selected Options:</Text>
              {options.map((opt, index) => (
                <Text key={index}>{opt.name}</Text>
              ))}
            </View>
          )}

          <Text>Image:</Text>
          <TextInput
            placeholder="Image URL"
            value={imageInput}
            onChangeText={setImageInput}
            style={styles.textInputStyle}
          />

          <Pressable style={[styles.button, styles.buttonClose]} onPress={onDismiss}>
            <Text style={styles.textStyle}>Cancel</Text>
          </Pressable>
          <Pressable style={[styles.button, styles.buttonClose]} onPress={handleAdd}>
            <Text style={styles.textStyle}>Add</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textInputStyle: {
    backgroundColor: '#dcdcdc',
    width: 200,
    borderRadius: 20,
    height: 40,
    paddingLeft: 20,
    marginBottom: 10,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  selectedOptions: {
    marginTop: 10,
  },
});

export default NewProductModal;
