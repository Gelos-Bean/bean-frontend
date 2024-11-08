import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, ScrollView, Alert, TextInput } from 'react-native';
import { Button, Card, Text, IconButton, Switch } from 'react-native-paper';
import styles from '../styles/posStyles.js';
import Header from '../components/Header.jsx';
import { connection } from '../config/config.json';

import ConfirmationModal from '../components/modals/confirmationModal.jsx';
import OrderDetailsModal from '../components/modals/orderDetailsModal.jsx';

const Separator = () => <View style={styles.separator} />;

export default function Orders() {

  //Modals
  const [viewConfirmationModal, setViewConfirmationModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('Undefined');
  const [modalBody, setModalBody] = useState('Undefined');

  const [viewOrderDetailsModal, setViewOrderDetailsModal] = useState(false);


 // Delete order:
 const [orderToDelete, setOrderToDelete] = useState(null);
  const ShowDeleteModal = (order) => {
    setOrderToDelete(order);
    setModalTitle('Confirm send order')
    setModalBody('Are you sure you want to send this order? The order will be deleted')
    setViewConfirmationModal(true)
  }
 async function DeleteOrder(selection) {
  if(!selection){
    setOrderToDelete(null);
    return
  } else {
    try {
      const response = await fetch(`${connection}/orders/${orderToDelete._id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });
  
      const data = await response.json();
      if (!data.success) {
        return Alert.alert('Error', data.msg);
      }
  
      setOrderToDelete(null);
      setOrderToView(null);
      getOrders();
  
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  }

}

  //Show order details
  const [orderToView, setOrderToView] = useState(null);

  const ShowDetailsModal = (order) => {
    setOrderToView(order);
    setViewOrderDetailsModal(true)

  }

  //Orders and pagination
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; 

  async function getOrders() {
    try {
      const response = await fetch(`${connection}/orders`);
      const orders = await response.json();

      if (!orders.success) {
        return console.log(`Error: ${orders.msg}`);
      }

      setOrders(orders.msg);
    } catch (err) {
      console.log(err.message);
    }
  }

  //Auto away controls
  const [autoAwayTime, setAutoAwayTime] = useState(15);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  
  useEffect(() => {
    getOrders();
  }, []);

  

  // Page navigation
  const paginatedOrders = orders.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
  const totalPages = Math.ceil(orders.length / itemsPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };
  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Orders" location="Sydney" username={null} />
      <Separator />
          <View style={styles.fullMainContainer}>          
            <FlatList
              contentContainerStyle={styles.orderContainer}
              data={paginatedOrders}
              numColumns={4}
              keyExtractor={(order) => order._id}
              renderItem={({ item: order }) => {
                const createdAt = new Date(order.createdAt);
                const formattedDate = createdAt.toLocaleDateString([], { year: 'numeric', month: '2-digit', day: '2-digit' });
                const formattedTime = createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                const groupByCourse = (products) => {
                  return products.reduce((acc, product) => {
                    const course = product.item.course || 'Other';
                    if (!acc[course]) acc[course] = [];
                    acc[course].push(product);
                    return acc;
                  }, {});
                };

                const groupedProducts = groupByCourse(order.products);

                return (
                  <Card style={styles.orderStyle}>
                    <Card.Title title={`Table ${order.table ? order.table.tableNo : 'N/A'}`} />
                    <View style={styles.orderHeader}>
                      <Text variant="labelMedium">{`${formattedTime} ${formattedDate}`}</Text>
                      <Text variant="labelMedium">{`Pax: ${order.table ? order.table.pax : 'N/A'}`}</Text>
                      <Text variant="labelMedium">{`Lines: ${order.products.length}`}</Text>

                    </View>

                    <ScrollView style={{height:'100%'}} contentContainerStyle={{ flexGrow:1 }}>
                      {Object.entries(groupedProducts).map(([course, products], courseIndex) => (
                        <View key={courseIndex} style={styles.courseSection}>
                          <Text variant="labelLarge">{course}</Text>
                          {products.map((prod, prodIndex) => (
                            <View key={prodIndex} style={styles.productContainer}>
                              <Text variant="bodyMedium"
                                style={prod.isSent ? styles.sentProduct : null}>
                                  {prod.item.name} x{prod.quantity}</Text>
                              {prod.selectedOptions && prod.selectedOptions.length > 0 && (
                                <View style={styles.optionsContainer}>
                                  {prod.selectedOptions.map((option, optionIndex) => (
                                    <Text key={optionIndex} variant="bodySmall" 
                                      style={[styles.optionText, prod.isSent ? styles.sentProduct : null]}>
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
                  <View style={styles.orderButtons}>
                    <Button style={styles.squareButton} 
                      mode="contained" 
                      icon="arrow-expand-all"
                      onPress={() => ShowDetailsModal(order)}>
                      Expand
                    </Button>
                    <Button style={styles.squareButton} 
                      mode="contained" 
                      icon="send"
                      onPress={() => ShowDeleteModal(order)}>
                      Send All
                    </Button>
                  </View> 
                  </Card>
                );
              }}
            />
            <View style={styles.paginationControls}>
            <View style={styles.controlContainer}>
                <Text variant='labelMedium' style={{marginVertical:'auto'}}>Toggle auto call away</Text>
                <TextInput
                  placeholder={autoAwayTime.toString()}
                  keyboardType="numeric"
                  value={autoAwayTime.toString()} 
                  onChangeText={(value) => setAutoAwayTime(parseInt(value) || 0)}
                  style={[styles.textInputStyle, {width: 50, marginVertical:'auto'}]}
                />
                <Text variant='labelMedium' style={{marginVertical:'auto'}}>minutes</Text>
                <Switch value={isSwitchOn} onValueChange={onToggleSwitch} style={{marginVertical:'auto'}}/>
              </View>
              <View style={styles.controlContainer}>
                <IconButton style={[styles.roundButton, {marginHorizontal:50}]}
                  icon="arrow-left"
                  mode="contained"
                  selected={true}
                  size={20}
                  disabled={currentPage === 0}
                  onPress={handlePreviousPage}
                />
                <Text variant='labelMedium' style={{marginVertical:'auto'}}>{`Page ${currentPage + 1} of ${totalPages}`}</Text>
                <IconButton style={[styles.roundButton, {marginHorizontal:50}]}
                  icon="arrow-right"
                  mode="contained"
                  selected={true}
                  size={20}
                  disabled={currentPage >= totalPages - 1}
                  onPress={handleNextPage}
                />
              </View>
            </View>
          </View>
          <ConfirmationModal visible={viewConfirmationModal} onDismiss={() => setViewConfirmationModal(false)} 
            title={modalTitle} body={modalBody} onSelect={DeleteOrder}/>
          <OrderDetailsModal visible={viewOrderDetailsModal} onDismiss={() => {setViewOrderDetailsModal(false), getOrders()}} 
            order={orderToView}/>
    </SafeAreaView>
  );
}
