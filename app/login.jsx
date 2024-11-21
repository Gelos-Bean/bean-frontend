import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  Image,
  Alert,
  ScrollView
} from 'react-native';
import { 
  Text, 
  List,
  Avatar,
  IconButton
 } from 'react-native-paper';

import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

import { connection } from '../config/config.json';
import ShowError from '../components/ShowError.jsx';
import { withTimeout } from '../components/WithTimeout.jsx';
import LoadingIndicator from '../components/LoadingIndicator.jsx';
import styles from '../styles/posStyles';
import DialpadKeypad from '../components/Numpad.jsx';


const Login = () => {
  //Navigation
  const router = useRouter();
  const navigation = useNavigation();

  const goTo = (route) => {
    router.push(route);
  };

  //Get users
  const [users, setUsers] = useState([]); 
  const [usersLoading, setUsersLoading] = useState(false);
  async function PopulateUsers() {
    setUsersLoading(true);
    if (!connection) {
      ShowError('Connection configuration is missing');
      setUsersLoading(false); 
      return;
    }
    try {
      const response = await withTimeout(fetch(`${connection}/users`, { method: 'GET' }), 5000);
  
      if (!response.ok) {
        const errorMessage = 'Server responded with an error';
        ShowError(errorMessage);
        console.error(errorMessage, response.statusText);
        return;
      }
  
      const data = await response.json();
  
      if (data.success && Array.isArray(data.msg)) {
        setUsers(data.msg);
      } else {
        ShowError(data.msg);
      }
    } catch (err) {
      console.error('Search error:', err);
      ShowError('Failed to load users. Please check your network connection and try again.');
    } finally {
      setUsersLoading(false);
    }
  }

  //Log in
  const [user, setUser] = useState();
  const [code, setCode] = useState(""); 
  const [selectedUser, setSelectedUser] = useState();
  async function tryLogin() {
    if(code.length <= 0){
      Alert.alert('No Pin', 'Pin is required to log in.');
      return;
    } else if (!parseInt(code)) {
      Alert.alert('Invalid Pin', 'Pin may only contain numbers.');
      setCode("");
      return;
    } else if (!selectedUser) {
      Alert.alert('No User', 'A user must be selected to log in.');
      return;
    }
    try{
      const credentials = {
        username: selectedUser.username,
        pin: code
      }

      const response = await fetch(`${connection}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });
  
      if (!response.ok) {
        const error = await response.json();
        Alert.alert('Login Failed', 'Incorrect username and pin combination');
        console.error('Response error',error.msg);
        return;
      }
  
      const data = await response.json();

      if (data.success) {
        setUser(selectedUser)
        goTo('/'); //This has gotta be tidied up
      } else {
        ShowError(error.msg);
        console.error('Error', data.msg);
      }
    } catch(err) {
      console.error(`Server error`, err)
      ShowError(`There was a problem logging in. Please check your network connection and try again.`)
    }
  }

  //Handle dropdown animation
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);

  //On mount
  useEffect(() => {
    PopulateUsers();
  }, []);


  return (
  <SafeAreaView style={styles.container}>
    <View style={{flex:1,flexDirection:'row'}}>
      <View style={{flex:1,marginVertical:'auto'}}>
        {selectedUser ? (
          <View>
            <View style={{flexDirection:'row', justifyContent:'center', marginVertical:'auto'}}>
              <Avatar.Image size={60} style={{marginVertical:'auto'}} source={{ uri: selectedUser.image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541' }} />
              <Text variant='headlineSmall' style={{marginVertical:'auto', paddingHorizontal:'10%'}}>{selectedUser.name}</Text>
              <IconButton
                  icon="close-circle"
                  iconColor='#000000'
                  style={{marginVertical:'auto'}}
                  onPress={() => setSelectedUser(null)}
                />
            </View>
          </View>
        ) : ( null )}
      </View>
      <View style={{flex:1, marginVertical:'5%',justifyContent:'space-between'}}>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <Image 
          source={{uri: 'https://www.sydneycityguide.com.au/img/listings/babas-place-marrickville.jpg'}}
          style={{width: 100, height: 100, borderWidth:0.5, borderColor:'#808080',borderRadius:999}} />
        </View>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <Text variant="displayLarge" style={styles.header}>Log In</Text>
        </View>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <TextInput
                        value={usersLoading ? <LoadingIndicator /> : code}
                        inputMode='none'
                        style={{width: '80%',
                          borderRadius: 999,
                          textAlign:'center',
                          height: 75,
                          borderWidth: 0.5,
                          margin: '1%',
                          fontSize:45}}
                      />
        </View>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          <DialpadKeypad code={code} setCode={setCode} enter={() => tryLogin()}/>
        </View>
      </View>   
      <View style={{flex:1,marginVertical:'auto'}}>
    {usersLoading ? (
          <LoadingIndicator />
        ) : (
        <List.Section          
        style={{
            margin:'10%',
          }}
        >
          <List.Accordion
            title={<Text variant='headlineSmall'>Users</Text>}
            left={props => <List.Icon {...props} icon="account-group" />}
            expanded={expanded}
            onPress={handlePress}
            background='#fffff'
            style={
              { backgroundColor:'#fffff',
                borderRadius:999
              }
            }
            titleStyle={
              { color:'#fffff'
              }
            }>
              <ScrollView>
                {users.map((user, index) => (
                  <List.Item
                    key={index}
                    left={props => <Avatar.Image size={50} source={{ uri: user.image || 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541' }} />}
                    title={<Text variant="bodyLarge">{user.username}</Text>}
                    description={user.name}
                    onPress={() => {setSelectedUser(user), setExpanded(false)}}
                  />
                ))}
              </ScrollView>
          </List.Accordion>
        </List.Section>
        )

        }  
      </View>
    </View>      
  </SafeAreaView>
  
)};

export default Login;