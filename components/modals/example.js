import * as React from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const SearchModal = ({ visible, onDismiss, onSearch }) => {
  const [inputValue, setInputValue] = React.useState(''); // Capture user input

  const handleSearch = () => {
    // Pass the input value back to the parent component for search
    onSearch(inputValue); // Call the search function from parent component with user input
    onDismiss(); // Close the modal after searching
  };

  const containerStyle = { backgroundColor: 'white', padding: 20 };

  return (
    <PaperProvider>
      <Portal>
        <Modal visible={visible} onDismiss={onDismiss} contentContainerStyle={containerStyle}>
          <Text>Enter product name or ID to search:</Text>
          <TextInput
            label="Search"
            value={inputValue}
            onChangeText={setInputValue} // Update inputValue on user input
          />
          <Button onPress={handleSearch}>Search</Button> {/* Trigger handleSearch */}
        </Modal>
      </Portal>
    </PaperProvider>
  );
};

export default SearchModal;
