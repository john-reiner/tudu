import React, { useState } from 'react'
import { PasswordInput, TextInput, Stack, Group, Anchor, Button } from '@mantine/core';
import { At, Lock } from 'tabler-icons-react';

import {ComponentViews} from '../preAuthInterfaces'

interface SignUpProps {
    setComponentViewName: React.Dispatch<React.SetStateAction<keyof ComponentViews>>,
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export default function SignUp({
    setComponentViewName,
    setLoggedIn
}: SignUpProps) {

    const [newUser, setNewUser] = useState({
        email: "",
        password: "",
        password_confirmation: ""
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement>
        ) => setNewUser({...newUser, [e.target.name]: e.target.value})

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
        ) => {
        e.preventDefault()
        fetch('http://localhost:3001/api/v2/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({user: newUser})
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'ok') {
                localStorage.setItem('tuduUserToken', data.message)
                setLoggedIn(true)
            }
            if (data.errors) {
                console.error(data.errors)
            }

        });        
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} style={{textAlign: "left"}}>
            <Stack>
                <TextInput
                    label="Email"
                    icon={<At />}
                    placeholder="example@provider.com"
                    required
                    value={newUser.email} 
                    onChange={handleChange}
                    name={'email'}
                    // error={renderError(errors, 'email')}
                />
                <PasswordInput
                    label="Password"
                    placeholder="Password"
                    required
                    icon={<Lock size={16} />}
                    name={'password'} 
                    value={newUser.password} 
                    onChange={handleChange}
                    // error={renderError(errors, 'password')}
                />       
                <PasswordInput
                    label="Password Confirmation"
                    placeholder="Confirm Password"
                    required
                    icon={<Lock size={16} />}
                    name={'password_confirmation'} 
                    value={newUser.password_confirmation} 
                    onChange={handleChange}
                    // error={renderError(errors, 'password_confirmation')}
                />
                <Group position="apart" mt="md">
                    <Anchor 
                        onClick={() => setComponentViewName("login")}
                    >
                        Login
                    </Anchor>
                    <Button
                        type="submit">
                        Submit
                    </Button>
                </Group>   
            </Stack>
        </form>
    )
}