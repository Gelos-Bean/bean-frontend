import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({
    centeredView: {
      margin:'auto'
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
      justifyContent: 'space-between',
      width:'30%'
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    modalText: {
      marginVertical: '5%',
      textAlign: 'left',
    },
    textInputStyle: {
      width: '100%',
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
      width: '100%',
      justifyContent:'center',
      alignSelf:'center',
      marginVertical: '2%',
      marginHorizontal: '1%'
    },
    bottomButtonRow:{
      flexDirection:'row',
      alignContent:'center',
      marginVertical: '5%',
      justifyContent:'space-evenly',
    },
    resultsContainer:{
      flexGrow: 1,
      flexWrap: 'wrap',  
      height: 150
    },
    cardStyle: {
      marginHorizontal: '2%',
      marginVertical:'1%',
      width: '29%'
    },
    cardCover: {
      height: 100,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
    orderStyle: {
      padding: '1%',
      borderRadius: 9,
    },
    orderHeader: {
      flexDirection:'row',
      justifyContent:'space-between', 
    },
    orderButtons: {
      flexDirection: 'row',
      justifyContent:'space-between',
      marginTop:'1%'
    },
    courseSection: {
      marginVertical: '1%',
      paddingHorizontal:'1%',
      borderRadius: 9,
    },
    productContainer: { 
      marginVertical:'1%'
    },
    optionsContainer: { 
      marginLeft: '5%' 
    },
    optionText: { 
      color: 'grey' 
    },
    paginationControls: {
      flexDirection:'row',
      justifyContent: 'space-between',
      display:'flex'
    },
  });