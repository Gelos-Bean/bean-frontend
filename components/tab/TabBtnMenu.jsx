import { View, StyleSheet } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import connection from '../../config/config.json';
import styles from '../../styles/posStyles.js';


export default function TabBtnMenu({ tableNo, setViewTableModal, highlightOrder }) {
 
  function handleTableModal() {
    setViewTableModal(true);
  }

  return (
    <View style={[styles.buttonContainer, tStyles.btnContainer]}>
      <View style={[styles.buttonRow, tStyles.btnRow]}>
        <View style={styles.buttonText}>
          <IconButton style={styles.squareButton}
                  icon="plus"
                  mode="contained"
                  selected={true}
                  size={30}
                  onPress={handleTableModal}
          />
          <Text variant='bodySmall'>Add Table</Text>
        </View>
        <View style={styles.buttonText}>
          <IconButton style={styles.squareButton}
            icon="magnify"
            mode="contained"
            selected={true}
            size={30}
            
          />
          <Text variant='bodySmall'>Search</Text>
        </View>
      </View>
        
      <View style={[styles.buttonRow, tStyles.btnRow]}>
        <View style={styles.buttonText}>
          <IconButton style={styles.squareButton}
            icon="minus-circle"
            mode="contained"
            selected={true}
            disabled={highlightOrder ? false : true}
            onPress={() => voidItem()}
            size={30}
          />
          <Text variant='bodySmall'>Void Order</Text>
        </View>
        <View style={styles.buttonText}>
            <IconButton style={styles.squareButton}
              icon="send"
              iconColor='#ffff'
              containerColor='rgb(156, 64, 77)'
              mode="contained"
              size={30}
              disabled={highlightOrder ? false : true}
              onPress={() => console.log(`Not yet implemented`)}
            />
            <Text variant='bodySmall'>Call Away</Text>
          </View>
        </View>
        <View style={[styles.buttonRow, tStyles.btnRow]}>
          <Button style={[styles.squareButton, styles.wideButton]}
            mode="contained"
            icon="tag-plus"
            onPress={() => console.log(`Not yet implemented`)}>              
            Add Order
          </Button>  
        </View>
    </View>
  )
};

const tStyles = StyleSheet.create({
  btnContainer: {
    padding: 15,
  },

  btnRow:{
    justifyContent: 'space-around',
    marginVertical: 7
  }
})