import React, { useState } from 'react';
import EventList from './components/EventList';
import Login from './components/Login';
import Register from './components/Register';
import Test from './components/Test2';
import { TokenProvider, useToken } from './TokenContext';
import './App.css';

const AppContent = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showReg, setShowReg] = useState(false);
    const { token, setToken } = useToken();

    const handleLoginClick = () => {
        setShowLogin(!showLogin);
    };

    const handleRegisterClick = () => {
        setShowReg(!showReg);
    };

    const handleLogout = () => {
        setToken('');
    };

    return (
        <div className="App">
            <header className="header">
                <h1 className="headerName">Event Manager</h1>
                <div className="headerButtons">
                    {!token ? (
                        <>
                            <button className="headerButton" onClick={handleRegisterClick}>Sing in</button>
                            <button className="headerButton" onClick={handleLoginClick}>Sing up</button>
                        </>
                    ) : (
                        <button className="headerButton" onClick={handleLogout}>Log Out</button>
                    )}
                </div>
            </header>
            <main className="mainContent">
                <div className="backgroundTest">
                    <Test />
                </div>

                <div className="containerEvent">
                    <EventList />
                </div>

                {showLogin && (
                    <div className="modal">
                        <Login closeModal={handleLoginClick} />
                    </div>
                )}
                {showReg && (
                    <div className="modal">
                        <Register closeModal={handleRegisterClick} />
                    </div>
                )}
            </main>
        </div>
    );
};

const App = () => {
    return (
        <TokenProvider>
            <AppContent />
        </TokenProvider>
    );
};

export default App;
