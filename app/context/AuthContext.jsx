import React, { createContext, useState } from 'react';
import { Alert } from 'react-native';
import { connection } from '../../config/config.json';
import ShowError from '../../components/ShowError.jsx';
import { jwtDecode } from 'jwt-decode';

export const AuthContext = createContext(); 

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        user: null,
        token: null, 
        authenticated: null
    });

    const login = async (username, pin, onSuccess, onError) => {
        if (!username || !pin)
            return Alert.alert('Missing Details', 'Both username and pin are required to log in.');
    
        const credentials = { username, pin };
    
        try {
            const response = await fetch(`${connection}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(credentials),
            });
    
            if (!response.ok) {
                const error = await response.json();
                Alert.alert('Login Failed', error?.msg || 'Incorrect username or pin.');

                if (onError) 
                    return onError(error);
            }
    
            const data = await response.json();
            
            if (data.success) {
                const decodeToken = jwtDecode(data.token);

                if (decodeToken) {
                    setAuthState({
                        user: decodeToken,
                        token: data.token,
                        authenticated: true,
                    });
                }
            
            if (onSuccess) onSuccess(data);
            } else {
                ShowError(data.msg);
                
                if (onError) 
                    return onError(data.msg);
            }
        } catch (err) {
            ShowError('There was a problem logging in. Please check your network connection and try again.');
            console.log(err.message);
            if (onError) 
                return onError(err);
        }
    };

    const logout = () => {
        setAuthState({
        user: null,
        token: null,
        authentication: null
    })};

    return (
        <AuthContext.Provider 
                    value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
} 