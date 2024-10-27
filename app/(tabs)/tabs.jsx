import { useState } from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';

import Header from '../../components/Header.jsx';
import styles from '../../styles/posStyles';
import ViewAllTabs from '../../components/tab/ViewAllTabs.jsx';
import ViewOneTab from '../../components/tab/ViewOneTab.jsx';
import PaymentScreen from '../../components/tab/PaymentScreen.jsx';

const App = () => {
  const [selectView, setSelectView] = useState(null);

  const handleSelectedTab = (tabNo) => {
    setSelectView(tabNo);
  }

  const handleViewAllTabs = () => {
    setSelectView(null);
  }

  return (
    <>
      <Header title={"Tabs"} 
        location={"Sydney"} 
        username={null} />


        <View style={{flexDirection: 'row', flex:1}}>

 
        <View style={styles.mainContainer}>
              <ScrollView> 
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
                <View>
                  <Text>Select Tab</Text>
                  <Pressable style={styles.squareButton}>
                    <Text style={styles.pressText}>+</Text>
                  </Pressable>
                </View>

                <View style={{flexDirection: "column"}}>
                  <Pressable style={styles.squareButton}>
                    <Text style={styles.pressText}>View Tab</Text>
                  </Pressable>
                  <Pressable style={styles.squareButton}>
                    <Text style={styles.pressText}>Call Away</Text>
                  </Pressable>
                </View>

                <Pressable style={styles.squareButton}>
                  <Text style={styles.pressText}>Add To Tab</Text>
                </Pressable>
              </View>

              <View style={styles.menuOptions}>
                <Pressable style={styles.squareButton}>
                  <Text style={styles.pressText}>Menu?</Text>
                </Pressable>
                <Pressable style={styles.squareButton}>
                  <Text style={styles.pressText}>Home</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View> 
    </>
  );
};

export default App; 