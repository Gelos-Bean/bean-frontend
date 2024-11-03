import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { DataTable, Text, Checkbox, IconButton } from 'react-native-paper';
import { connection } from '../../config/config.json';
import styles from '../../styles/posStyles.js';
import Payment from '../../components/tab/Payment.jsx';

export default function ViewOneTab({ tabId, onExit }) {
    const headers = ["Products", "Quantity", "Cost", "Select"];
   
    const [tabItems, setTabItems] = useState({});
    const [checked, setChecked] = useState({});
    const [paySelect, setPaySelect] = useState(0.00);
    const [remaining, setRemaining] = useState(0.00);
    const [itemPaid, setItemPaid] = useState([]);

    useEffect(() => {
        getTabData(tabId);
    }, [tabId]);

    useEffect(() => {
        if (tabItems && tabItems.total) {
            const total = (parseFloat(tabItems.total) * 100) / 100;
            setRemaining(Number(total.toFixed(2)));
        }
    }, [tabItems]);

    async function getTabData(id) {
        try {
            const response = await fetch(`${connection}/tables/${id}`);
            const tabData = await response.json();

            if (!tabData.success) {
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

    function handleCheckbox(item, cost, qty) {
        if (itemPaid.includes(item)) return;

        setChecked(prevState => ({
            ...prevState,
            [item]: !prevState[item]
        }));

        let selected = paySelect;
        if (qty > 1) {
            cost *= qty;
        }

        selected += checked[item] ? -cost : cost;
        setPaySelect(parseFloat(selected.toFixed(2)));

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
                        <Text variant='titleSmall'>Total: ${parseFloat(remaining).toFixed(2)}</Text>
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
                                const isPaid = itemPaid.includes(index);
                                return (
                                    <View key={index}>
                                        <DataTable.Row
                                            key={index}
                                            style={{ backgroundColor: isPaid ? '#f0f0f0' : 'transparent' }}
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
                                                    status={checked[index] ? 'checked' : 'unchecked'}
                                                    onPress={() => handleCheckbox(index, prod.item.price, prod.quantity)}
                                                    disabled={isPaid} // Disable if paid
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
                                                    <Text variant='bodySmall' style={tStyles.prodOptions}>{`$ ${op.price.toFixed(2)}`}</Text>
                                                </DataTable.Cell>
                                                <DataTable.Cell>
                                                    <Checkbox 
                                                        color='#9c404d'
                                                        uncheckedColor='#767676'
                                                        status={checked[`option-${index}-${opIndex}`] ? 'checked' : 'unchecked'}
                                                        onPress={() => handleCheckbox(`option-${index}-${opIndex}`, op.price)}
                                                        disabled={isPaid}
                                                    />
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
                        remaining={remaining}
                        setRemaining={setRemaining}
                        paySelect={paySelect}
                        itemPaid={setItemPaid}
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
        fontStyle: 'italic',
        color: '#767676',
    }
});
