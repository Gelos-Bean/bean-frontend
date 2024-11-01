import { useState } from 'react';
import { View, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { connection } from '../../config/config.json';

import Header from '../../components/Header.jsx';
import styles from '../../styles/posStyles.js';
import ViewAllTabs from './ViewAllTabs.jsx';
import ViewOneTab from './ViewOneTab.jsx';


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
          {selectView ? (
            <ViewOneTab 
              tabId={ selectView } 
              onExit={ handleViewAllTabs } 
            />
            ) : <ViewAllTabs onSelectTab={ handleSelectedTab } />
          }
        </View>
      </View>
    </View> 
  );
};