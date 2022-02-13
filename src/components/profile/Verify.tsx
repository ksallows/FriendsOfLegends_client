import React from 'react';
import APIURL from '../../helpers/environment'
import { Title, TextInput, Button, Alert, NativeSelect, Group, Badge, Paper, Grid, Space, Center } from '@mantine/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { serversList } from '../../d'

interface VerifyState {
    verificationCode: string,
    notification: string | null,
    notificationSuccess: boolean,
    summonerNameInput: string,
    serverInput: string
}

interface VerifyProps {
    app_sessionToken: string | null,
    app_verified: boolean,
    app_updateVerify: (value: boolean) => void,
    app_summonerName: string | null,
    app_server: string | null,
    app_updateSummonerName: (value: string | null) => void,
    app_updateServer: (value: string | null) => void,
    refresh: () => Promise<void>
}

class Verify extends React.Component<VerifyProps, VerifyState> {
    constructor(props: VerifyProps) {
        super(props);
        this.state = {
            verificationCode: '',
            notification: null,
            notificationSuccess: false,
            summonerNameInput: '',
            serverInput: 'na1'
        }
    }

    getVerificationCode = async () => {
        await fetch(`${APIURL}/profile/verify`, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
            })
        })
            .then(result => result.json())
            .then(result => this.setState({ verificationCode: result.code }))
            .catch(error => console.log(error))
    }

    checkVerificationCode = async () => {
        await fetch(`${APIURL}/profile/verify`, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
            })
        })
            .then(result => {
                if (result.status === 200) {
                    this.props.app_updateVerify(true)
                    this.setState({ notification: 'Summoner verified!', notificationSuccess: true });
                    this.props.refresh();
                }
                else this.setState({ notification: 'Unable to verify. Repeat the steps and try again.', notificationSuccess: false })
            })
            .catch(error => console.log(error))
    }

    summonerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => this.setState({ summonerNameInput: event.target.value })

    serverChange = (event: React.ChangeEvent<HTMLSelectElement>) => this.setState({ serverInput: event.target.value })

    changeSubmit = async () => {
        await fetch(`${APIURL}/profile/updateSummonerName`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                profile: {
                    summonerName: this.state.summonerNameInput,
                    server: this.state.serverInput
                }
            }),
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
            })
        })
            .then(result => {
                if (result.status === 200) {
                    this.props.app_updateSummonerName(this.state.summonerNameInput);
                    this.props.app_updateServer(this.state.serverInput)
                }
            })
            .catch(error => console.log(error))
    }

    resetSummoner = async () => {
        await fetch(`${APIURL}/profile/removeSummonerName`, {
            method: 'DELETE',
            mode: 'cors',
            credentials: 'include',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
            })
        })
            .then(result => {
                if (result.status === 200) {
                    this.props.app_updateSummonerName(null);
                    this.props.app_updateServer(null)
                }
            })
            .catch(error => console.log(error))
    }

    componentDidMount = () => {
        setTimeout(() => { this.getVerificationCode() }, 500) // >.<
    }

    render() {
        return (<>

            {this.props.app_summonerName === null || this.props.app_summonerName === undefined ?
                <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                    <Title order={4}>Summoner Name</Title>
                    <p>Enter your summoner name and region to start.</p>
                    <Group>
                        <TextInput onChange={this.summonerNameChange} value={this.state.summonerNameInput}
                        /><NativeSelect
                            onChange={this.serverChange}
                            value={this.state.serverInput}
                            data={serversList} />
                        <Button color='orange' onClick={this.changeSubmit}>Submit</Button>
                    </Group>
                </Paper>
                :
                ''
            }
            {this.props.app_verified === false && this.props.app_summonerName !== null ?
                <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                    <Title order={4}>Verify</Title>
                    <p>You must verify your summoner name to continue. Copy the code below and paste it in the "verification" box in your League client.
                        <Space h='md' />
                        <Badge color='orange' radius='xs' sx={{ marginRight: '0.5rem' }}>settings</Badge>
                        <FontAwesomeIcon icon={faArrowRight} />
                        <Badge color='orange' radius='xs' sx={{ marginRight: '0.5rem', marginLeft: '0.5rem' }}>verification</Badge>
                        <FontAwesomeIcon icon={faArrowRight} />
                        <Badge color='orange' radius='xs' sx={{ marginRight: '0.5rem', marginLeft: '0.5rem' }}>paste</Badge>
                        <FontAwesomeIcon icon={faArrowRight} />
                        <Badge color='orange' radius='xs' sx={{ marginRight: '0.5rem', marginLeft: '0.5rem' }}>save</Badge>
                        <Space h='md' />
                        When you're done, click <strong>Check</strong>.</p>
                    <Grid>
                        <Grid.Col span={10}>
                            <TextInput readOnly value={this.state.verificationCode} />
                        </Grid.Col>
                        <Grid.Col span={2}>
                            <Button sx={{ display: 'block', width: '100%' }} color='orange' onClick={this.checkVerificationCode}>Check</Button>
                        </Grid.Col>
                    </Grid>
                    {this.state.notification && <Alert sx={{ marginTop: 20 }} variant='filled' color={this.state.notificationSuccess ? 'green' : 'red'}>{this.state.notification}</Alert>}
                    <Space h='xl' />
                    <Center><Button onClick={this.resetSummoner} color='orange' variant="subtle">change summoner name</Button></Center>
                </Paper>
                :
                ''

            }
        </>
        )
    }
}

export default Verify;