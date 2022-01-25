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

type LoginState = {
    email: string,
    password: string,
    notification: string,
    notificationSuccess: boolean
}

type LoginProps = {
    sessionToken: string | null,
    updateToken: (token: string) => void
}

// eslint-disable-next-line
const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const passwordRegex = /^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?"_]).*$/

class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props)
        this.state = {
            email: '',
            password: '',
            notification: '',
            notificationSuccess: false
        }
    }

    emailChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: event.target.value })

    passwordChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: event.target.value })

    loginSubmit = async (event: React.MouseEvent<HTMLElement>) => {
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
            <Grid spacing={0} justifyContent='center' alignItems='center' container>
                <Grid item xs={11} md={8} lg={4} xl={3}>
                    <Container sx={{ mt: 4, p: 4, boxShadow: '0 0 10px #d2d2d2', borderRadius: '20px' }}>
                        <Typography sx={{ mb: 3 }} variant='h3'>Log In</Typography>
                        <TextField
                            value={this.state.email}
                            onChange={this.emailChange}
                            fullWidth
                            label="email"
                            variant="outlined"
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
                            sx={{ mb: 1 }}
                        />

                        <Box sx={{ textAlign: 'center', mb: 2 }}>
                            <Button
                                variant="contained"
                                onClick={this.loginSubmit}
                                disabled={!this.state.email || !this.state.password}
                            >
                                Submit
                            </Button>
                        </Box>
                        {this.state.notification && <Alert severity={this.state.notificationSuccess ? 'success' : 'warning'}>{this.state.notification}</Alert>}

                        <Link to='/register' className='has-text-centered is-block mx-auto is-size-7'>don't have an account?</Link>
                    </Container>
                </Grid>
            </Grid>

        )
    }
}

export default Login;