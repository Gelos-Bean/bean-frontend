import React, { useState, useEffect } from 'react';
import { 
  Alert, 
  Modal, 
  View, 
  TextInput, 
  ScrollView 
} from 'react-native';
import { 
  Button, 
  Text, 
  IconButton, 
  List,
  SegmentedButtons,
  Checkbox
} from 'react-native-paper';
import styles from '../../styles/modalStyles';
import { connection } from '../../config/config.json';
import NewOptionModal from './NewOption';

const EditProductModal = ({ visible, onDismiss, product, onConfirm }) => {
  const [id, setId] = useState();
  const [options, setOptions] = useState([]);
  const [nameInput, setNameInput] = useState();
  const [priceInput, setPriceInput] = useState();
  const [selectedCategory, setSelectedCategory] = useState();
  const [filteredOptions, setFilteredOptions] = useState([]); 
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [imageInput, setImageInput] = useState();
  const [newOptionModalVisible, setNewOptionModalVisible] = useState(false);

  // Fill in fields ONLY when the modal is made visible

  useEffect(() => {
    if (visible && product) {
      setId(product._id || '')
      setNameInput(product.name || '');
      setPriceInput(product.price ? product.price.toString() : '');
      setSelectedCategory(product.course || '');
      setSelectedOptions(product.options || []);
      setImageInput(product.image || '');
      setSearchQuery('');
    }
  }, [visible]);

  const categories = [
    { key: '1', label: 'Entree', icon: 'baguette', value: 'Starter' },
    { key: '2', label: 'Main', icon: 'food-turkey', value: 'Main Course' },
    { key: '3', label: 'Dessert', icon: 'cupcake', value: 'Dessert' },
    { key: '4', label: 'Bev', icon: 'glass-mug-variant', value: 'Beverage' }
  ];

  useEffect(() => {
    populateOptions();
  }, []);

  useEffect(() => {
    setFilteredOptions(
      options.filter(option => 
        option.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, options]);

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

  const handleSelectOption = (option) => {
    if (selectedOptions.some(opt => opt._id === option._id)) {
      setSelectedOptions(selectedOptions.filter(opt => opt._id !== option._id));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  const handleConfirm = () => {
    if (nameInput.trim() === '') {
      Alert.alert('Error', 'Name field cannot be left blank');
      return;
    } else if (priceInput !== '' && isNaN(parseFloat(priceInput))) {
      Alert.alert('Error', 'Price field must be a valid number')
      return;
    } else if (selectedCategory === ''){
      Alert.alert('Error', 'A category must be selected')
      return;
    }
    const newProduct = {
      _id: product._id,
      name: nameInput.trim(),
      price: parseFloat(priceInput) || 0,
      course: selectedCategory,
      options: selectedOptions.map(opt => opt._id),
      image: imageInput.trim()
    };
    onConfirm(newProduct);
    onDismiss();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onDismiss={onDismiss}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { width: '60%' }]}>
          <Text variant="headlineMedium" style={styles.modalText}>Edit Product</Text>
          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, marginHorizontal: '1%', justifyContent:'flex-start' }}>
              <Text variant="bodyLarge">Name*</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Name"
                  value={nameInput}
                  onChangeText={setNameInput}
                  style={styles.textInputStyle}
                />
              </View>
              <Text variant="bodyLarge">Price*</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Price"
                  keyboardType="number-pad"
                  value={priceInput}
                  onChangeText={setPriceInput}
                  style={styles.textInputStyle}
                />
              </View>
              <Text variant="bodyLarge">Image</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Image URL"
                  value={imageInput}
                  onChangeText={setImageInput}
                  style={styles.textInputStyle}
                />
              </View>
              <Text variant="bodyLarge">Category*</Text>
              <SegmentedButtons
                value={selectedCategory}
                onValueChange={setSelectedCategory}
                buttons={categories}
                style={{ marginVertical: '3%', marginHorizontal: '1%' }}
              />
            </View>
            <View style={{ flex: 1, marginHorizontal: '1%' }}>
              <Text variant="bodyLarge">Options</Text>
              <View style={styles.inputContainer}>
              <TextInput
                  placeholder="Search for options"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                  style={[styles.textInputStyle, {width:'85%'}]}
                />
                <IconButton
                    icon="plus"
                    mode="contained"
                    selected={true}
                    size={23}
                    onPress={() => setNewOptionModalVisible(true)}
                  />
              </View>
              <List.Section style={{ height:250
               }}>
                <ScrollView>
                  <List.Accordion
                    title="Options"
                    left={props => <List.Icon {...props} icon="plus-minus-variant" />}
                    expanded={expanded}
                    onPress={handlePress}
                    variant="bodySmall"
                  >
                    {filteredOptions.map((option) => (
                      <List.Item
                        key={option._id}
                        title={<Text variant='bodyMedium'>{option.name}</Text>}
                        onPress={() => handleSelectOption(option)}
                        style={{height:40, justifyContent:'center', alignContent:'center'}}
                        right={() => (
                          <Checkbox
                            status={selectedOptions.some(opt => opt._id === option._id) ? 'checked' : 'unchecked'}
                            onPress={() => handleSelectOption(option)}
                          />
                        )}
                      />
                    ))}
                  </List.Accordion>
                </ScrollView>
              </List.Section>
            </View>
          </View>

          <View style={styles.bottomButtonRow}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              mode="contained"
              icon="window-close"
              onPress={onDismiss}
            >
              Cancel
            </Button>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              mode="contained"
              icon="check"
              onPress={handleConfirm}
            >
              Confirm
            </Button>
          </View>
        </View>
      </View>
        <NewOptionModal visible={newOptionModalVisible} onDismiss={() => {setNewOptionModalVisible(false), populateOptions()}}>
      </NewOptionModal>
    </Modal>
  );
};

export default EditProductModal;
