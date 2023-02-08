import React, { useEffect, useState, useContext } from 'react';
import Authstack from './Authstack';
import Homestack from './Homestack';
import { UserContext } from '../../App';

export default function AppNavigation() {

    const { loggedIn } = useContext(UserContext);

    const [isloggedIn, setisLoggedIn] = useState("");

    useEffect(() => {
        fetch('http://192.168.244.26:3000/api/login-status')
            .then(response => response.json())
            .then(data => {
                setisLoggedIn(data.loggedIn);
            });
    }, [loggedIn]);

    return <>{isloggedIn ? <Homestack /> : <Authstack />}</>
}