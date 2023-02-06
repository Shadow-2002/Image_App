import React from 'react';
import Authstack from './Authstack';
import Homestack from './Homestack';

export default function AppNavigation() {
    return <>{true ? <Homestack /> : <Authstack />}</>
}