import React, { useState, useEffect } from 'react';
import { 
  Alert, 
  Modal, 
  View, 
  TextInput, 
  ScrollView 
} from 'react-native';
import { 
  Button, 
  Text, 
  IconButton, 
  List,
  SegmentedButtons,
  Checkbox
} from 'react-native-paper';

import styles from '../../styles/modalStyles';
import { connection } from '../../config/config.json';


const SalesReportModal = ({ visible, onDismiss, reports, todaysReport, printReport }) => {

  if (reports.length >= 0 && !todaysReport) {
    return;
  }

  const [selectedReport, setSelectedReport] = useState(todaysReport)

  const handleAdd = () => {
    printReport(selectedReport);
    onDismiss();
  }
  const handleDismiss =  () => {
    onDismiss();
  }

  const [expanded, setExpanded] = useState(true);
  const handlePress = () => setExpanded(!expanded);

  return (
    <Modal animationType="slide" transparent={true} visible={visible} onDismiss={onDismiss}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, { width: '60%', height:'70%' }]}>
          <Text variant="headlineMedium" style={styles.modalText}>Reports</Text>
            <View style={{ flexDirection: 'row', flex:1 }}>
              <View style={{ flex: 1, marginHorizontal: '1%', justifyContent:'flex-start'}}>
                {reports.length > 0 ? (
                  <List.Section
                    style={{
                      margin:'10%',
                      paddingVertical: 0,
                      paddingHorizontal: 0,
                      marginHorizontal: 0,
                      marginVertical: 0,
                    }}>
                      <List.Accordion
                        title={<Text variant='labelLarge'>Sales Reports</Text>}
                        left={props => <List.Icon {...props} icon="chart-box" />}
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
                          <ScrollView style={{height:'80%'}}>
                            {reports.map((report, index) => (
                              <List.Item
                                key={index}
                                title={<Text variant="bodyLarge">{report.date}</Text>}
                                description={`$${report.total}`}
                                onPress={() => setSelectedReport(report)}
                                />
                              ))}
                          </ScrollView>
                      </List.Accordion>
                  </List.Section>
                ) : (null)}
              </View>
              <View style={{ flex: 1, marginHorizontal: '1%' }}>
              <Text variant="bodyLarge" style={{marginHorizontal:'1%'}}>Report for</Text>
              <Text variant="titleLarge" style={{marginHorizontal:'1%',marginBottom:'5%'}}>{selectedReport.date}</Text>                

                <View style={styles.widgetContainer}>
                  <IconButton
                      icon="chef-hat"
                      mode="default"
                      iconColor="rgb(255, 255, 255)"
                      selected={true}
                      size={50}
                      style={{alignSelf:'center'}}
                    />
                    <Text variant='headlineSmall' style={styles.widgetText}>$ {selectedReport.totalFood}</Text>
                  </View>
                  <View style={styles.widgetContainer}>
                      <IconButton
                          icon="glass-mug-variant"
                          mode="default"
                          iconColor="rgb(255, 255, 255)"
                          selected={true}
                          size={50}
                          style={{alignSelf:'center'}}
                        />
                        <Text variant='headlineSmall' style={styles.widgetText}>$ {selectedReport.totalBev}</Text>
                    </View>               
                  <View style={styles.widgetContainer}>
                      <IconButton
                          icon="food-fork-drink"
                          mode="default"
                          iconColor="rgb(255, 255, 255)"
                          selected={true}
                          size={50}
                          style={{alignSelf:'center'}}
                        />
                        <Text variant='headlineSmall' style={styles.widgetText}>$  {selectedReport.total}</Text>
                  </View> 
                </View>
              </View>
            <View style={styles.bottomButtonRow}>
              <Button
                style={[styles.squareButton, styles.wideButton]}
                mode="contained"
                icon="window-close"
                onPress={handleDismiss}
              >
                Close
              </Button>
              <Button
                style={[styles.squareButton, styles.wideButton]}
                mode="contained"
                icon="printer"
                onPress={handleAdd}
              >
                Export Report
              </Button>
            </View>
          </View>
      </View>
    </Modal>
  );
};

export default SalesReportModal;
