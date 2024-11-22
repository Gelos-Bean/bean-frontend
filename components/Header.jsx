import React, { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Text, PaperProvider, Avatar, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { AuthContext } from '../app/context/AuthContext.jsx';

import styles from '../styles/posStyles.js';
import customTheme from '../styles/theme';
const theme = customTheme;


export default function Header({ title, location, username, image }){
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => { 
    logout();
    router.push('/login');
  }

  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.leftContainer}>
        <View style={headerStyles.logoContainer}>
          <Image
              style={headerStyles.logo}
              source={require('../assets/images/BeanSceneLogo.png')} />
        </View>
        <Text variant='bodyLarge'>{ location }</Text>
      </View>

      <View style={headerStyles.centreContainer}>
        <Text variant='headlineMedium'>{ title }</Text>
      </View>

      <View style={headerStyles.rightContainer}>
        <View style={headerStyles.userInfo}>
          <Text variant='bodyLarge'>{ username ? username : "User" } </Text>
          <Avatar.Image 
            size={50} 
            source={{ uri: image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541' }} 
          />
        </View>

        <View style={headerStyles.logout}>
          <PaperProvider theme={theme}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              mode="contained"
              icon="logout"
              onPress={handleLogout}>
              Log Out
            </Button>
          </PaperProvider>
        </View>
      </View>
  </View>
  )
}

const headerStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    paddingHorizontal: 16,
    paddingTop: 30,
    paddingBottom: 5,
    height: 75,
  },
  
  leftContainer: { 
    flexDirection: 'row',
    alignItems: 'center'
  },

  logoContainer: {
    height: 40,
    width: 200,
    marginRight: 10,
  },

  logo: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },

  centreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginRight: 20,
  },
  logout: { 
    maxHeight: '100%'
  }
  
});