import React from 'react';
import { Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function MenuBar(){
  const router = useRouter();
  const navigation = useNavigation();

  const goTo = (route) => {
    router.push(route);
  };

  const handleBackNavigation = () => { 
    if (navigation.canGoBack()) {
      navigation.goBack(); 
    }
  }

  return (
    <Appbar 
      style={{justifyContent: 'space-between', paddingStart: 20, paddingEnd: 20 }}
      >
      <Appbar.BackAction onPress={() => { handleBackNavigation() }}/>
        <Appbar.Action icon="home" title="Home" onPress={() => { goTo('/') }}/>
        <Appbar.Action icon="tab" title="Tabs" onPress={() => { goTo('/tabs') }} />
        <Appbar.Action icon="clipboard-list" title="Orders" onPress={() => { goTo('/orders') }} />
        <Appbar.Action icon="account-cog" title="Manager" onPress={() => { goTo('/manager') }} />
    </Appbar>
  );
};