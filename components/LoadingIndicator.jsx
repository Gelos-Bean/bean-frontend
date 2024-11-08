import { 
  Text, 
  ActivityIndicator
} from 'react-native-paper';
import { View } from 'react-native';
import styles from '../styles/posStyles';

export default function LoadingIndicator() {
  return(
    <View style={styles.loadingContainer}>
      <ActivityIndicator 
        animating={true} 
        size="large" />
    </View>
)};