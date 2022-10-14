import React from 'react'

import { 
    Button, 
    Group, 
    Modal, 
    Text,
    Divider
} from '@mantine/core'

interface DeleteTaskProps {
    opened: boolean
    setOpened: React.Dispatch<React.SetStateAction<boolean>>
    id: number
    setFetchTasksFlag: React.Dispatch<React.SetStateAction<boolean>>
}

export default function DeleteTask({
    opened,
    setOpened,
    id,
    setFetchTasksFlag
}: DeleteTaskProps) {

    const destroyTask = () => {
        fetch(`http://localhost:3001/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "bearer " + localStorage.getItem('tuduUserToken')
            },
            })
        .then(response => response.json())
        .then(payload => {
            console.log(payload)
            setOpened(false)
            setFetchTasksFlag(true)
        })
        .catch(errors => {
            console.error(errors)
        })
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Confirm"
            >
                <Text>Are you sure you wish to delete this task?</Text>
                <Divider my="sm" />
            <Group position="apart">
                <Button 
                    // color="red"
                    onClick={() => setOpened(false)}
                    >
                        No
                </Button>
                <Button 
                    color="red"
                    onClick={destroyTask}
                    >
                        Yes
                </Button>
            </Group>
            </Modal>
        </>
    )
}