import React from 'react';
import { Title, TextInput, PasswordInput, Space, Group, Button, Divider } from '@mantine/core';
import APIURL from '../../helpers/environment'

interface ResetPasswordState {

}

interface ResetPasswordProps {
    app_sessionToken: string | null
}

class ResetPassword extends React.Component<ResetPasswordProps, ResetPasswordState> {
    constructor(props: ResetPasswordProps) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <>
                <Space h='md' />
                <Title order={4}>Reset by Profile Id</Title>
                <Space h='md' />
                <Group grow>
                    <TextInput placeholder='profile id' />
                    <PasswordInput placeholder='new password' />
                    <Button color='orange'>submit</Button>
                    <Space h='md' />
                </Group>
                <Space h='xl' />
                <Divider />
                <Space h='xl' />
                <Title order={4}>Reset by Account Id</Title>
                <Space h='md' />
                <Group grow>
                    <TextInput placeholder='account id' />
                    <PasswordInput placeholder='new password' />
                    <Button color='orange'>submit</Button>
                    <Space h='md' />
                </Group>
            </>
        )
    }
}

export default ResetPassword;