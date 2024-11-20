import React, { useState, useEffect } from 'react';
import {
  View,
  SafeAreaView,
  TextInput,
  Image
} from 'react-native';
import { 
  Text, 
 } from 'react-native-paper';

import { connection } from '../config/config.json';
import styles from '../styles/posStyles';
import DialpadKeypad from '../components/Numpad.jsx';


const Login = () => {
  
  const [code, setCode] = useState(""); 

  return (
  <SafeAreaView style={styles.container}>
    <View style={{marginVertical:'auto'}}>
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
                      value={code}
                      style={{width: '25%',
                        borderRadius: 999,
                        textAlign:'center',
                        height: 75,
                        borderWidth: 0.5,
                        margin: '1%',
                        fontSize:45}}
                    />
      </View>
      <View style={{flexDirection:'row', justifyContent:'center'}}>
        <DialpadKeypad code={code} setCode={setCode} />
      </View>
    </View>      
  </SafeAreaView>
  
)};

export default Login;