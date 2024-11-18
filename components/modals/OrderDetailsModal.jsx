import React, { useState } from 'react';
import { Modal, View, ScrollView, Alert } from 'react-native';
import { Button, Checkbox, Text } from 'react-native-paper';
import styles from '../../styles/modalStyles';
import { connection } from '../../config/config.json';

const OrderDetailsModal = ({ visible, onDismiss, order, handleDeleteOrder }) => {
  if (!order) {
    return null; // If order is null, render nothing
  }

  // State to track selected products
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Helper function to group products by course
  const groupByCourse = (products) => {
    return products.reduce((acc, product) => {
      const course = product.item && product.item.course ? product.item.course : 'Other';
      if (!acc[course]) acc[course] = [];
      acc[course].push(product);
      return acc;
    }, {});
  };

  const groupedProducts = groupByCourse(order.products || []);
  const createdAt = new Date(order.createdAt);
  const formattedDate = createdAt.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
  const formattedTime = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const toggleProductSelection = (productId) => {
    setSelectedProducts((prevSelected) =>
      prevSelected.includes(productId)
        ? prevSelected.filter((id) => id !== productId)
        : [...prevSelected, productId]
    );
  };

  function handleDismiss(){
    setSelectedProducts([])
    onDismiss();
  }

  async function handleSendSelected() {
    const updatedProducts = order.products.map((product) => {
      if (selectedProducts.includes(product.item._id)) {
        return { ...product, isSent: true };
      }
      return product;
    });
    const updatedOrder = {
      table: order.table._id, 
      products: updatedProducts,
      comment: order.comment,
      total: order.total
    }
    try {
      const response = await fetch(`${connection}/orders/${order._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedOrder)
      });
  
      const data = await response.json();
      if (!data.success) {
        return Alert.alert('Error', data.msg);
      }

    if(updatedProducts.every(product => product.isSent === true)){
      handleDeleteOrder(order);
    }

    } catch (error) {
      Alert.alert('Error', error.message);
    }

    setSelectedProducts([]);
    onDismiss();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text variant="headlineMedium" style={styles.modalText}>
            Table {order.table ? order.table.tableNo : 'N/A'}
          </Text>

          <View style={styles.orderHeader}>
            <Text variant="labelLarge">{`${formattedTime} ${formattedDate}`}</Text>
            <Text variant="labelLarge">{`Pax: ${order.table ? order.table.pax : 'N/A'}`}</Text>
            <Text variant="labelLarge">{`Lines: ${order.products.length}`}</Text>
          </View>
          <ScrollView style={styles.scrollableContent}>
            {Object.entries(groupedProducts).map(([course, products], courseIndex) => (
              <View key={courseIndex} style={styles.courseSection}>
                <Text variant="titleMedium">{course}</Text>
                {products.map((prod, index) => (
                  <View key={`${prod.item._id}-${index}`}
                  style={styles.productContainer}>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <Text variant="bodyLarge" 
                    style={[{maxWidth:'80%'}, prod.isSent ? styles.sentProduct : null]}>
                      {prod.item.name} x{prod.quantity}
                    </Text>
                    <Checkbox
                      status={selectedProducts.includes(prod.item._id) ? 'checked' : 'unchecked'}
                      onPress={() => toggleProductSelection(prod.item._id)}
                      disabled={prod.isSent}
                    />
                      </View>             
                    {prod.selectedOptions && prod.selectedOptions.length > 0 && (
                      <View style={styles.optionsContainer}>
                        {prod.selectedOptions.map((option, optionIndex) => (
                          <Text key={optionIndex} variant="bodyMedium" 
                          style={[{maxWidth:'80%'}, styles.optionText, prod.isSent ? styles.sentProduct : null]}>
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
          <View style={[styles.commentContainer, styles.inputContainer]}>
                    <Text variant='titleMedium'>
                      Comment: </Text>
                    <Text variant='bodyLarge'>
                      {order.comment}</Text>
                  </View>
          <View style={styles.bottomButtonRow}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon="window-close"
              mode="contained"
              onPress={handleDismiss}
            >
              Close
            </Button>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              icon="filter"
              mode="contained"
              onPress={handleSendSelected}
            >
              Send Selected
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default OrderDetailsModal;
