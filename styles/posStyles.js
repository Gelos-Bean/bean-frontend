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
      flex: 10,
    },
    fullMainContainer:{
      justifyContent:'space-between',
      marginHorizontal: '1%',
      marginBottom: '1%',
      padding: '1%',
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
      flex:1,
      gap:'1%'
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
      flexDirection: 'row',
      flex:2,
      gap:'1%'
    },
    buttonColumn:{
      flexDirection:'column', 
      justifyContent:'space-between',
      flex:2, 
    },
    buttonRow:{
      flexDirection: 'row',
      gap:'1%',
      justifyContent:'space-between',
      alignContent:'center',
      flexWrap:'wrap'
    },
    squareButton:{
      borderRadius: 9,
      margin:0
    },
    buttonText:{
      marginTop:'8%',
      textAlign:'center'
    },
    roundButton:{
      marginBottom: '1%',
    },
    wideButton:{
      height:46,
      flex:1,
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
      width: '18%',
      minWidth:120
    },
    cardCover: {
      height: 100,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
    separator: {
      marginVertical: 8,
      borderBottomColor: '#9c404d',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    verticalSeparator: {
      marginVertical: 8,
      borderLeftColor: '#9c404d',
      borderLeftWidth: StyleSheet.hairlineWidth,
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
      flexWrap: 'wrap',  
      alignContent: 'stretch',
    },
    tabButton:{
      borderRadius:0,
      width:'15%',
      minWidth:110
    },
    displayPortal:{
      flexDirection: 'row',
      width: 175,
      height: 46,
      backgroundColor: '#FFFFFF',
      borderRadius: 9,
      justifyContent:'space-around',
      alignItems: 'center',
      flex:1
    },
    tableContainer:{
      flex: 3,
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
      justifyContent:'space-between', 
      alignContent:'space-between', 
      gap:'1%',
      flex:1
    },
    orderStyle: {
      display:'flex',
      flex:1,
      marginHorizontal:'1%',
      flexDirection:'column',
      justifyContent:'space-between', 
      padding:'1%',
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
      marginVertical: '1%' 
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
    },
    controlContainer:{
      flexDirection:'row',
      justifyContent:'center',
      gap:'3%',
      flex:1
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