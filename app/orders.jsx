import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, FlatList, ScrollView, Alert } from 'react-native';
import { Button, Card, Text, IconButton } from 'react-native-paper';
import styles from '../styles/posStyles.js';
import Header from '../components/Header.jsx';
import { connection } from '../config/config.json';


const Separator = () => <View style={styles.separator} />;

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8; 

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
      
      <View style={{flex:1}}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
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
                    <Card.Title title={`Table ${order.table.tableNo}`} />
                    <View style={styles.orderHeader}>
                      <Text variant="labelMedium">{`${formattedTime} ${formattedDate}`}</Text>
                      <Text variant="labelMedium">{`Pax: ${order.table.pax}`}</Text>
                    </View>

                    <ScrollView style={{ height: 175 }} contentContainerStyle={{ flexGrow: 1 }}>
                      {Object.entries(groupedProducts).map(([course, products], courseIndex) => (
                        <View key={courseIndex} style={styles.courseSection}>
                          <Text variant="titleMedium" style={styles.courseTitle}>{course}</Text>
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
                  {/* Card buttons */}
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
              <IconButton style={styles.roundButton}
                icon="arrow-left"
                iconColor='#ffff'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={20}
                disabled={currentPage === 0}
                onPress={handlePreviousPage}
              />
              <Text variant='labelMedium' style={{paddingTop:17}}>{`Page ${currentPage + 1} of ${totalPages}`}</Text>
              <IconButton style={styles.roundButton}
                icon="arrow-right"
                iconColor='#ffff'
                containerColor='rgb(156, 64, 77)'
                mode="contained"
                size={20}
                disabled={currentPage >= totalPages - 1}
                onPress={handleNextPage}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
