import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text
  } from 'react-native';

export default function Header({ title, location, username }){
  return (
    <View style={styles.container}>
      <View style={styles.fixToText}>
          <Image 
            style={styles.logo}
            source={require('../assets/images/logo-primary-transparent.png')} />
          <Text style={[ styles.fixToText, styles.middle ]}>{ location }</Text>
          <Text style={styles.fixToText}>{ username ? username : "User" } </Text>
      </View>
        <Text style={styles.title}>
            {title}
        </Text>     
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    marginHorizontal: 16,
    padding: 0
  },
  fixToText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginRight: 10,
    fontSize: 16,
  },
  middle: {
    marginRight: 140
  },
  logo: {
    width: 200,
    height: 60,
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5
  }
});