import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Text, PaperProvider, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

import customTheme from '../styles/theme';
const theme = customTheme;


export default function Header({ title, location, username }){
  const router = useRouter();

  const goTo = (route) => {
    router.push(route);
  };


  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
            style={styles.logo}
            source={require('../assets/images/BeanSceneLogo.png')} />
      </View>
      <View style={styles.centreSection}>
        <View style={styles.fixToText}>
          <Text style={styles.textStyle}>{ location }</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.textStyle}>{ username ? username : "User" } </Text>
        </View>
      </View>
      <View style={styles.loginContainer}>
        <PaperProvider theme={theme}>
          <Button
            style={[styles.squareButton, styles.wideButton]}
            mode="contained"
            icon="logout"
            onPress={() => { goTo('/login') }}>
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
    height: 35,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    marginLeft: 10,
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
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
    alignContent:'center',
    marginBottom: 1,
    marginLeft: 10
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textStyle: {
    fontSize: 16,
    margin:'auto'
  },

  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    margin:'auto'
  },
  squareButton:{
    borderRadius: 9,
  },
  wideButton:{
    width: 120,
    height: 40,
    color:'rgb(229 220 200)',
    margin:'auto'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});