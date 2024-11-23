import { useState, useEffect } from 'react';
import { View } from 'react-native';

import styles from '../../styles/posStyles.js';
import ViewAllTabs from './ViewAllTabs.jsx';
import ViewOneTab from './ViewOneTab.jsx';
import { useLocalSearchParams } from 'expo-router';

export default function Tabs() {;
  const { id } = useLocalSearchParams(); 
  const [selectView, setSelectView] = useState(null);

  useEffect(() => {
    if (id) {
      handleSelectedTab(Number(id));
    }
  }, [id]);


  const handleSelectedTab = (tabNo) => {
    setSelectView(tabNo);
  };

  const handleViewAllTabs = () => {
    setSelectView(null);
  };

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={{ flexDirection: 'row', flex: 1 }}>
          {selectView ? (
            <ViewOneTab tabId={selectView} onExit={handleViewAllTabs} />
          ) : (
            <ViewAllTabs onSelectTab={handleSelectedTab} />
          )}
        </View>
      </View>
    </View>
  );
}