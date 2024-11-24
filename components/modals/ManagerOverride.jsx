import { useState, useContext, useEffect } from 'react';
import { Modal, View, TouchableWithoutFeedback, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-paper';

import { connection } from '../../config/config.json';
import { AuthContext } from '../../app/context/AuthContext.jsx';
import { withTimeout } from '../WithTimeout.jsx';
import DialpadKeypad from '../Numpad.jsx';
import LoadingIndicator from '../LoadingIndicator.jsx';
import ShowError from '../ShowError.jsx';

import styles from '../../styles/modalStyles.js';

export default function ManagerOverride({ visibility, setVisibility, onDismiss }) {
    const { managerOverride } = useContext(AuthContext);
    const [managerList, setManagerList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [mgr, setMgr] = useState("");
    const [pin, setPin] = useState("");
    const [reset, setReset] = useState(false);
    const [count, setCount] = useState(0);

    useEffect(() => {
        if(visibility) {
            getManagers();
        }
    }, [visibility])

    async function getManagers() { 
        try {
            setLoading(true);
            const response = await withTimeout(fetch(`${connection}/users`), 7000);
            const data = await response.json();

            if(!data.success)
                return ShowError('Could not load manager resources');

            const managers = data.msg.filter(d => d.role === 'Manager');
            setManagerList(managers);
        } catch (err) {
            return ShowError('Error loading managers');
        } finally {
            setLoading(false);
        }
    }

    async function checkAuthorisation() {
        
        if(!mgr || !pin)
            return ShowError('Must select manager & input pin');
            
        const result = await managerOverride(mgr.username, pin);
        
        if (result) {
            setReset(true);
            setMgr(undefined);
            onDismiss(true);
        } else { 
            ShowError('Invalid credentials');
            setReset(true);
        }
    }

    function highlightSelected(item) {
        if (mgr && mgr.name === item.name) {
            setMgr(undefined);
        } else {
            setMgr(item);
        }
    }
    
    return(
        <Modal animationType="slide" transparent={true} visible={visibility}>
            <TouchableWithoutFeedback onPress={() => {
                    setPin("")
                    setMgr(undefined)
                    setVisibility(false)
                }}>
                <View style={styles.centeredView}>
                    <TouchableWithoutFeedback onPress={(e) => { e.stopPropagation() }}>
                        <View style={styles.modalView}>
                            <Text variant='headlineMedium'>Manager Override</Text>
                            {loading ? <LoadingIndicator /> : 
                                Array.isArray(managerList) &&
                                <FlatList 
                                    style={overrideStyles.list}
                                    data={managerList}
                                    keyExtractor={(_, index) => index.toString()}
                                    renderItem={({ item }) => 
                                    <TouchableOpacity 
                                        style={[overrideStyles.managerItem, mgr && overrideStyles.selectedRow]}
                                        onPress={() => {highlightSelected(item)}}>
                                            <Text variant='titleMedium' 
                                                style={mgr && overrideStyles.selectName}>{item.name}</Text>
                                    </TouchableOpacity>
                                }
                            />
                            }
                            <View style={overrideStyles.pincodeContainer}>
                            {pin.length > 0 ? (
                                <Text style={{ fontSize: 20, color: "silver" }}>
                                    {Array(pin.length).fill("*").join("")}
                                </Text>
                            ) : (
                                <Text style={{ fontSize: 16, color: "silver" }}>
                                    Enter PIN
                                </Text>
                            )}
                            </View>
                            <DialpadKeypad 
                                reset={reset}
                                setReset={setReset}
                                setCode={setPin}
                                enter={checkAuthorisation}
                            />
                           
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

const overrideStyles = StyleSheet.create({

    pincodeContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 40,
        height: 60,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'silver',
        color: 'black',
    },
    list: {
        padding: 10,
        marginVertical: 15
    },
    managerItem: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#9c404d',
        flexDirection: 'row', 
        alignItems: 'center',
        padding: 13,
    },
    selectedRow: { 
        backgroundColor: '#a0444c',
        color: '#ffffff'
    },
    selectName: {
        color: '#ffffff'
    }
});