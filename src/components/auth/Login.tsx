import APIURL from '../../helpers/environment'
import React from 'react';
import { TextInput, Button, Alert, Center, Grid, Space, Title, PasswordInput, Paper } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faAt } from '@fortawesome/free-solid-svg-icons'

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
    app_sessionToken: string | null,
    app_updateToken: (token: string) => void,
    app_getProfileInfo: () => void
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

    loginSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
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
                'Content-Type': 'application/json'
            }),
        }).then((result) => {
            result.status === 200 ? this.setState({ notificationSuccess: true }) : this.setState({ notificationSuccess: false })
            return result
        }).then(result => result.json())
            .then(result => {
                this.setState({ notification: result.message });
                this.props.app_updateToken(result.sessionToken);
                this.props.app_getProfileInfo();
            })
    }

    render() {
        return (
            <>
                <Grid>
                    <Grid.Col sx={{ paddingTop: 40 }} xs={10} md={8} lg={4} xl={2} offsetXs={1} offsetMd={2} offsetLg={4} offsetXl={5}>
                        <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                            <Title order={2}>Log In</Title>
                            <Space h='md' />
                            <form onSubmit={this.loginSubmit}>
                                <TextInput
                                    icon={<FontAwesomeIcon icon={faAt} />}
                                    value={this.state.email}
                                    onChange={this.emailChange}
                                    label='email'
                                    error={this.state.emailError}
                                    type='email'
                                />
                                <Space h='md' />
                                <PasswordInput
                                    icon={<FontAwesomeIcon icon={faLock} />}
                                    value={this.state.password}
                                    onChange={this.passwordChange}
                                    label='password'
                                    error={this.state.passwordError}

                                />
                                <Space h='md' />
                                <Center sx={{ textAlign: 'center', mb: 2 }}>
                                    <Button
                                        color='orange'
                                        type='submit'
                                        disabled={this.state.email && this.state.password ? false : true}
                                    >
                                        Submit
                                    </Button>
                                </Center>
                            </form>
                            {this.state.notification && <Alert sx={{ marginTop: 20 }} variant='filled' color={this.state.notificationSuccess ? 'green' : 'red'}>{this.state.notification}</Alert>}
                        </Paper>
                    </Grid.Col>
                </Grid>
            </>

        )
    }
}

export default Login;