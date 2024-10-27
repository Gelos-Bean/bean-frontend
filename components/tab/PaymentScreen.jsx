import { View, Text, Pressable } from 'react-native';
import styles from '../../styles/posStyles';


export default function PaymentScreen() {
    return (
        <View style={styles.buttonContainer}>
            <View>
                <View style={styles.buttonRow}>
                    <Pressable><Text>5%</Text></Pressable>
                    <Pressable><Text>10%</Text></Pressable>
                    <Pressable><Text>15%</Text></Pressable>
                </View>
                <Pressable style={styles.wideButton}><Text>Add Custom Tip</Text></Pressable>
            </View>
            <Text>-------------------------------------------</Text>
            <View>
                <Pressable><Text>Pay Custom Amount</Text></Pressable>
                <Pressable><Text>Void Selected Items</Text></Pressable>
                <Pressable><Text>Add Discount</Text></Pressable>
            </View>
            <Text>-------------------------------------------</Text>
            <View>
                <Pressable><Text>Pay Selected: </Text></Pressable>
                <Pressable><Text>Pay Remaining: </Text></Pressable>
            </View>
            <View>
                <Text>Total bill</Text>
            </View>
            <View>
                <Text>Email Receipt</Text>
                <Text>Send</Text>
            </View>
        </View>
    );
};