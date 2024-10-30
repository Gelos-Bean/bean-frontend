import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Alert, ScrollView } from 'react-native';

import { Avatar, Button, Card, Text } from 'react-native-paper';
import styles from '../styles/posStyles.js';

import Header from '../components/Header.jsx';

const Separator = () => <View style={styles.separator} />;

export default function Orders(){
  const [orders, setOrders] = useState({});

  useEffect(() => {
    getOrders();
  },[]);

  async function getOrders() {
    try{
      const response = await fetch('http://localhost:8080/orders');
      const orders = await response.json(); 

      if(!orders.success) {
        return console.log(`Error: ${orders.msg}`)
      }

      setOrders(orders.msg);

    } catch (err) {
      console.log(err.message);
    }
  }

  return (  
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <Header
              title={"Orders"}
              location={"Sydney"}
              username={null} />
      </View>
      <Separator />
      <View style={styles.body}>
        <View style={{flexDirection: 'row', flex:1}}>
          <View style={styles.mainContainer}>
            <ScrollView style={{flexDirection: 'column'}}> 

            {orders && orders.length > 0 ? (
              orders.map((order, index) => {
                return (
                  <Card key={index}>
                    <Card.Title title={`Order ${index + 1}`} />
                    <Text>{`Table No: ${order.table.tableNo}`}</Text>
                    
                    {order.products && Array.isArray(order.products) && 
                      order.products.map((prod, prodIndex) => ( 
                        <Card.Content key={prodIndex}> 
                          <Text>{prod.item.name}</Text>

                          {prod.selectedOptions && Array.isArray(prod.selectedOptions)
                           && prod.selectedOptions.length > 0 ? (
                              prod.selectedOptions.map((sOp, index) => {
                                return <Text>{sOp.name}</Text>
                            })
                          ): null }

                        </Card.Content>
                      ))
                    }
                  </Card>
                )
              })
            ): null }
            </ScrollView>
          </View>
        </View>
      </View>
      </SafeAreaView>
    );
};
