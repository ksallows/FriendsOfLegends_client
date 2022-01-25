import APIURL from '../../helpers/environment'
import React from 'react';
import { Link } from 'react-router-dom';
import { TextInput, Button, Container, Alert, Center, Grid, Space, Title } from '@mantine/core';

type LoginState = {
    email: string,
    emailIsValid: boolean,
    emailStarted: boolean,
    emailError: string,
    password: string,
    passwordIsValid: boolean,
    passwordStarted: boolean,
    passwordError: string,
    passwordCheck: string,
    passwordCheckIsValid: boolean,
    passwordCheckStarted: boolean,
    passwordCheckError: string,
    notification: string,
    notificationSuccess: boolean
}

type LoginProps = {
    sessionToken: string | null,
    updateToken: (token: string) => void
}

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            email: '',
            emailIsValid: false,
            emailStarted: false,
            emailError: '',

            password: '',
            passwordIsValid: false,
            passwordStarted: false,
            passwordError: '',

            passwordCheck: '',
            passwordCheckIsValid: false,
            passwordCheckStarted: false,
            passwordCheckError: '',

            notification: '',
            notificationSuccess: false
        }
    }

    emailChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: event.target.value })

    passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: event.target.value })

    registerSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        await fetch(`${APIURL}/account/login`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                account: {
                    email: this.state.email,
                    password: this.state.password
                }
            }),
            headers: new Headers({
                "Content-Type": "application/json"
            }),
        }).then((result) => {
            result.status === 201 ? this.setState({ notificationSuccess: true }) : this.setState({ notificationSuccess: false })
            return result
        }).then(result => result.json())
            .then(result => {
                console.log(result)
                this.setState({ notification: result.message });
                this.props.updateToken(result.sessionToken)
            })
    }

    render() {
        return (
            <>
                <Grid>
                    <Grid.Col sx={{ padding: 20 }} xs={10} md={8} lg={4} xl={2} offsetXs={1} offsetMd={2} offsetLg={4} offsetXl={5}>
                        <Title order={2}>Log In</Title>
                        <Space h="md" />
                        <TextInput
                            value={this.state.email}
                            onChange={this.emailChange}
                            label="email"
                            error={this.state.emailError}
                            type='email'
                        />
                        <Space h="md" />
                        <TextInput
                            value={this.state.password}
                            onChange={this.passwordChange}
                            label="password"
                            error={this.state.passwordError}
                            type='password'
                        />
                        <Space h="md" />
                        <Center sx={{ textAlign: 'center', mb: 2 }}>
                            <Button
                                onClick={this.registerSubmit}
                                disabled={this.state.emailIsValid && this.state.passwordCheckIsValid && this.state.passwordIsValid ? false : true}
                            >
                                Submit
                            </Button>
                        </Center>
                        {this.state.notification && <Alert sx={{ marginTop: 20 }} variant="filled" color={this.state.notificationSuccess ? 'green' : 'red'}>{this.state.notification}</Alert>}
                    </Grid.Col>
                </Grid>
            </>

        )
    }
}

export default Login;