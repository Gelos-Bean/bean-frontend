import React from 'react';
import {
  StyleSheet,
  // Button,
  View,
  SafeAreaView,
  // Text,
  Alert,
} from 'react-native';

import { Avatar, Button, Card, Text } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

const Separator = () => <View style={styles.separator} />;

const App = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
    <View style={styles.fixToText}>
        <Text>Logo</Text>
        <Text>Location</Text>
        <Text>Username</Text>
      </View>
      <Text style={styles.title}>
        Orders
      </Text>     
    </View>
    </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  header:{
    position: 'absolute', 
    left: 0,
    right: 0,
    top: 20
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardContainer: {
    flexDirection: 'row',
    left: 0,
    width: 900,
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;