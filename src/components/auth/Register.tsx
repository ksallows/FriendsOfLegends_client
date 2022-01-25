import APIURL from '../../helpers/environment'
import React from 'react';
import { Link } from 'react-router-dom';
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'

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
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?"_]).*$/

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
                if (this.state.email.match(emailRegex))
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
                if (this.state.password.match(passwordRegex))
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
            <Grid justifyContent='center' alignItems='center' container spacing={2}>
                <Grid item xs={10} md={8} lg={4} xl={3}>
                    <Container sx={{ m: 2, p: 4, boxShadow: '0 0 10px #d2d2d2', borderRadius: '20px' }}>
                        <Typography sx={{ mb: 3 }} variant='h3'>Sign Up</Typography>
                        <TextField
                            value={this.state.email}
                            onChange={this.emailChange}
                            fullWidth
                            label="email"
                            variant="outlined"
                            error={this.state.emailStarted && !this.state.emailIsValid}
                            helperText={this.state.emailError}
                            sx={{ mb: 1.3 }}
                        />

                        <TextField
                            type='password'
                            value={this.state.password}
                            onChange={this.passwordChange}
                            margin='normal'
                            fullWidth
                            label="password"
                            variant="outlined"
                            error={this.state.passwordStarted && !this.state.passwordIsValid}
                            helperText={this.state.passwordError}
                            sx={{ mb: 1 }}
                        />

                        <TextField
                            type='password'
                            value={this.state.passwordCheck}
                            onChange={this.passwordCheckChange}
                            margin='normal'
                            fullWidth
                            label="re-type password"
                            variant="outlined"
                            error={this.state.passwordCheckStarted && !this.state.passwordCheckIsValid}
                            helperText={this.state.passwordCheckError}
                            sx={{ mb: 3 }}
                        />
                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Button
                                variant="contained"
                                onClick={this.registerSubmit}
                                disabled={this.state.emailIsValid && this.state.passwordCheckIsValid && this.state.passwordIsValid ? false : true}
                            >
                                Submit
                            </Button>
                        </Box>
                        {this.state.notification && <Alert severity={this.state.notificationSuccess ? 'success' : 'warning'}>{this.state.notification}</Alert>}

                        <Link to='/login' className='has-text-centered is-block mx-auto is-size-7'>already have an account?</Link>
                    </Container>
                </Grid>
            </Grid>

        )
    }
}

export default Register;