import { StyleSheet } from 'react-native';


export default styles = StyleSheet.create({
    container: {
      flex: 1
    },
    body: {
      flex:1,
      flexDirection: 'row',
      marginRight:'5%',
      marginLeft:'5%'
    },
    mainContainer:{
      margin:'1%',
      padding: 10,
      backgroundColor: '#E5dCC8',
      borderRadius: 9,
      flex: 3,
    },
    rightContainer:{
      margin:'1%',
      flexDirection: 'column',
      flex:1
    },
    numpadContainer:{
      flex:2
    },
    buttonContainer:{
      padding: 10,
      backgroundColor: '#E5dCC8',
      borderRadius: 9,
      justifyContent: 'center',
      flexDirection: 'column',
      flex:1
    },
    buttonRow:{
      flexDirection: 'row',
      flex:1
    },
    squareButton:{
      borderRadius: 9,
      marginBottom: '1%',
    },
    roundButton:{
      marginBottom: '1%',
    },
    wideButton:{
      margin: '1%',
      width: 125,
      height: 56,
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
      flexDirection: 'row',
      left: 0,
      width: 900,
      justifyContent: 'space-between',
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
  });