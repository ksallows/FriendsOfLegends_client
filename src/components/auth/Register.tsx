import APIURL from '../../helpers/environment'
import React from 'react';
import { TextInput, Button, Alert, Center, Grid, Space, Title } from '@mantine/core';

type RegisterState = {
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

type RegisterProps = {
    sessionToken: string | null,
    updateToken: (token: string) => void
}

// eslint-disable-next-line
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|'(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*')@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?'_]).*$/

class Register extends React.Component<RegisterProps, RegisterState> {
    constructor(props: RegisterProps) {
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

    emailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.state.emailStarted)
            this.setState({ emailStarted: true })
        this.setState({ email: event.target.value },
            () => {
                if (emailRegex.test(this.state.email))
                    this.setState({ emailIsValid: true, emailError: '' })
                else
                    this.setState({ emailIsValid: false, emailError: 'Invalid email address' })
            })

    }

    passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.state.passwordStarted)
            this.setState({ passwordStarted: true })
        this.setState({ password: event.target.value },
            () => {
                if (passwordRegex.test(this.state.password))
                    this.setState({ passwordIsValid: true, passwordError: '' })
                else
                    this.setState({ passwordIsValid: false, passwordError: 'Password must be at least 8 characters and include at least 1 letter and 1 number, and 1 symbol (!#$%&?"_)' })
            })
    }

    passwordCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!this.state.passwordCheckStarted)
            this.setState({ passwordCheckStarted: true })
        this.setState({ passwordCheck: event.target.value },
            () => {
                if (this.state.password === this.state.passwordCheck)
                    this.setState({ passwordCheckIsValid: true, passwordCheckError: '' })
                else
                    this.setState({ passwordCheckIsValid: false, passwordCheckError: 'Passwords must match' })
            })
    }

    registerSubmit = async (event: React.MouseEvent<HTMLElement>) => {
        await fetch(`${APIURL}/account/register`, {
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
                    <Grid.Col
                        sx={{ paddingTop: 40 }}
                        xs={10}
                        md={8}
                        lg={4}
                        xl={2}
                        offsetXs={1}
                        offsetMd={2}
                        offsetLg={4}
                        offsetXl={5}
                    >
                        <Title order={2}>Sign Up</Title>
                        <Space h='md' />
                        <TextInput
                            value={this.state.email}
                            onChange={this.emailChange}
                            label='email'
                            error={this.state.emailError}
                            type='email'
                        />
                        <Space h='md' />
                        <TextInput
                            value={this.state.password}
                            onChange={this.passwordChange}
                            label='password'
                            error={this.state.passwordError}
                            type='password'
                        />
                        <Space h='md' />
                        <TextInput
                            value={this.state.passwordCheck}
                            onChange={this.passwordCheckChange}
                            label='re-type password'
                            error={this.state.passwordCheckError}
                            type='password'
                        />
                        <Space h='md' />
                        <Center sx={{ textAlign: 'center', mb: 2 }}>
                            <Button
                                onClick={this.registerSubmit}
                                disabled={this.state.emailIsValid && this.state.passwordCheckIsValid && this.state.passwordIsValid ? false : true}
                            >
                                Submit
                            </Button>
                        </Center>
                        {this.state.notification && <Alert sx={{ marginTop: 20 }} variant='filled' color={this.state.notificationSuccess ? 'green' : 'red'}>{this.state.notification}</Alert>}
                    </Grid.Col>

                </Grid>
            </>

        )
    }
}

export default Register;