import { useState, useEffect } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { DataTable, Checkbox } from 'react-native-paper';

const connection = 'http://localhost:8080';
//'http://10.0.2.2:8080'

export default function ViewOneTab({ tabId, onExit }) {
    const headers = ["Products", "Quantity", "Cost", "Select"];


    const [tabItems, setTabItems] = useState({});
    const [checked, setChecked] = useState({});


    useEffect(() => {
        getTabData(tabId);
    },[])

    async function getTabData(id) {
        try {
            const response = await fetch(`${connection}/tables/${id}`)
            const tabData = await response.json();

            if(!tabData.success) {
                return console.log("Error loading tab " + tabData.msg);              
            }

            setTabItems(tabData.msg);

        } catch (err) {
            console.log(err.message);
        }
    }

    function formatTime(formatDate) {
        const date = new Date(formatDate);
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleTimeString([], options);
      }

      function handleCheckbox(tabId){
        setChecked({tabId});
      }
    
    return (
        <View>
            <View style={styles.header}>
                <Text>Table #{tabItems.tableNo}</Text>
                <Pressable onPress={() => {onExit()}}><Text>X</Text></Pressable>
            </View>
            <View style={styles.header}>
                <Text>Arrival: {tabItems.openedAt ? formatTime(tabItems.openedAt) : "" }</Text>
                <Text>PAX: {tabItems.pax}</Text>
                <Text>Total: ${tabItems.total}</Text>
            </View>


            <DataTable>

                <DataTable.Header>
                    {headers.map((header, index) => (                  
                        <DataTable.Title key={index}>
                            <Text>{header}</Text>
                        </DataTable.Title>
                    ))}            
                </DataTable.Header>

                    
                {tabItems.products && tabItems.products.length > 0 ? ( tabItems.products.map((prod, index) => {
                    return (
                        <>
                            <DataTable.Row key={index}>
                                <DataTable.Cell><Text>{prod.item.name}</Text></DataTable.Cell>
                                <DataTable.Cell><Text>{prod.quantity}</Text></DataTable.Cell>
                                <DataTable.Cell><Text>{`$${prod.item.price}`}</Text></DataTable.Cell>
                                <DataTable.Cell>
                                    <Checkbox 
                                        status={'unchecked'}
                                        onPress={() => {
                                            handleCheckbox(index);
                                        }}/>
                                </DataTable.Cell>
                            </DataTable.Row>

                            {prod.selectedOptions.length > 0 && 
                                prod.selectedOptions.map((op, i) => (
                                <DataTable.Row key={`${index}-${i}`}>
                                    <DataTable.Cell>
                                        <Text style={{ fontSize: 12}}>{`\t${op.name}`}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                    <DataTable.Cell>
                                        <Text style={{fontSize: 12}}>{`$${op.price}`}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell><Checkbox 
                                        status={'unchecked'}
                                        onPress={() => {
                                            handleCheckbox(index);
                                        }}/>
                                    </DataTable.Cell>
                                </DataTable.Row>
                                ))
                            }
                            
                        </>
                        )
                    })) : null 
                }
            </DataTable>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',

        paddingStart: 20,
        paddingEnd: 30,
        marginTop: 10,
        marginBottom: 10
    }
})