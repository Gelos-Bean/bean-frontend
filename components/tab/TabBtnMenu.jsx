import { View, StyleSheet } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import connection from '../../config/config.json';
import styles from '../../styles/posStyles.js';


export default function TabBtnMenu({ tableNo, setViewTableModal, highlightOrder }) {
 
  function handleTableModal() {
    setViewTableModal(true);
  }

  return (
    <View style={[styles.managerButtonContainer, {flexDirection:'row'}]}>
      <View style={[styles.buttonRow, {flex:1}]}>
        <Button style={[styles.squareButton, styles.wideButton]}
            mode="contained"
            icon="plus"
            onPress={handleTableModal}>              
            Add Table
        </Button>
        <Button style={[styles.squareButton, styles.wideButton]}
            mode="contained"
            icon="magnify"
            onPress={handleTableModal}
            disabled={false}>              
            Search Tables
        </Button>
        <Button style={[styles.squareButton, styles.wideButton]}
            mode="contained"
            icon="broom"
            onPress={() => voidItem()}>              
            Clear Table
        </Button>
      </View>
      <View style={styles.verticalSeparator}></View>
      <View style={[styles.buttonRow, {flex:1}]}>
        <Button style={[styles.squareButton, styles.wideButton]}
            mode="contained"
            icon="book-open-variant"
            disabled={false}>              
            View Details
        </Button>
      </View>       
    </View>
  )
};
