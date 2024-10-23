import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Text,
    Pressable
  } from 'react-native';
import { Button, PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import customTheme from '../styles/theme'
const theme = customTheme

export default function Header({ title, location, username }){
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
            style={styles.logo}
            source={require('../assets/images/BeanSceneLogo.png')} />
      </View>
      <View style={styles.centreSection}>
        <View style={styles.fixToText}>
          <Text style={[ styles.textStyle] }>{ location }</Text>
          <Text style={styles.textStyle}>{ username ? username : "User" } </Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <View style={styles.loginContainer}>
        <PaperProvider theme={theme}>
          <Button
            style={[styles.squareButton, styles.wideButton]}
            mode="contained"
            icon="logout">
            Log Out
          </Button>
        </PaperProvider>
      </View>
  </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginTop: '2%',
    height: 60,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    marginLeft: 10,
    height: '100%',
    width: '80%',
    resizeMode: 'contain'
  },
  centreSection: {
    flex:4,
    alignContent:'center',
    paddingHorizontal: 20,
  },
  bottomHalf: {
    alignItems: 'center',
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent:'center'
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  textStyle: {
    fontSize: 16,
  },

  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
  },
  squareButton:{
    borderRadius: 9,
  },
  wideButton:{
    margin:10,
    width: 150,
    height: 45,
    justifyContent:'center',
    color:'rgb(229 220 200)'
  }
});