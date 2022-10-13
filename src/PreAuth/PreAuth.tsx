import React, { useState } from 'react'
import { Stack, Title, Text } from '@mantine/core';

import Login from './containers/Login'
import SignUp from './containers/SignUp'

import {ComponentViews} from './preAuthInterfaces'

interface PreAuthProps {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function PreAuth({
    setLoggedIn
}: PreAuthProps) {

    const [componentViewName, setComponentViewName] = useState<keyof ComponentViews>('login');

    const componentViews: ComponentViews = {
        "signup": <SignUp 
                    setComponentViewName={setComponentViewName}
                    setLoggedIn={setLoggedIn}
                />,
        "login": <Login 
                    setComponentViewName={setComponentViewName} 
                    setLoggedIn={setLoggedIn}
                />
    }

    const renderView = (
        componentViewName: keyof ComponentViews, 
        componentViews: ComponentViews
        ) => {
        return componentViews[componentViewName]
    }
    return (
        <Stack
            align="center" 
            spacing="sm"
        >
            <Title order={1}>Welcome to Tudu</Title>
            <Text>Please login</Text>
            {renderView(componentViewName, componentViews)}
        </Stack>
    )
}
