import React from 'react';
import APIURL from '../../helpers/environment'
import { Title, Space, TextInput, Button, Alert, NativeSelect, Group, Badge, Paper } from '@mantine/core';

interface VerifyState {
    verificationCode: string,
    notification: string | null,
    notificationSuccess: boolean,
    summonerNameInput: string,
    serverInput: string
}

interface VerifyProps {
    sessionToken: string | null,
    verified: boolean,
    updateVerify: (value: boolean) => void,
    summonerName: string | null,
    server: string | null,
    updateSummonerName: (value: string) => void,
    updateServer: (value: string) => void
}

class Verify extends React.Component<VerifyProps, VerifyState> {
    constructor(props: VerifyProps) {
        super(props);
        this.state = {
            verificationCode: '',
            notification: null,
            notificationSuccess: false,
            summonerNameInput: '',
            serverInput: ''
        }
    }

    getVerificationCode = async () => {
        await fetch(`${APIURL}/profile/verify`, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
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
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then(result => {
                if (result.status === 200) {
                    this.props.updateVerify(true)
                    this.setState({ notification: 'Summoner verified!', notificationSuccess: true })
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
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then(result => {
                if (result.status === 200) {
                    this.props.updateSummonerName(this.state.summonerNameInput);
                    this.props.updateServer(this.state.serverInput)
                }
            })
            .catch(error => console.log(error))
    }

    componentDidMount = () => {
        setTimeout(() => { this.getVerificationCode() }, 500) // >.<
    }

    render() {
        return (
            <>
                <Space h='xl'></Space>


                {this.props.summonerName === null ?
                    <>
                        <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                            <Title order={4}>Summoner Name</Title>
                            <p>Enter your summoner name and region to start.</p>
                            <Group>
                                <TextInput onChange={this.summonerNameChange} value={this.state.summonerNameInput}
                                /><NativeSelect
                                    onChange={this.serverChange}
                                    value={this.state.serverInput}
                                    data={[
                                        { value: 'br1', label: 'BR' },
                                        { value: 'eun1', label: 'EUNE' },
                                        { value: 'euw1', label: 'EUW' },
                                        { value: 'jp1', label: 'JP' },
                                        { value: 'kr', label: 'KR' },
                                        { value: 'la1', label: 'LAN' },
                                        { value: 'la2', label: 'LAS' },
                                        { value: 'na1', label: 'NA' },
                                        { value: 'oc1', label: 'OCE' },
                                        { value: 'tr1', label: 'TR' },
                                        { value: 'ru1', label: 'RU' },
                                    ]} />
                                <Button color='orange' onClick={this.changeSubmit}>Submit</Button>
                            </Group>
                        </Paper>
                    </>
                    :
                    <><Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                        <Title order={4}>Summoner Name {this.props.verified ? <Badge color='green'>verified</Badge> : <Badge color='red'>not verified</Badge>}</Title>
                        <p>Your summoner name and region: {this.props.summonerName} ({this.props.server})</p>
                    </Paper>
                    </>}
                <Space h='xl'></Space>

                {this.props.summonerName !== null ?
                    this.props.verified ?
                        ''
                        :
                        <>
                            <Title order={4}>Verify</Title>
                            <p>You must verify your summoner name to continue. Copy the code below and paste it in the "verification" box in your League client (settings -&gt; verification -&gt; paste -&gt; save). When you're done, click <strong>Check</strong>.</p>
                            <TextInput readOnly value={this.state.verificationCode} rightSection={<Button sx={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} color='orange' onClick={this.checkVerificationCode}>Check</Button>} />
                            {this.state.notification && <Alert sx={{ marginTop: 20 }} variant='filled' color={this.state.notificationSuccess ? 'green' : 'red'}>{this.state.notification}</Alert>}
                        </>
                    :
                    ''
                }
            </>
        )
    }
}

export default Verify;