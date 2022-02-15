import React from 'react';
import { Title, TextInput, PasswordInput, Space, Group, Button, Divider, Alert } from '@mantine/core';
import APIURL from '../../helpers/environment'

interface DeleteCommentsState {
    notification: string,
    color?: string,
    profileId: string,
}

interface DeleteCommentsProps {
    app_sessionToken: string | null
}

class DeleteComments extends React.Component<DeleteCommentsProps, DeleteCommentsState> {
    constructor(props: DeleteCommentsProps) {
        super(props);
        this.state = {
            notification: '',
            profileId: '',
        }
    }

    profileIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => this.setState({ profileId: event.target.value })

    deleteComments = async () => {
        await fetch(`${APIURL}/comment/admin/deleteUserComments`, {
            method: 'DELETE',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
            }),
            body: JSON.stringify({
                profileId: this.state.profileId
            })
        })
            .then(result => {
                this.setState({ color: result.status === 200 ? 'green' : 'red' })
                return result
            })
            .then(result => result.json())
            .then(result => this.setState({ notification: result.message }))
    }

    render() {
        return (
            <>
                <Space h='md' />
                <Title order={4}>Delete all user comments by Profile Id</Title>
                <Space h='md' />
                <Group grow>
                    <TextInput value={this.state.profileId} onChange={this.profileIdChange} placeholder='profile id' />
                    <Button onClick={this.deleteComments} color='orange'>submit</Button>
                    <Space h='sm' />
                    <Alert variant='filled' color={this.state.color} sx={{ visibility: this.state.notification !== '' ? 'visible' : 'hidden' }}>
                        {this.state.notification ? this.state.notification : <>&nbsp;</>}
                    </Alert>
                </Group>
            </>
        )
    }
}

export default DeleteComments;