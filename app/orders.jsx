import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, ScrollView, Alert, TextInput } from 'react-native';
import { Button, Card, Text, IconButton, Switch } from 'react-native-paper';
import styles from '../styles/posStyles.js';
import Header from '../components/Header.jsx';
import { connection } from '../config/config.json';


const Separator = () => <View style={styles.separator} />;

export default function Orders() {
  //Orders and pagination
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; 

  //Auto away controls
  const [autoAwayTime, setAutoAwayTime] = useState(15);
  const [isSwitchOn, setIsSwitchOn] = React.useState(false);

  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  
  useEffect(() => {
    getOrders();
  }, []);

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
                    </View>

                    <ScrollView contentContainerStyle={{ flexGrow:1, height:'13vh' }}>
                      {Object.entries(groupedProducts).map(([course, products], courseIndex) => (
                        <View key={courseIndex} style={styles.courseSection}>
                          <Text variant="labelLarge">{course}</Text>
                          {products.map((prod, prodIndex) => (
                            <View key={prodIndex} style={styles.productContainer}>
                              <Text variant="bodyMedium">{prod.item.name} x{prod.quantity}</Text>
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
                  <View style={styles.orderButtons}>
                    <Button style={styles.squareButton} mode="contained" icon="arrow-expand-all">
                      Expand
                    </Button>
                    <Button style={styles.squareButton} mode="contained" icon="send">
                      Send
                    </Button>
                  </View> 
                  </Card>
                );
              }}
            />
            {/* Page controls */}
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
                <IconButton style={styles.roundButton}
                  icon="arrow-left"
                  mode="contained"
                  selected={true}
                  size={20}
                  disabled={currentPage === 0}
                  onPress={handlePreviousPage}
                />
                <Text variant='labelMedium' style={{marginVertical:'auto'}}>{`Page ${currentPage + 1} of ${totalPages}`}</Text>
                <IconButton style={styles.roundButton}
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
    </SafeAreaView>
  );
}
