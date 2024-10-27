import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'white',
      borderRadius: 9,
      padding: 35,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      justifyContent: 'space-between'
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    modalText: {
      marginBottom: 30,
      textAlign: 'left',
    },
    textInputStyle: {
      width: 200,
      borderRadius: 20,
      height: 40,
      paddingLeft: 20,
      borderWidth: 0.5,
      margin: '1%',
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
    },
    squareButton:{
      borderRadius: 9,
    },
    buttonText:{
      textAlign: 'center',
      alignContent: 'center',
      justifyContent: 'center'
    },
    roundButton:{
      margin: '1%',
    },
    wideButton:{
      margin: '1%',
      width: 125,
      justifyContent:'center',
      color:'rgb(229 220 200)'
    },
    inputContainer:{
      flexDirection: 'row',
      justifyContent:'center',
      alignSelf:'center',
      marginBottom: 1
    }
  });