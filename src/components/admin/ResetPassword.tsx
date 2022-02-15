import React from 'react';
import { Title, TextInput, PasswordInput, Space, Group, Button, Divider, Alert } from '@mantine/core';
import APIURL from '../../helpers/environment'

interface ResetPasswordState {
    notification_profile: string,
    notification_account: string,
    color?: string,
    method?: string,
    profileId: string,
    accountId: string,
    newPassword_profile: string,
    newPassword_account: string
}

interface ResetPasswordProps {
    app_sessionToken: string | null
}

class ResetPassword extends React.Component<ResetPasswordProps, ResetPasswordState> {
    constructor(props: ResetPasswordProps) {
        super(props);
        this.state = {
            notification_profile: '',
            notification_account: '',
            color: '',
            method: '',
            profileId: '',
            accountId: '',
            newPassword_profile: '',
            newPassword_account: ''
        }
    }

    resetByProfileIdPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => this.setState({ newPassword_profile: event.target.value })
    resetByAccountIdPasswordChange = (event: React.ChangeEvent<HTMLInputElement>): void => this.setState({ newPassword_account: event.target.value })
    profileIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => this.setState({ profileId: event.target.value })
    accountIdChange = (event: React.ChangeEvent<HTMLInputElement>): void => this.setState({ accountId: event.target.value })

    resetPassword = async () => {
        let body: any = {}
        if (this.state.method === 'Profile') {
            body.profileIdToReset = this.state.profileId
            body.newPassword = this.state.newPassword_profile
        }
        else {
            body.accountIdToReset = this.state.accountId
            body.newPassword = this.state.newPassword_account
        }
        await fetch(`${APIURL}/account/admin/resetPassword/by${this.state.method}`, {
            method: 'PUT',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
            }),
            body: JSON.stringify(body)
        })
            .then(result => {
                this.setState({ color: result.status === 200 ? 'green' : 'red' })
                return result
            })
            .then(result => result.json())
            .then(result => {
                if (this.state.method === 'Profile')
                    this.setState({ notification_profile: result.message })
                else
                    this.setState({ notification_account: result.message })
            })
    }

    render() {
        return (
            <>
                <Space h='md' />
                <Title order={4}>Reset by Profile Id</Title>
                <Space h='md' />
                <Group grow>
                    <TextInput value={this.state.profileId} onChange={this.profileIdChange} placeholder='profile id' />
                    <PasswordInput value={this.state.newPassword_profile} onChange={this.resetByProfileIdPasswordChange} placeholder='new password' />
                    <Button onClick={() => {
                        this.setState({ method: 'Profile' }, () => { this.resetPassword(); });
                    }} color='orange'>submit</Button>
                    <Space h='sm' />
                </Group>
                <Space h='md' />
                <Alert variant='filled' color={this.state.color} sx={{ visibility: this.state.notification_profile !== '' ? 'visible' : 'hidden' }}>
                    {this.state.notification_profile ? this.state.notification_profile : <>&nbsp;</>}
                </Alert>
                <Divider />
                <Space h='xl' />
                <Title order={4}>Reset by Account Id</Title>
                <Space h='md' />
                <Group grow>
                    <TextInput value={this.state.accountId} onChange={this.accountIdChange} placeholder='account id' />
                    <PasswordInput value={this.state.newPassword_account} onChange={this.resetByAccountIdPasswordChange} placeholder='new password' />
                    <Button onClick={() => {
                        this.setState({ method: 'Account' }, () => { this.resetPassword(); });
                    }} color='orange'>submit</Button>
                    <Space h='sm' />
                </Group>
                <Space h='md' />
                <Alert variant='filled' color={this.state.color} sx={{ visibility: this.state.notification_account !== '' ? 'visible' : 'hidden' }}>
                    {this.state.notification_account ? this.state.notification_account : <>&nbsp;</>}
                </Alert>
            </>
        )
    }
}

export default ResetPassword;