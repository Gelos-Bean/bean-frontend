import { useState, useEffect } from 'react';
import { View, Text, Pressable } from 'react-native';
import { DataTable } from 'react-native-paper';

export default function ViewOneTab({ tabId, onExit }) {
    const [tabItems, setTabItems] = useState({});

    useEffect(() => {
        getTabData(tabId);
    },[])

    async function getTabData(id) {
        try {
            const response = await fetch(`http://localhost:8080/tables/${id}`)
            const tabData = await response.json();

            if(!tabData.success) {
                return console.log("Error loading tab " + tabData.msg);              
            }

            setTabItems(tabData.msg);

        } catch (err) {
            console.log(err.message);
        }
    }

    
    return (
        <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <Text>Table #{tabItems.tableNo}</Text>
                <Pressable 
                    onPress={() => {onExit()}}
                    >X</Pressable>
            </View>
            <View>
                <Text>Arrival: {tabItems.openedAt}</Text>
                <Text>PAX: {tabItems.pax}</Text>
                <Text>Total: {tabItems.total}</Text>
            </View>


            <DataTable>
                <DataTable.Header>
                    <DataTable.Title><Text>Products</Text></DataTable.Title>
                    <DataTable.Title><Text>Quantity</Text></DataTable.Title>
                    <DataTable.Title><Text>Cost</Text></DataTable.Title>
                    
                </DataTable.Header>
                {tabItems.products && tabItems.products.length > 0 && tabItems.products.map((prod, index) => {
                    return (
                        <>
                            <DataTable.Row key={index}>
                                <DataTable.Cell><Text>{prod.item.name}</Text></DataTable.Cell>
                                <DataTable.Cell><Text>{prod.quantity}</Text></DataTable.Cell>
                                <DataTable.Cell><Text>{`$${prod.item.price}`}</Text></DataTable.Cell>
                            </DataTable.Row>

                            {prod.selectedOptions.length > 0 && 
                                prod.selectedOptions.map((op, i) => (
                                <DataTable.Row key={i}>
                                    <DataTable.Cell>
                                        <Text style={{ fontSize: 12}}>{`\t${op.name}`}</Text>
                                    </DataTable.Cell>
                                    <DataTable.Cell></DataTable.Cell>
                                    <DataTable.Cell>
                                        <Text style={{fontSize: 12}}>{`$${op.price}`}</Text>
                                    </DataTable.Cell>
                                </DataTable.Row>
                                ))
                            }
                            
                        </>
                        )
                    })
                }
            </DataTable>
        </View>
    )
}