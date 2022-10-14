import { ActionIcon, Button, Center, Group, TextInput } from '@mantine/core'
import React, { useState } from 'react'
import { CornerDownLeftDouble } from 'tabler-icons-react';
import { TaskType } from '../../TuduInterfaces'

interface NewTaskProps {
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
    tasks: TaskType[]
}

export default function NewTasks({
    setTasks,
    tasks
}: NewTaskProps) {

    const [taskName, setTaskName] = useState('')

    const handleSubmit = (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()
        fetch("http://localhost:3001/tasks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('tuduUserToken')
            },
            body: JSON.stringify({task: {
                name: taskName,
                completed: false
            }})
            })
        .then(response => response.json())
        .then(payload => {
            setTasks([...tasks, payload])
            setTaskName("")
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <form
            onSubmit={handleSubmit}
        >
                <Group
                    position="apart"
                    grow
                >
                    <TextInput
                        placeholder="New Task"
                        withAsterisk
                        name="name"
                        onChange={(e) => setTaskName(e.target.value)}
                        value={taskName}
                        rightSection={
                            <ActionIcon
                                color="blue"
                                variant="outline"
                                type="submit"
                            >
                                <CornerDownLeftDouble size="xs" />
                            </ActionIcon>
                        }
                    />
                </Group>
        </form>
    )
}