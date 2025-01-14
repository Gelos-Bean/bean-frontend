import React, { useContext } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Button, Text, IconButton, PaperProvider, Avatar, MD3LightTheme as DefaultTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { AuthContext } from '../app/context/AuthContext.jsx';

import styles from '../styles/posStyles.js';
import customTheme from '../styles/theme';
const theme = customTheme;


export default function Header({ title, location, username, role, image }){
  const router = useRouter();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => { 
    logout();
    router.push('/');
  }

  return (
    <View style={headerStyles.container}>
      <View style={headerStyles.leftContainer}>
        <View style={headerStyles.logoContainer}>
          <Image
              style={headerStyles.logo}
              source={require('../assets/images/NM_Long.png')} />
        </View>
        <Text variant='bodyLarge'>{ location }</Text>
      </View>

      <View style={headerStyles.centreContainer}>
        <Text variant='headlineMedium'>{ title }</Text>
      </View>

      <View style={headerStyles.rightContainer}>
      <Avatar.Image 
            size={40} 
            style={{marginVertical:'auto'}}
            source={{ uri: image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541' }} 
          />
        <View style={headerStyles.userInfo}>
        
          <Text variant='bodyLarge' style={{marginVertical:'auto'}}>{ username } </Text>
          <Text variant='labelLarge' style={{marginVertical:'auto'}}>{role}</Text>

          

        </View>
        <View style={headerStyles.logout}>
          <PaperProvider theme={theme}>
            <Button
              style={[styles.squareButton, styles.wideButton]}
              mode="contained"
              icon="logout"
              compact={true}
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
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
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
    flex:2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  rightContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems: 'center',
    height: '100%',
  },
  userInfo: {
    flexDirection: 'row',
    justifyContent:'space-evenly',
    height: '100%',
    flex:2,
  },
  logout: { 
    height: '100%',
    flex:1
  }
  
});