import React, { useState } from 'react'

import { ActionIcon, List, Group, Text, Box, Grid, Divider, Col } from '@mantine/core'
import { CircleCheck, Circle, Trash, Square, Checkbox } from 'tabler-icons-react';
import DeleteTask from './DeleteTask';

interface TaskProps {
    name: string
    completed: boolean
    id: number
    setFetchTasksFlag: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Task({
    name,
    completed,
    id,
    setFetchTasksFlag
}: TaskProps) {

    const [taskStatus, setTaskStatus] = useState(completed)
    const [deleteTaskOpen, setDeleteTaskOpen] = useState(false);

    const renderIcon = (
        completed: boolean
    ) => {
        if (completed) {
            return <Checkbox size={18} color="blue" />
        } else {
            return <Square size={18} />
        }
    }

    const toggleComplete = () => {
        setTaskStatus(!taskStatus)
        fetch(`http://localhost:3001/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('tuduUserToken')
            },
            body: JSON.stringify({task: {
                completed: !taskStatus
            }})
        })
    }

    return (
        <>
        <DeleteTask 
            opened={deleteTaskOpen}
            setOpened={setDeleteTaskOpen}
            id={id}
            setFetchTasksFlag={setFetchTasksFlag}
        />
        <Grid>
            <Col span="content">
                <ActionIcon
                    ml={5}
                    onClick={toggleComplete}
                >
                    {renderIcon(taskStatus)}
                </ActionIcon>
            </Col>
            <Col span={10}>
                <Text
                    lineClamp={1}
                >
                    {name}
                </Text>
            </Col>
            <Col span="content">
                <ActionIcon
                    color="red" 
                    variant="outline"
                    onClick={() => setDeleteTaskOpen(true)}
                >
                    <Trash size={18} />
                </ActionIcon>
            </Col>
        </Grid>        
        </>


    )
}
