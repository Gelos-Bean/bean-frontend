import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({
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
    dropdown: {
      maxHeight: 150,
      width: 200,
      backgroundColor: '#fff',
      borderColor: '#ccc',
      borderWidth: 1,
      borderRadius: 5,
    },
    selectedOptions: {
      marginTop: 10,
    },
    dropdownItem: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    selectedItem: {
      fontWeight: 'bold', // Bold the selected item
      color: '#2196F3',   // Change color for highlight (optional)
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    }
  });