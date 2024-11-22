import React, { useState, useContext, useEffect } from 'react';
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

import { AuthContext } from './context/AuthContext.jsx';
import { useRouter } from 'expo-router';
import { connection } from '../config/config.json';
import ShowError from '../components/ShowError.jsx';
import { withTimeout } from '../components/WithTimeout.jsx';
import LoadingIndicator from '../components/LoadingIndicator.jsx';
import styles from '../styles/posStyles';
import DialpadKeypad from '../components/Numpad.jsx';


const Login = () => {
  const { login, authState } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authState.authenticated) router.push('/');
  }, [authState.authenticated]);


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
  
      if (!response.ok)
        return ShowError('Server responded with an error');
  
      const data = await response.json();
  
      if (data.success && Array.isArray(data.msg)) {
        setUsers(data.msg);
      } else {
        ShowError(data.msg);
      }
    } catch (err) {
      ShowError('Failed to load users. Please check your network connection and try again.');
    } finally {
      setUsersLoading(false);
    }
  }


  //Log in
  const [code, setCode] = useState(""); 
  const [selectedUser, setSelectedUser] = useState();
  const [loginLoading, setLoginLoading] = useState(false);
  const [reset, setReset] = useState(false);
  const handleLogin = async () => {
    if (!selectedUser)
      return Alert.alert('Missing Details', 'Please select a user before logging in.');

    try {
      setLoginLoading(true);
      setReset(false);

      await login(selectedUser.username, code);

      setReset(true);

    } catch (error) {
      return Alert.alert('Login error:', error);

    } finally {
      setLoginLoading(false);
      setReset(false);
    }
  };

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
                          fontSize: 45}}
                      />
        </View>
        <View style={{flexDirection:'row', justifyContent:'center'}}>
          { loginLoading ? (
            <LoadingIndicator />
           ) : (
            <DialpadKeypad reset={reset} setReset={setReset} setCode={setCode} enter={handleLogin}/>
           )}
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
            background='#ffffff'
            style={
              { backgroundColor:'#ffffff',
                borderRadius:999
              }
            }
            titleStyle={
              { color:'#ffffff'
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