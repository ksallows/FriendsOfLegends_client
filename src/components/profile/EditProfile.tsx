import React from 'react';
import { Title, Grid, Space, Chips, Chip } from '@mantine/core';
import Verify from './Verify'
import ResultBlock from '../search/ResultBlock'
import jungle from '../../assets/jungle.svg'
import mid from '../../assets/mid.svg'
import support from '../../assets/support.svg'
import bottom from '../../assets/bottom.svg'
import top from '../../assets/top.svg'

interface EditProfileState {
    gameModes: string[] | undefined,
    roles: string[] | undefined
}

interface EditProfileProps {
    auth: () => boolean,
    sessionToken: string | null,
    verified: boolean,
    updateVerify: (value: boolean) => void,
    updateSummonerName: (value: string) => void,
    updateServer: (value: string) => void,
    summonerName: string | null,
    server: string | null
}

class EditProfile extends React.Component<EditProfileProps, EditProfileState> {
    constructor(props: EditProfileProps) {
        super(props);
        this.state = {
            gameModes: undefined,
            roles: undefined
        }
    }

    gameModeChange = (value: string[]) => this.setState({ gameModes: value })

    rolesChange = (value: string[]) => this.setState({ roles: value })

    render() {
        return (
            <Grid>
                <Grid.Col sx={{ paddingTop: 40 }} xs={10} md={8} lg={6} xl={6} offsetXs={1} offsetMd={2} offsetLg={3} offsetXl={3}>
                    <Title>Edit Profile</Title>
                    <Verify
                        server={this.props.server}
                        updateSummonerName={this.props.updateSummonerName}
                        updateServer={this.props.updateServer}
                        summonerName={this.props.summonerName}
                        updateVerify={this.props.updateVerify}
                        verified={this.props.verified}
                        sessionToken={this.props.sessionToken}
                    />
                    {this.props.verified && this.props.summonerName !== null ?
                        <>

                            <Title order={4}>Game Modes</Title>
                            <Space h='md' />
                            <Chips size='sm' value={this.state.gameModes} onChange={this.gameModeChange} multiple color='orange'>
                                <Chip value='ranked_solo_duo'>ranked solo/duo</Chip>
                                <Chip value='ranked_flex'>ranked flex</Chip>
                                <Chip value='normal_blind'>normal blind</Chip>
                                <Chip value='normal_draft'>normal draft</Chip>
                                <Chip value='rgm'>rotating game mode</Chip>
                            </Chips>
                            <Space h='xl' />
                            <Title order={4}>Roles</Title>
                            <Space h='md' />
                            <Chips size='sm' value={this.state.roles} onChange={this.rolesChange} multiple color='orange'>
                                <Chip value='top'>top</Chip>
                                <Chip value='jng'>jungle</Chip>
                                <Chip value='mid'>mid</Chip>
                                <Chip value='bot'>bot</Chip>
                                <Chip value='sup'>support</Chip>
                            </Chips>
                        </>
                        :
                        ''
                    }
                </Grid.Col>
            </Grid>
        )
    }
}

export default EditProfile;