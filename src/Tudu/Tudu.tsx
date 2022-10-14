import React, { useEffect, useState } from 'react'

import { AppShell, Burger, Button, Group, Header, MediaQuery, Title, useMantineTheme } from '@mantine/core'

import { ChevronDown } from 'tabler-icons-react';

import AllTasks from './components/Tasks/AllTasks'
import { TaskType } from './TuduInterfaces'



type Props = {

}

export default function Tudu({

}: Props) {
    
    const theme = useMantineTheme();
    const [opened, setOpened] = useState(false);
    const [tasks, setTasks] = useState<TaskType[]>([])
    const [fetchTasksFlag, setFetchTasksFlag] = useState(true)

    useEffect(() => {
        if (fetchTasksFlag) {
            fetchAllTasks()
            setFetchTasksFlag(false)
        }
    }, [fetchTasksFlag])
    

    const fetchAllTasks = () => {
        fetch('http://localhost:3001/tasks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('tuduUserToken')
            },
        })
        .then(response => response.json())
        .then(data => {
            setTasks(data)
        });        
    }

    return (
        <AppShell
            padding="xs"
            header={<Header height={60} p="sm">
                <div style={{ display: 'flex', alignItems: 'center', height: '100%', justifyContent: "space-between" }}>
                    <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                    <Burger
                        opened={opened}
                        onClick={() => setOpened((o) => !o)}
                        size="sm"
                        color={theme.colors.gray[6]}
                        mr="xl"
                    />
                    </MediaQuery>
                    {/* <Group 
                        position='apart'
                    > */}
                        <Title
                            style={
                                {
                                    fontFamily: 'Permanent Marker'
                                }
                            }
                            color="blue"
                        >Tudu</Title>
                        <Button 
                            variant="subtle"
                            rightIcon={<ChevronDown />}
                        >
                            Settings@whatever.com
                        </Button>
                    {/* </Group> */}
                </div>
            </Header>}
            styles={(theme) => ({
                main: { backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0] },
            })}
            >
            <AllTasks 
                tasks={tasks}
                setTasks={setTasks}
                setFetchTasksFlag={setFetchTasksFlag}
            />
        </AppShell>
    )
}