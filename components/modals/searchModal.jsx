import * as React from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View, TextInput } from 'react-native';

const SearchModal = ({ visible, onDismiss, onSearch }) => {
  const containerStyle = { backgroundColor: 'white', padding: 20 };
  const [inputValue, setInputValue] = React.useState('');

  const handleSearch = () => {
    onSearch(inputValue);
    onDismiss(); 
  };

  return (

        <Modal animationType="slide" transparent={true} visible={visible} onDismiss={onDismiss}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Product Lookup</Text>
              <Text>Enter product name to search:</Text>
                <TextInput
                    placeholder="Product"
                    value={inputValue}
                    onChangeText={setInputValue}
                    style={styles.textInputStyle}
                />
              <Pressable
                style={[styles.button, styles.buttonClose]} onPress={handleSearch}>
                <Text style={styles.textStyle}>Search</Text>
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
  buttonOpen: {
    backgroundColor: '#F194FF',
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
    backgroundColor: "#dcdcdc",
    width: 200,
    borderRadius: 20,
    height: 40,
    paddingLeft: 20
  }
});

export default SearchModal;
