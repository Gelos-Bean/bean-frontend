import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
} from 'react-native';
import Header from '../../components/Header.jsx';
import { ToggleButton, Button, Text, Card, IconButton, MD3Colors } from 'react-native-paper';
import styles from '../../styles/posStyles';

const Separator = () => <View style={styles.separator} />;

const App = () => {
  
  const [selectedTab, setSelectedTab] = React.useState('Entrees');

  type Option = {
    _id: string;
    name: string;
    price: number;
  }
  
  type Product = {
    _id: string;
    name: string;
    price: number;
    course: string;
    options?: {item: Option}[]; //optional
    image?: string;    //optional
  };

  return (
  <SafeAreaView style={styles.container}>
    <Header title={"Home"}
      location={"Sydney"}
      username={null} />
    <Separator />
    <View style={styles.body}>
      <View style={styles.mainContainer}>
        <View style={styles.tabBar}>
          <Button
            style={[
              styles.tabButton,
              selectedTab === 'Entrees' ? styles.activeTab : styles.inactiveTab
            ]}
            mode="contained"
            onPress={() => setSelectedTab('Entrees')}
            disabled={selectedTab === 'Entrees'}>
            Entrees
          </Button>
          <Button
            style={[
              styles.tabButton,
              selectedTab === 'Mains' ? styles.activeTab : styles.inactiveTab
            ]}
            mode="contained"
            onPress={() => setSelectedTab('Mains')}
            disabled={selectedTab === 'Mains'}>
            Mains
          </Button>
          <Button
            style={[
              styles.tabButton,
              selectedTab === 'Desserts' ? styles.activeTab : styles.inactiveTab
            ]}
            mode="contained"
            onPress={() => setSelectedTab('Desserts')}
            disabled={selectedTab === 'Desserts'}>
            Desserts
          </Button>
        </View>
          <Card style={styles.cardStyle}>
            <Card.Cover 
              source={{ uri: 'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png' }} 
              style={{ height: 100 }}/>
            <Card.Content>
            <Text variant="titleLarge">Card title</Text>
            <Text variant="bodyMedium">Example of extra text</Text>
            </Card.Content>
          </Card>
      </View>
      <View style={styles.rightContainer}>
        <View style={styles.numpadContainer}>
          <Text>Numpad</Text>
        </View>
        <View style={[styles.buttonContainer]}>
          <View style={styles.buttonRow}>
            <IconButton style={styles.squareButton}
              icon="plus-box"
              iconColor='rgb(229 220 200)'
              containerColor='rgb(156, 64, 77)'
              mode="contained"
              size={40}
            />
            <IconButton style={styles.squareButton}
              icon="pencil"
              iconColor='rgb(229 220 200)'
              containerColor='rgb(156, 64, 77)'
              mode="contained"
              size={40}
              onPress={() => console.log('Edit not implemented')}
            />
          </View>
          <View style={styles.buttonRow}>
            <IconButton style={styles.squareButton}
              icon="magnify"
              iconColor='rgb(229 220 200)'
              containerColor='rgb(156, 64, 77)'
              mode="contained"
              size={40}
            />
            <IconButton style={styles.squareButton}
              icon="delete"
              iconColor='rgb(229 220 200)'
              containerColor='rgb(156, 64, 77)'
              mode="contained"
              size={40}
            />
          </View>
          <View style={styles.buttonRow}>
            <Button style={[styles.squareButton, styles.wideButton]}
              mode="contained"
              icon="poll">              
              Report
            </Button>
            <IconButton style={styles.roundButton}
              icon="home-roof"
              iconColor='rgb(229 220 200)'
              containerColor='rgb(156, 64, 77)'
              mode="contained"
              size={40}
            />
          </View>
        </View>
      </View>
    </View>
  </SafeAreaView>
)};

export default App;