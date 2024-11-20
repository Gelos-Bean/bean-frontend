import { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { DataTable, Text, Checkbox, IconButton } from 'react-native-paper';
import { connection } from '../../config/config.json';

import styles from '../../styles/posStyles.js';
import Payment from '../../components/tab/Payment.jsx';
import LoadingIndicator from '../../components/LoadingIndicator.jsx';
import ShowError from '../../components/ShowError.jsx';
import ConfirmationModal from '../../components/modals/ConfirmationModal.jsx';
import { withTimeout } from '../../components/WithTimeout.jsx';

export default function ViewOneTab({ tabId, onExit }) {
    const headers = ["Products", "Quantity", "Cost", "Select"];
   
    const [tabItems, setTabItems] = useState({});
    const [checked, setChecked] = useState({});
    const [paidItems, setPaidItems] = useState([]);
    const [remaining, setRemaining] = useState(Math.max(0, 0));
    const [toPay, setToPay] = useState(Math.max(0, 0));
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [loadingTabData, setLoadingTabData] = useState(false);
    const [fullTab, setFullTab] = useState();

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
        setLoadingTabData(true);
        try {
            const response = await withTimeout(fetch(`${connection}/tables/${id}`), 5000);
            const tabData = await response.json();
            if (!tabData.success) {
                ShowError(tabData.msg);
                setLoadingTabData(false);
                return;
            }

            setTabItems(tabData.msg);
            setFullTab(tabData.msg);

        } catch (err) {
            ShowError(err.message);
        } finally {
            setLoadingTabData(false)
        }
    }

    async function deleteTab(rm = false){
        if (rm) {
            await addToSalesHistory();
            try { 
                const response = await fetch(`${connection}/tables/${tabItems._id}`, {
                    method: 'DELETE'
                });
                const res = await response.json();
    
                if(!res) {
                    return ShowError(res.msg);
                }
                onExit();
            } catch (err) {
                ShowError(err.message);
            }   
        }
    }

    async function addToSalesHistory() {
        const report = await findReport();
        if (!report) {
            console.error('Failed to find or create a report.');
            return;
        }
        try{
            const saleToAdd = {
                sales: {
                    tableNo: fullTab.tableNo,
                    openedAt: fullTab.openedAt,
                    pax: fullTab.pax,
                    limit: fullTab.limit,
                    products: [...fullTab.products], 
                    total: fullTab.total
                }
            }
            const response = await fetch(`${connection}/reports/${report._id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(saleToAdd)
              });

              const data = await response.json();

              if (data.success) {

              } else {
                const errorMessage = typeof data.msg === 'string' ? data.msg : 'No reports found';
                ShowError(errorMessage);
                console.error(errorMessage, response.statusText);
              }

        } catch (err) {
            console.error('Error in addToSalesHistory:', err.message);
            ShowError(err.message);
        }
    }

    function formatTime(formatDate) {
        const date = new Date(formatDate);
        const options = { hour: '2-digit', minute: '2-digit', hour12: true };
        return date.toLocaleTimeString([], options);
    }

    async function findReport() {
        const date = getLocalStartOfDay(new Date());
        const formattedDate = `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`;

        try {
            const response = await fetch(`${connection}/reports/${formattedDate}`, {
                method: 'GET'
            });            
            const data = await response.json();
            if (data.success) {
                return data.msg; 
                
                } else {
                    console.log('Adding new report...')
                    const newReport = await addNewReport();
                    if (newReport.success) {
                        const fetchNewResponse = await fetch(`${connection}/reports/${formattedDate}`, {
                            method: 'GET',
                        });    
                        const fetchNewData = await fetchNewResponse.json();
                    if (fetchNewData.success) {
                        console.log(`Newly created report: ${JSON.stringify(fetchNewData.msg)}`);
                        return fetchNewData.msg; 
                    }            
                }
            }
        } catch (err) {
            ShowError(err.message);
        }
        return null; 

    }
    async function addNewReport(){
        try {
            const date = getLocalStartOfDay(new Date());
            const newRecord = {
              date: `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${date.getUTCDate()}`,
            };
            
          const response = await fetch(`${connection}/reports`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newRecord)
          });
      
          const data = await response.json();
    
          if (!response.ok) {
            ShowError(data.msg);
            return { success: false, message: data.msg };
          }
            return { success: true, message: data.msg };
          
        } catch (error) {
          console.error('Request failed:', error);
          ShowError('Failed to add report. Please check your network connection')
          return { success: false, message: 'Failed to add Report. Please check your network connection.' };
        }
    } 

    function getLocalStartOfDay(date) {
        const localDate = new Date(date); //Fixing time zone errors
        localDate.setHours(0, 0, 0, 0); 
        return localDate.toISOString();
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

    function disableItems(all=0) {
        if (all > 0) {
            // disable all items if custom amount is chosen
            const allPaidItems = tabItems.products.reduce((acc, _, index) => {
                acc[index] = true;
                return acc;
            }, {});

            setPaidItems(allPaidItems);
        } else {
            const updatedPaidItems = { ...paidItems, ...checked };
            setPaidItems(updatedPaidItems);
        }
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
                        {loadingTabData ? (
                        <LoadingIndicator />
                        ) : tabItems.products && tabItems.products.length > 0 && 
                            tabItems.products.map((prod, index) => {
                                if (!prod.item) return null;
                                return (
                                    <View key={index}>
                                        <DataTable.Row
                                            key={index}
                                            style={{ backgroundColor: paidItems[index] ? '#f0f0f0' : 'transparent' }}
                                            >
                                            <DataTable.Cell>
                                                <Text variant='bodyMedium'>{prod.item?.name || ""}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell>
                                                <Text variant='bodyMedium'>{prod.quantity || ""}</Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell>
                                                <Text variant='bodyMedium'>
                                                    {prod.item?.price ? `$${parseFloat(prod.item.price).toFixed(2)}` : ""}
                                                </Text>
                                            </DataTable.Cell>
                                            <DataTable.Cell>
                                                {!paidItems[index] ? <Checkbox
                                                    color={paidItems[index] ? '#d3d3d3' : '#9c404d'}
                                                    uncheckedColor='#767676'
                                                    status={checked[index] ? 'checked' : 'unchecked'}
                                                    onPress={() => {
                                                        handleCheckbox(index, prod.item.price, prod.quantity, prod.selectedOptions)}
                                                    }
                                                    disabled={paidItems[index]}
                                                />: null}

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

                        setConfirmDelete={setConfirmDelete}
                        setRemaining={setRemaining}
                        setToPay={setToPay}
                        disableItems={disableItems}
                    />
                </View>
            </View>
            <ConfirmationModal 
                visible={confirmDelete}
                onSelect={deleteTab}
                onDismiss={() => setConfirmDelete(false)}
                title='Close Table?'
                body='This will delete table from view'
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


/**<Checkbox
                                                    color={paidItems[index] ? '#d3d3d3' : '#9c404d'}
                                                    uncheckedColor='#767676'
                                                    status={checked[`option-${index}-${opIndex}`] ? 'checked' : 'unchecked'}
                                                    onPress={() => handleCheckbox(`option-${index}-${opIndex}`, op.price)}
                                                    disabled={paidItems[index]}
                                                /> */