import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { DataTable, Text, Checkbox, IconButton } from 'react-native-paper';
import { connection } from '../../config/config.json';

import styles from '../../styles/posStyles.js';
import Payment from '../../components/tab/Payment.jsx';

export default function ViewOneTab({ tabId, onExit }) {
    const headers = ["Products", "Quantity", "Cost", "Select"];
   
    const [tabItems, setTabItems] = useState({});
    const [checked, setChecked] = useState({});
    const [paidItems, setPaidItems] = useState([]);
    const [remaining, setRemaining] = useState(Math.max(0, 0.00));
    const [toPay, setToPay] = useState(Math.max(0, 0.00));

    useEffect(() => {
        getTabData(tabId);
    }, []);

    // setRemaining to tabTotal after data is received
    useEffect(() => {
        if (tabItems.total) {
          setRemaining(parseFloat(tabItems.total).toFixed(2));
        }
      }, [tabItems.total]);


    async function getTabData(id) {
        try {
            const response = await fetch(`${connection}/tables/${id}`);
            const tabData = await response.json();

            if (!tabData.success) {
                return Alert.alert("Error loading tab " + tabData.msg);
            }

            setTabItems(tabData.msg);

        } catch (err) {
            Alert.alert(`Error: ${err.message}`);
        }
    }

    function formatTime(formatDate) {
        const date = new Date(formatDate);
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleTimeString([], options);
    }

    function handleCheckbox(item, cost, qty, options) {
        setChecked(prevState => ({
            ...prevState,
            [item]: !prevState[item]
        }));

        let itemCost = qty > 1 ? cost * qty : cost;
        if (options){
            options.forEach(op => itemCost += op.price);
        }

        const isChecked = !checked[item];

        const updateToPay = isChecked ? toPay + itemCost : toPay - itemCost;
        const updateRemaining = isChecked ? remaining - itemCost : remaining + itemCost;
        setToPay(parseFloat(updateToPay));
        setRemaining(parseFloat(updateRemaining));
    }


    function disableOncePaid() {
        const updatedPaidItems = { ...paidItems, ...checked };
        setPaidItems(updatedPaidItems);
    }


    
    return (
        <>
            <View style={styles.mainContainer}>
                <ScrollView style={{flexDirection: 'column'}}> 
                    <View style={tStyles.header}>
                        <Text variant='displaySmall'>Table #{tabItems.tableNo}</Text>
                        <IconButton style={[styles.squareButton, {}]}
                            icon="close"
                            mode="contained"
                            selected={true}
                            size={20}
                            onPress={onExit}
                        />
                    </View>
                    <View style={tStyles.titleRow}>
                        <Text variant='titleSmall'>Arrival: {tabItems.openedAt ? formatTime(tabItems.openedAt) : "" }</Text>
                        <Text variant='titleSmall'>PAX: {tabItems.pax}</Text>
                        <Text variant='titleSmall'>Total: ${parseFloat(tabItems.total).toFixed(2)}</Text>
                    </View>

                    <DataTable>
                        <DataTable.Header>
                            {headers.map((header, index) => (                  
                                <DataTable.Title key={index}>
                                    <Text variant='bodyMedium'>{header}</Text>
                                </DataTable.Title>
                            ))}            
                        </DataTable.Header>

                        {tabItems.products && tabItems.products.length > 0 && 
                            tabItems.products.map((prod, index) => {
                                return (
                                    <View key={index}>
                                        <DataTable.Row
                                            key={index}
                                            style={{ backgroundColor: paidItems[index] ? '#f0f0f0' : 'transparent' }}
                                        >
                                            <DataTable.Cell>
                                                <Text variant='bodyMedium'>{prod.item.name}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell>
                                                <Text variant='bodyMedium'>{prod.quantity}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell>
                                                <Text variant='bodyMedium'>{`$${parseFloat(prod.item.price).toFixed(2)}`}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell>
                                                <Checkbox
                                                    color={paidItems[index] ? '#d3d3d3' : '#9c404d'}
                                                    uncheckedColor='#767676'
                                                    status={checked[index] ? 'checked' : 'unchecked'}
                                                    onPress={() => {
                                                        handleCheckbox(index, prod.item.price, prod.quantity, prod.selectedOptions)}
                                                    }
                                                    disabled={paidItems[index]}
                                                />

                                            </DataTable.Cell>
                                        </DataTable.Row>

                                        {prod.selectedOptions.length > 0 && prod.selectedOptions.map((op, opIndex) => (
                                            <DataTable.Row key={opIndex}>
                                                <DataTable.Cell>
                                                    <Text variant='bodySmall' style={tStyles.prodOptions}>{`\t${op.name}`}</Text>
                                                </DataTable.Cell>
                                                <DataTable.Cell></DataTable.Cell>
                                                <DataTable.Cell>
                                                    <Text variant='bodySmall' style={tStyles.prodOptions}>{`$ ${parseFloat(op.price).toFixed(2)}`}</Text>
                                                </DataTable.Cell>
                                                <DataTable.Cell>
                                                
                                                </DataTable.Cell>
                                            </DataTable.Row>
                                        ))}
                                    </View>
                                )
                            })
                        }
                    </DataTable>
                </ScrollView>
            </View>
            <View style={styles.rightContainer}>
                <View style={{flex: 3}}>
                    <Payment 
                        total={tabItems.total}
                        remaining={remaining}
                        toPay={toPay}

                        setRemaining={setRemaining}
                        setToPay={setToPay}
                        disableOncePaid={disableOncePaid}
                    />
                </View>
            </View>

           
            
        </>
    );
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
    titleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingStart: 20,
        paddingEnd: 30,
        marginTop: 10,
        marginBottom: 10,
    },
    prodOptions: { 
        color: '#767676',
    }
});


/**<Checkbox
                                                    color={paidItems[index] ? '#d3d3d3' : '#9c404d'}
                                                    uncheckedColor='#767676'
                                                    status={checked[`option-${index}-${opIndex}`] ? 'checked' : 'unchecked'}
                                                    onPress={() => handleCheckbox(`option-${index}-${opIndex}`, op.price)}
                                                    disabled={paidItems[index]}
                                                /> */