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
      justifyContent: 'space-between',
      width:'30%',
      maxHeight:'100%'
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
      fontWeight: 'bold', 
      color: '#2196F3',  
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
      marginTop: '5%',
      justifyContent:'space-between',
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
      flex:1,
      borderRadius: 9,
    },
    orderHeader: {
      flexDirection:'row',
      justifyContent:'space-between', 
    },
    courseSection: {
      marginVertical: '1%',
      paddingHorizontal:'1%',
      borderRadius: 9,
    },
    productContainer: { 
      marginVertical:'1%',
      justifyContent:'space-between'
    },
    optionsContainer: { 
      marginLeft: '5%' 
    },
    commentContainer: {
      flexDirection:'row',
      paddingHorizontal:'10%',
    },
    optionText: { 
      color: 'grey' 
    },
    scrollableContent: {
      maxHeight: '70%', 
      paddingHorizontal: '1%',
      marginVertical: '1%',
    },
    sentProduct: {
      opacity: 0.5, 
      color: 'grey', 
    },
    widgetContainer: {
      flex:1,
      padding:'1%',
      paddingHorizontal:'20%',
      marginHorizontal:'5%',
      marginVertical:'1%',
      flexDirection:'row',
      justifyContent:'space-between',
      alignContent:'center',
      borderRadius:9,
      backgroundColor:'#8B9556'
    },
    widgetText: {
      color:"rgb(255, 255, 255)",
      textAlign:'center',
      marginVertical:'auto'
    },
  });