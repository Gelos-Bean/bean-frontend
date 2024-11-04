import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { DataTable, Text, Checkbox, IconButton } from 'react-native-paper';
import { connection } from '../../config/config.json';

import styles from '../../styles/posStyles.js';
import Payment from '../../components/tab/Payment.jsx';
import PaymentOptions from '../../components/modals/payOptions.jsx';
import UserInput from '../../components/modals/userInput.jsx'

export default function ViewOneTab({ tabId, onExit }) {
    const headers = ["Products", "Quantity", "Cost", "Select"];
   
    const [tabItems, setTabItems] = useState({});
    const [checked, setChecked] = useState({});
    const [paidItems, setPaidItems] = useState([]);
    const [remaining, setRemaining] = useState(0.00);
    const [toPay, setToPay] = useState(0.00);

    const [inputView, setInputView] = useState(false); 
    const [paymentOptions, setPaymentOptions] = useState(false);


    useEffect(() => {
        getTabData(tabId);
    }, []);

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

    async function deleteTab() {
        try { 
            const response = await fetch(`${connection}/table/${tabId}`, {
                method: 'DELETE'
            });
            const data = await response.json();
             
            if (!data.success) {
                return Alert.alert(`Error: ${data.msg}`)
            }

            Alert.alert(`${data.msg}`);
        } catch (err) {
            Alert.alert(`Error: ${err.message}`);
        }
    }

    function formatTime(formatDate) {
        const date = new Date(formatDate);
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleTimeString([], options);
    }

    function handleCheckbox(item, cost, qty) {
        setChecked(prevState => ({
            ...prevState,
            [item]: !prevState[item]
        }));

        let totalCost = qty > 1 ? cost * qty : cost;

        const updateToPay = checked[item] ? toPay - totalCost : toPay + totalCost;
        const updateRemaining = checked[item] ? remaining + totalCost : remaining - totalCost;

        setToPay(parseFloat(updateToPay.toFixed(2)));
        setRemaining(parseFloat(updateRemaining.toFixed(2)));
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
                                                    onPress={() => handleCheckbox(index, prod.item.price, prod.quantity)}
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
                                                    <Text variant='bodySmall' style={tStyles.prodOptions}>{`$ ${op.price.toFixed(2)}`}</Text>
                                                </DataTable.Cell>
                                                <DataTable.Cell>
                                                <Checkbox
                                                    color={paidItems[index] ? '#d3d3d3' : '#9c404d'}
                                                    uncheckedColor='#767676'
                                                    status={checked[`option-${index}-${opIndex}`] ? 'checked' : 'unchecked'}
                                                    onPress={() => handleCheckbox(`option-${index}-${opIndex}`, op.price)}
                                                    disabled={paidItems[index]}
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
                        total={tabItems.total}
                        remaining={remaining}
                        toPay={toPay}

                        setInputView={setInputView}
                        setPaymentOptions={setPaymentOptions}
                        setRemaining={setRemaining}
                        setToPay={setToPay}
                    />
                </View>
            </View>

            <PaymentOptions 
                disableItems={disableOncePaid}

                remaining={remaining}
                toPay={toPay}
                visibility={paymentOptions}

                setRemaining={setRemaining}
                setToPay={setToPay}
                setVisibility={setPaymentOptions}
            />

            <UserInput 
                visibility={inputView}
                setVisibility={setInputView}

                title="Custom Amount"
                keyboard="numeric"
                placeholder=""
                setValue={setToPay}
            />
            
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
