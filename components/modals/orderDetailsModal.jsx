import React from 'react';
import { Modal, View, ScrollView } from 'react-native';
import { Button, Text } from 'react-native-paper';
import styles from '../../styles/modalStyles';

const OrderDetailsModal = ({ visible, onDismiss, order, onSelect }) => {
  if (!order) {
    return null; // If order is null, render nothing
  }

  // Helper function to group products by course
  const groupByCourse = (products) => {
    return products.reduce((acc, product) => {
      const course = product.item.course || 'Other';
      if (!acc[course]) acc[course] = [];
      acc[course].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupByCourse(order.products || []);

  const createdAt = new Date(order.createdAt);
  const formattedDate = createdAt.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
  const formattedTime = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Modal animationType="slide" transparent={true} visible={visible} >
      <View style={styles.centeredView}>
        <View style={[styles.modalView, {}]}>
          <Text variant='headlineMedium' style={styles.modalText}>
            Table {order.table ? order.table.tableNo : 'N/A'}
          </Text>     
          <View style={styles.orderStyle}>
            <View style={styles.orderHeader}>
              <Text variant="labelMedium">{`${formattedTime} ${formattedDate}`}</Text>
              <Text variant="labelMedium">{`Pax: ${order.table ? order.table.pax : 'N/A'}`}</Text>
            </View>
            <ScrollView contentContainerStyle={{ flexDirection:'column' }}>
              {Object.entries(groupedProducts).map(([course, products], courseIndex) => (
                <View key={courseIndex} style={styles.courseSection}>
                  <Text variant="labelLarge">{course}</Text>
                  {products.map((prod, prodIndex) => (
                    <View key={prodIndex} style={styles.productContainer}>
                      <Text variant="bodyMedium">
                        {prod.item.name} x{prod.quantity}
                      </Text>
                      {prod.selectedOptions && prod.selectedOptions.length > 0 && (
                        <View style={styles.optionsContainer}>
                          {prod.selectedOptions.map((option, optionIndex) => (
                            <Text key={optionIndex} variant="bodySmall" style={styles.optionText}>
                              - {option.name} (${option.price})
                            </Text>
                          ))}
                        </View>
                      )}
                    </View>
                  ))}
                </View>
              ))}
            </ScrollView>
            
          </View>
          <View style={styles.bottomButtonRow}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              mode="contained"
              onPress={() => {
                onSelect(false);
                onDismiss();
              }}
            >
              Cancel
            </Button>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon="send"
              mode="contained"
              onPress={() => {
                onSelect(true);
                onDismiss();
              }}
            >
              Send All
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OrderDetailsModal;
