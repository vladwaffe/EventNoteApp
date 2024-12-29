import React, { createContext, useState, useContext } from 'react';

const TokenContext = createContext();

export const TokenProvider = ({ children }) => {
    const [token, setToken] = useState('');

    const getToken = () => {
        return token;
    };

    return (
        <TokenContext.Provider value={{ token, setToken, getToken }}>
            {children}
        </TokenContext.Provider>
    );
};

export const useToken = () => useContext(TokenContext);
