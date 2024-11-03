import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { DataTable, Checkbox, IconButton } from 'react-native-paper';
import { connection } from '../../config/config.json';
import styles from '../../styles/posStyles.js';
import Payment from '../../components/tab/Payment.jsx';


export default function ViewOneTab({ tabId, onExit }) {
    const headers = ["Products", "Quantity", "Cost", "Select"];
   
    const [tabItems, setTabItems] = useState({});
    const [checked, setChecked] = useState({});
    const [paySelect, setPaySelect] = useState(0.00);
    const [total, setTotal] = useState(0.00);

    useEffect(() => {
        getTabData(tabId);
    },[tabId])

    useEffect(() => {
        if (tabItems && tabItems.total) {
            setTotal(Number(tabItems.total.toFixed(2)));
        }
    }, [tabItems]);


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

    function handleCheckbox(item, cost, qty){
        setChecked(prevState => ({
            ...prevState,
            [item] : !prevState[item]
        }))


        let selected = paySelect;

        if(qty > 1) {
            cost *= qty;
        }

        checked[item] ? Number(selected -= cost) : Number(selected += cost);  
        setPaySelect(selected);
    }
    
    return (
        <>
            <View style={styles.mainContainer}>
                <ScrollView style={{flexDirection: 'column'}}> 
                <View style={tStyles.header}>
                        <Text style={tStyles.tableNum}>Table #{tabItems.tableNo}</Text>
                        <IconButton style={[styles.squareButton, {}]}
                            icon="close"
                            mode="contained"
                            selected={true}
                            size={20}
                            onPress={() => { onExit() }}
                        />
                    </View>
                    <View style={tStyles.titleRow}>
                        <Text style={tStyles.titleText}>Arrival: {tabItems.openedAt ? formatTime(tabItems.openedAt) : "" }</Text>
                        <Text style={tStyles.titleText}>PAX: {tabItems.pax}</Text>
                        <Text style={tStyles.titleText}>Total: ${total.toFixed(2)}</Text>
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
                                <View key={index}>
                                    <DataTable.Row key={index}>
                                        <DataTable.Cell><Text>{prod.item.name}</Text></DataTable.Cell>
                                        <DataTable.Cell><Text>{prod.quantity}</Text></DataTable.Cell>
                                        <DataTable.Cell><Text>{`$${prod.item.price.toFixed(2)}`}</Text></DataTable.Cell>
                                        <DataTable.Cell>
                                            <Checkbox 
                                                status={checked[index] ? 'checked' : 'unchecked'}
                                                onPress={() => handleCheckbox(index, prod.item.price, prod.quantity)}
                                            />
                                        </DataTable.Cell>
                                    </DataTable.Row>

                                    {prod.selectedOptions.length > 0 && 
                                        prod.selectedOptions.map((op, opIndex) => (
                                        <DataTable.Row key={opIndex}>
                                            <DataTable.Cell>
                                                <Text style={{ fontSize: 12}}>{`\t${op.name}`}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell></DataTable.Cell>
                                            <DataTable.Cell>
                                                <Text style={{fontSize: 12}}>{`$ ${op.price.toFixed(2)}`}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell>
                                            <Checkbox 
                                                status={checked[`option-${index}-${opIndex}`] ? 'checked' : 'unchecked'}
                                                onPress={() => handleCheckbox(`option-${index}-${opIndex}`, op.price)}
                                            />
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                        ))
                                    }
                                    
                                </View>
                                )
                            })) : null 
                        }
                    </DataTable>
                </ScrollView>
            </View>
            <View style={styles.rightContainer}>
                <View style={{flex: 3}}>
                    <Payment 
                        paySelect={ paySelect }
                        total = { total }

                    />
                </View>
            </View>
        </>
    )
}

const tStyles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingStart: 20,
        paddingEnd: 30,
        marginTop: 10,
        marginBottom: 10,
        alignItems: 'center',
    },
    tableNum: {
        fontSize: 28
    },
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingStart: 20,
        paddingEnd: 30,
        marginTop: 10,
        marginBottom: 10,
    },
    titleText: {
        fontSize: 16,
    }
});