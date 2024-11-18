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
      flex: 1,
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
      flex:1,
    },
    buttonColumn:{
      flexDirection:'column', 
      justifyContent:'space-between',
      flex:2, 
    },
    buttonRow:{
      flexDirection: 'row',
      marginVertical:'1%',
      justifyContent:'space-between',
      alignContent:'center',
      flexWrap:'wrap',

    },
    squareButton:{
      borderRadius: 9,
      marginVertical:0
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
      marginVertical:0,
      marginHorizontal:'1%',
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
      marginVertical: 9,
      borderBottomColor: '#9c404d',
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
    verticalSeparator: {
      marginHorizontal: '1%',
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
    commentContainer: {
      flexDirection:'row',
      margin:'1%',
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
      height: 46,
      backgroundColor: '#FFFFFF',
      borderRadius: 9,
      justifyContent:'space-around',
      alignItems: 'center',
      marginHorizontal:'1%',
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
    largeRow: {
    },
    largeHighlightedRow: {
      backgroundColor: 'rgb(156, 64, 77)',
    },
    unhighlightedText: {
      color: 'rgb(0,0,0)',
      numberOfLines:1,
      ellipsizeMode:"tail" 
    },
    highlightedText: {
      color: 'rgb(255, 255, 255)',
      numberOfLines:1,
      ellipsizeMode:"tail" 
    },
    highlightedAccordian:{
      backgroundColor: 'rgb(156, 64, 77)',
      color: 'rgb(255, 255, 255)',
      paddingVertical: 0,
      paddingHorizontal: 0,
      marginHorizontal: 0,
      marginVertical: 0,
    },
    unhighlightedAccordian:{
      paddingVertical: 0,
      paddingHorizontal: 0,
      marginHorizontal: 0,
      marginVertical: 0,
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
      display:'flex',
      justifyContent:'space-between', 
      alignContent:'space-between', 
    },
    orderStyle: {
      flex: 1,
      marginBottom: '1%',
      marginHorizontal:'2%',
      width: '21%',
      maxWidth: '21%',
      minWidth: 120,
      height: 255, 
      justifyContent: 'space-between',
      padding: '1%',
      borderRadius: 9,
    },
    titleContainer:{
      flexDirection:'row', 
      justifyContent:'space-between', 
      height:'17%'
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
    controlContainer:{
      flexDirection:'row',
      justifyContent:'center',
      marginHorizontal:'1%',
      bottom:0,
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
    sentProduct: {
      opacity: 0.5, 
      color: 'grey', 
    },
    loadingContainer: {
      flex:1,
      alignItems: 'center',
      justifyContent:'center',
      alignSelf:'center',
      marginVertical:'10%'
    },
  });