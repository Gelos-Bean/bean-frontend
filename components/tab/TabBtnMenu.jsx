import { View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper';
import styles from '../../styles/posStyles.js';


export default function TabBtnMenu() {
  return (
      <View style={styles.buttonContainer}>
          <View style={styles.buttonRow}>
            <View style={styles.displayPortal}>
              <Text variant='bodySmall'>Tab:</Text>
              <Text variant='labelLarge'>{null}</Text>
            </View>
            <View style={styles.buttonText}>
              <IconButton style={styles.squareButton}
                icon="broom"
                iconColor='#ffff'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={30}
                onPress={() => console.log(`Not yet implemented`)}
              />
              <Text variant='bodySmall'>Clear Tab</Text>
            </View>
          </View>
        <View style={styles.buttonRow}>
            <Button style={[styles.squareButton, styles.wideButton]}
              mode="contained"
              icon="tag-plus"
              onPress={() => console.log(`Not yet implemented`)}>              
              Add Order
            </Button>
            <View style={styles.buttonText}>
              <IconButton style={styles.squareButton}
                icon="send"
                iconColor='#ffff'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={30}
                onPress={() => console.log(`Not yet implemented`)}
              />
              <Text variant='bodySmall'>Call Away</Text>
            </View>
        </View>
      </View>
  )
};