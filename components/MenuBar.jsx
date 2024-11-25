import React, { useContext } from 'react';
import { Appbar } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../app/context/AuthContext.jsx';

export default function MenuBar(){
  const router = useRouter();
  const navigation = useNavigation();

  const { isAdmin } = useContext(AuthContext);

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
        <Appbar.Action icon="home" title="Home" onPress={() => { goTo('products') }}/>
        <Appbar.Action icon="tab" title="Tabs" onPress={() => { goTo('/tabs') }} />
        <Appbar.Action icon="clipboard-list" title="Orders" onPress={() => { goTo('/orders') }} />
        { isAdmin &&
          <Appbar.Action icon="account-cog" title="Manager" onPress={() => { goTo('/manager') }} />
        }
    </Appbar>
  );
};