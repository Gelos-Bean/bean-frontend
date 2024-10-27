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
      flexDirection: 'column',
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
    buttonContainer:{
      margin:'1%',
      padding: 10,
      backgroundColor: '#fcf8f2',
      borderRadius: 9,
      justifyContent: 'center',
      flexDirection: 'column',
      flex:4
    },
    wideButtonContainer:{
      margin:'1%',
      padding: 2,
      backgroundColor: '#fcf8f2',
      borderRadius: 9,
      justifyContent: 'center',
      flexDirection: 'column',
      flex:1
    },
    buttonRow:{
      flexDirection: 'row',
      justifyContent:'space-between',
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
      color:'rgb(229 220 200)'
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
      flexDirection: 'row', flexWrap: 'wrap',
    },
    cardStyle: {
      margin: '1%',
      width: 125
    },
    cardCover: {
      height: 100,
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
    },
    cardBody: {
      textAlign: 'center',
      padding: 100
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
    table: {

    },
    headerRow: {
      flexDirection: 'row',
      paddingTop: 10,
      borderColor: '#ccc',
      textAlign: 'left',
      marginLeft:10,
      marginRight:10,
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
      color: 'white'
    },
    cell: {
      flex: 1,
      padding: 3,
      textAlign: 'left',
    },
    headerText: {

    },
    
  });