import { useState } from 'react';
import { View, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { connection } from '../../config/config.json';

import Header from '../../components/Header.jsx';
import styles from '../../styles/posStyles.js';
import ViewAllTabs from './ViewAllTabs.jsx';
import ViewOneTab from './ViewOneTab.jsx';
import Payment from '../../components/tab/Payment.jsx';
import TabBtnMenu from '../../components/tab/TabBtnMenu.jsx';


const Separator = () => <View style={styles.separator} />;


export default function Tabs(){

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
            <View style={{flex: 3}}>
                <Payment />
            </View>
            <View>
              <TabBtnMenu />
            </View>
          </View>
        </View>
      </View>
    </View> 
  );
};