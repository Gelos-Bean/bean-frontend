import React from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Alert,
} from 'react-native';

import { Avatar, Button, Card, Text } from 'react-native-paper';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

import Header from '../../components/Header.jsx';

const Separator = () => <View style={styles.separator} />;

const App = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
    <Header
            title={"Manager"}
            location={"Sydney"}
            username={null} />
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