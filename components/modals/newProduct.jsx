import React, { useState } from 'react';
import { Alert, Modal, Pressable, View, TextInput, FlatList, ScrollView } from 'react-native';
import { Button, Text, IconButton, List } from 'react-native-paper';
import styles from '../../styles/modalStyles';
import { connection } from '../../config/config.json';


const NewProductModal = ({ visible, onDismiss, onAdd }) => {
  const [nameInput, setNameInput] = React.useState('');
  const [priceInput, setPriceInput] = React.useState('');
  const [selectedCourse, setSelectedCourse] = React.useState('');
  const [options, setOptions] = React.useState([]); 
  const [searchTerm, setSearchTerm] = React.useState(''); 
  const [searchResults, setSearchResults] = React.useState([]); 
  const [imageInput, setImageInput] = React.useState('');
  const [allOptions, setAllOptions] = useState([]);

  const courses = [
    { key: '1', value: 'Entree' },
    { key: '2', value: 'Main' },
    { key: '3', value: 'Dessert' },
    { key: '4', value: 'Beverage' },
  ];
  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  // Function to search for products from the DB based on the search term
  const searchProducts = async (query) => {
    try {
      const response = await fetch(`${connection}/products/${query}`);
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
    setOptions([...options, option]); // Add 
    setSearchResults([]); // Clear 
    setSearchTerm(''); // Clear
  };

  const handleAdd = () => {
    const newProduct = {
      name: nameInput,
      price: priceInput,
      course: selectedCourse,
      options: options.map((opt) => ({ item: opt._id, quantity: 1 })), 
      image: imageInput,
    };
    onAdd(newProduct);
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
          <Text variant='headlineMedium' style={styles.modalText}>New Product</Text>
          <Text Text variant="bodyLarge">Name*</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Name"
              value={nameInput}
              onChangeText={setNameInput}
              style={styles.textInputStyle}
            />
          </View>
          <Text Text variant="bodyLarge">Price*</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Price"
              keyboardType="number-pad"
              value={priceInput}
              onChangeText={setPriceInput}
              style={styles.textInputStyle}
            />
          </View>
          <Text variant="bodyLarge">Course*</Text>
          <List.Section style={{height:100}}>
            <ScrollView style={{flexDirection:'column'}}>
              <List.Accordion
                title="Courses"
                left={props => <List.Icon {...props} icon="food" />}
                expanded={expanded}
                onPress={handlePress}>
                  {courses.map((course) => (
                        <List.Item  key={course.key}
                                    variant="bodySmall"
                                    title={course.value}
                                    />
                    ))}  
              </List.Accordion>
            </ScrollView>
          </List.Section>
          <Text variant="bodyLarge">Options</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Search for options"
              value={searchTerm}
              onChangeText={setSearchTerm}
              style={styles.textInputStyle}
            />
          </View>
          
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
          {options.length > 0 && (
            <View style={styles.selectedOptions}>
              <Text>Selected Options:</Text>
              {options.map((opt, index) => (
                <Text key={index}>{opt.name}</Text>
              ))}
            </View>
          )}

          <Text variant="bodyLarge">Image</Text>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="Image URL"
              value={imageInput}
              onChangeText={setImageInput}
              style={styles.textInputStyle}
            />
          </View>
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
              onPress={handleAdd}
            >
              Add
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NewProductModal;