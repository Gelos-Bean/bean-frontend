import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { connection } from '../../config/config.json';
import { jwtDecode } from 'jwt-decode';

import ShowError from '../../components/ShowError.jsx';
import { withTimeout } from '../../components/WithTimeout.jsx';


export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        token: null, 
        authenticated: null
    });

    const [isAdmin, setAdmin] = useState(false);
    const [isManager, setManager] = useState(false);


    const login = async (username, pin, override = false) => {
        if (!username || !pin) {
            return Alert.alert('Missing Details', 'Both username and pin are required to log in.'); 
        }
        
        const credentials = { username, pin };
        const response = await withTimeout(fetch(`${connection}/users/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
        }), 5000);
    
        const data = await response.json();

        if (!data.success)
            return Alert.alert('Login Failed', data?.msg || 'Incorrect username or pin.');

        const decodeToken = jwtDecode(data.token);
        if(!decodeToken)
            return Alert.alert('Authentication failed');
        
        if (!override) {
            setAuthState({ 
                user: decodeToken, 
                token: data.token, 
                authenticated: true 
            });

            const userRoleCheck = decodeToken.role?.toLowerCase();
            userRoleCheck === 'admin' && setAdmin(true);
            userRoleCheck === 'manager' && setManager(true);
        }
    };

    const logout = () => {
        setAuthState({
            user: null,
            token: null,
            authentication: null
        })
        setAdmin(false);
        setManager(false);
    };

    const managerOverride = (mgrName, mgrPin) => { 
        return login(mgrName, mgrPin, override = true) ? true : false
    }

    return (
        <AuthContext.Provider 
                value={{ authState, login, isAdmin, isManager, logout, managerOverride }}>
            {children}
        </AuthContext.Provider>
    )
} 