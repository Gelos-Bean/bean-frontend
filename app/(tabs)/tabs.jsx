import { useState } from 'react';
import { View, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper'

import Header from '../../components/Header.jsx';
import styles from '../../styles/posStyles';
import ViewAllTabs from '../../components/tab/ViewAllTabs.jsx';
import ViewOneTab from '../../components/tab/ViewOneTab.jsx';
import PaymentScreen from '../../components/tab/PaymentScreen.jsx';

const Separator = () => <View style={styles.separator} />;


const App = () => {
  const [selectView, setSelectView] = useState(null);

  const handleSelectedTab = (tabNo) => {
    setSelectView(tabNo);
  }

  const handleViewAllTabs = () => {
    setSelectView(null);
  }

  return (
    <View style={styles.container}>
      <Header title={"Tabs"} 
        location={"Sydney"} 
        username={null} />
      <Separator />
      <View style={styles.body}>
        <View style={{flexDirection: 'row', flex:1}}>
          <View style={styles.mainContainer}>
            <ScrollView style={{flexDirection: 'column'}}> 
              {selectView ? (
                <ViewOneTab tabId={ selectView } onExit={handleViewAllTabs} />
                ) : <ViewAllTabs onSelectTab={handleSelectedTab} />
              }
            </ScrollView>
          </View>     
          <View style={styles.rightContainer}>
            <View style={styles.numpadContainer}>
                <PaymentScreen />
            </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonRow}>
              <View style={styles.displayPortal}>
                  <Text variant='bodySmall'>Tab:</Text>
                  <Text variant='labelLarge'>{null}</Text>
                </View>
              <IconButton style={[styles.squareButton, {}]}
                    icon="plus"
                    iconColor='#ffff'
                    containerColor='rgb(156, 64, 77)'
                    mode="contained"
                    size={30}
                    onPress={() => console.log(`Not yet implemented`)}
                  />
            </View>
            <View style={styles.buttonRow}>
              <View style={styles.buttonText}>
                <IconButton style={styles.squareButton}
                  icon="eye"
                  iconColor='#ffff'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={30}
                  onPress={() => console.log(`Not yet implemented`)}
                />
                <Text variant='bodySmall'>View Tab</Text>
              </View>
              <View style={styles.buttonText}>
                <IconButton style={styles.squareButton}
                  icon="send"
                  iconColor='#ffff'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={30}
                  onPress={() => console.log(`Not yet implemented`)}
                />
                <Text variant='bodySmall'>Call Away</Text>
              </View>
              <View style={styles.buttonText}>
                <IconButton style={styles.squareButton}
                  icon="broom"
                  iconColor='#ffff'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={30}
                  onPress={() => console.log(`Not yet implemented`)}
                />
                <Text variant='bodySmall'>Clear Tab</Text>
              </View>
            </View>
              <View style={styles.buttonRow}>
                <Button style={[styles.squareButton, styles.wideButton]}
                  mode="contained"
                  icon="tag-plus"
                  onPress={() => console.log(`Not yet implemented`)}>              
                  Add Order
                </Button>
                <IconButton style={styles.roundButton}
                  icon="home-roof"
                  iconColor='#ffff'
                  containerColor='rgb(156, 64, 77)'
                  mode="contained"
                  size={30}
                  onPress={() => console.log(`Not yet implemented`)}
                />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View> 
  );
};

export default App; 