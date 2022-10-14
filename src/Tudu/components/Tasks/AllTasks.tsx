import { Container, Divider, List, Paper, Stack } from '@mantine/core'
import React from 'react'
import {TaskType} from '../../TuduInterfaces'
import Task from '../Task/Task'
import NewTask from './NewTask'

interface AllTasksProps {
    tasks: TaskType[]
    setTasks: React.Dispatch<React.SetStateAction<TaskType[]>>
    setFetchTasksFlag: React.Dispatch<React.SetStateAction<boolean>>
}


export default function AllTasks({
    tasks,
    setTasks,
    setFetchTasksFlag
}: AllTasksProps) {

    const renderTasks = (
        tasks: TaskType[]
    ) => {
        return tasks.map(task => {
            return <Task 
                    name={task.name}
                    completed={task.completed}
                    id={task.id}
                    setFetchTasksFlag={setFetchTasksFlag}
                />
        })
    }

    return (
        <Paper
            shadow="xs" 
            p="md"
        >
            <NewTask 
                setTasks={setTasks}
                tasks={tasks}
            />
            <Divider 
                my='xs'
            />
            {renderTasks(tasks)}
        </Paper>
    )
}