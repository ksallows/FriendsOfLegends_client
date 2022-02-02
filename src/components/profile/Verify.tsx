import React from 'react';
import APIURL from '../../helpers/environment'
import { Title, Space, TextInput, Button, Group } from '@mantine/core';

interface VerifyState {
    verificationCode: string
}

interface VerifyProps {
    sessionToken: string | null,
    verified: boolean
}

class Verify extends React.Component<VerifyProps, VerifyState> {
    constructor(props: VerifyProps) {
        super(props);
        this.state = {
            verificationCode: ''
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
    }

    checkVerificationCode = async () => {
        await fetch(`${APIURL}/profile/verify`, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then(result => result.json())
            .then(result => console.log(result))
    }

    componentDidMount = () => {
        this.getVerificationCode();
    }

    render() {
        return (
            <>
                <Space h='xl'></Space>
                <Title order={4}>Verify</Title>
                {this.props.verified ?
                    <p>Your summoner name is verified</p>
                    :
                    <>
                        <p>You must verify your summoner name to continue. Copy the code below and paste it in the "verification" box in your League client (settings -&gt; verification -&gt; paste -&gt; save). When you're done, click <strong>Check</strong>.</p>
                        <TextInput value={this.state.verificationCode} rightSection={<Button sx={{ borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} color='orange' onClick={this.checkVerificationCode}>Check</Button>} />
                    </>
                }
            </>
        )
    }
}

export default Verify;