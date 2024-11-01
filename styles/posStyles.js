import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor:'#ffff',
      height: '100%',
      width: '100%'
    },
    body: {
      flex:1,
      marginRight:'5%',
      marginLeft:'5%'
    },
    mainContainer:{
      margin:'1%',
      padding: 10,
      backgroundColor: '#fcf8f2',
      borderRadius: 9,
      flex: 3,
    },
    managerMainContainer:{
      margin:'1%',
      padding: '1%',
      backgroundColor: '#fcf8f2',
      borderRadius: 9,
      flex: 4,
    },
    fullMainContainer:{
      marginHorizontal: '1%',
      marginBottom: '1%',
      padding: 5,
      backgroundColor: '#fcf8f2',
      borderRadius: 9,
      flex:1
    },
    halfMainContainer:{
      margin:'1%',
      padding: 10,
      backgroundColor: '#fcf8f2',
      borderRadius: 9,
      flex: 4,
    },
    rightContainer:{
      margin:'1%',
      flexDirection: 'column',
      flex:1
    },
    numpadContainer:{
      flex:8
    },
    managerButtonContainer:{
      margin:'1%',
      padding:'1%',
      backgroundColor: '#fcf8f2',
      borderRadius: 9,
      justifyContent: 'center',
      alignContent:'center',
      flex:1
    },
    buttonContainer:{
      margin:'1%',
      padding:'1%',
      backgroundColor: '#fcf8f2',
      borderRadius: 9,
      justifyContent: 'space-between',
      flex:4
    },
    wideButtonContainer:{
      margin:'1%',
      padding:'1%',
      backgroundColor: '#fcf8f2',
      borderRadius: 9,
      justifyContent: 'center',
      flexDirection: 'column',
      flex:4
    },
    buttonRow:{
      flexDirection: 'row',
      justifyContent:'space-between',
      alignContent:'center',
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
      marginBottom: '1%',
    },
    wideButton:{
      margin: '1%',
      width: 175,
      height: 45,
      justifyContent:'center',
    },
    managerButton:{
      margin: '1%',
      width: '48%',
      height: 45,
      justifyContent:'center',
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
    },
    fixToText: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    cardContainer: {
      flexDirection: 'row', 
      flexWrap: 'wrap',  
    },
    cardStyle: {
      margin: '1%',
      width: '18%'
    },
    cardCover: {
      height: 100,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#737373',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
    },
    header: {
      textAlign: 'center',
      marginVertical: 8,
    },
    table: {
      width: '100%',
    },
    tableRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 8,
    },
    tableCell: {
      fontSize: 16,
    },
    tabBar: {
      backgroundColor: 'lightgray',
    },
    indicatorStyle: {
      backgroundColor: 'darkred',
    },
    content: {
      flex: 1,
      justifyContent: 'center'
    },
    tabBar: {
      flexDirection: 'row',
      alignContent: 'stretch'
    },
    tabButton:{
      borderRadius:0,
    },
    displayPortal:{
      flexDirection: 'row',
      margin:'1%',
      width: 175,
      height: 45,
      backgroundColor: '#FFFFFF',
      borderRadius: 9,
      justifyContent:'space-around',
      alignItems: 'center',
      flex:1
    },
    tableContainer:{
      flex: 3,
      margin:'1%',
      backgroundColor: '#FFFFFF',
      borderRadius: 9,
    },
    headerRow: {
      flexDirection: 'row',
      margin: '1%',
      justifyContent:'flex-start',
      alignContent:'flex-start',
    },
    row: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      marginLeft:10,
      marginRight:10,
      borderColor: 'rgb(156, 64, 77)',
      minHeight: 30,
      alignItems: 'center', 
    },
    highlightedRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      marginLeft:10,
      marginRight:10,
      borderColor: 'rgb(156, 64, 77)',
      minHeight: 30,
      alignItems: 'center', 
      backgroundColor: 'rgb(156, 64, 77)',
      color: 'rgb(255, 255, 255)'
    },
    highlightedText: {
      color: 'rgb(255, 255, 255)',
    },
    cell: {
      flex: 1,
      padding: 3,
      textAlign: 'left',
    },
    headerText: {
      flex: 1,
      padding: 3,
      textAlign: 'left',
    },
    orderContainer: {

    },
    orderStyle: {
      marginVertical: 5,
      marginHorizontal: 30,
      padding: 10,
      justifyContent: 'space-between',
      height: 260,
      width: 250
    },
    orderHeader: {
      flexDirection:'row',
      justifyContent:'space-between', 
    },
    orderBody: {
      padding: 100
    },
    orderButtons: {
      flexDirection: 'row',
      justifyContent:'space-around'
    },
    courseSection: {
      marginVertical: 8 
    },
    courseTitle: { 
      fontWeight: 'bold', 
      fontSize: 16, 
      marginVertical: 4 
    },
    productContainer: { 
      marginLeft: 10, 
      marginTop: 5 
    },
    optionsContainer: { 
      marginLeft: 15 
    },
    optionText: { 
      color: 'grey' 
    },
    paginationControls: {
      flexDirection:'row',
      paddingHorizontal: '10%',
      justifyContent: 'space-between'
    },
    controlContainer:{
      flexDirection:'row',
      justifyContent: 'space-between',
      width: '30%'
    },
    textInputStyle: {
      width: 200,
      borderRadius: 999,
      height: 40,
      textAlign: 'center',
      borderWidth: 0.5,
      margin: '1%',
      backgroundColor:'#ffff',
    },
    
  });