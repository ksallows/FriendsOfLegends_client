import APIURL from '../../helpers/environment'
import React from 'react';
import { Title, Grid, Space, Chips, Chip, Paper, Badge, Group } from '@mantine/core';
import Verify from './Verify'
import Refresh from './Refresh'
import ResultBlock from '../search/ResultBlock'
import jungle from '../../assets/jungle.svg'
import mid from '../../assets/mid.svg'
import support from '../../assets/support.svg'
import bottom from '../../assets/bottom.svg'
import top from '../../assets/top.svg'

interface EditProfileState {
    gameModes: string[] | undefined,
    roles: string[] | undefined,
    rank: string | undefined,
    summonerIcon: number | undefined,
    level: number | undefined,
    topChamps: string[] | undefined,
    refreshLoading: boolean
}

interface EditProfileProps {
    auth: () => boolean,
    sessionToken: string | null,
    verified: boolean,
    updateVerify: (value: boolean) => void,
    updateSummonerName: (value: string) => void,
    updateServer: (value: string) => void,
    summonerName: string | null,
    server: string | null,
    profileId: string | null
}

class EditProfile extends React.Component<EditProfileProps, EditProfileState> {
    constructor(props: EditProfileProps) {
        super(props);
        this.state = {
            gameModes: undefined,
            roles: undefined,
            level: undefined,
            topChamps: undefined,
            summonerIcon: undefined,
            rank: undefined,
            refreshLoading: false
        }
    }

    gameModeChange = (value: string[]): void => this.setState({ gameModes: value })

    rolesChange = (value: string[]): void => this.setState({ roles: value })

    refresh = async () => {
        this.setState({ refreshLoading: true })
        await fetch(`${APIURL}/profile/refresh`, {
            method: 'PUT',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then(result => result.json())
            .then(result => this.setState({
                rank: result.rank,
                topChamps: result.topChamps,
                summonerIcon: result.summonerIcon,
                level: result.level
            }))
            .then(result => this.setState({ refreshLoading: false }))
    }

    componentDidMount = async () => {
        await fetch(`${APIURL}/profile/p/${this.props.profileId}`, {
            method: 'GET',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then(result => result.json())
            .then(result => this.setState({
                roles: result.profile.roles,
                gameModes: result.profile.gameModes,
                rank: result.profile.rank,
                summonerIcon: result.profile.summonerIcon,
                topChamps: result.profile.topChamps,
                level: result.profile.level
            }))
    }

    render() {
        return (
            <Grid>
                <Grid.Col sx={{ paddingTop: 40 }} xs={10} md={8} lg={6} xl={6} offsetXs={1} offsetMd={2} offsetLg={3} offsetXl={3}>
                    <Group position='apart'>
                        <Title>Edit Profile</Title>
                        {this.props.verified ? <Refresh refreshLoading={this.state.refreshLoading} refresh={this.refresh} /> : ''}
                    </Group>

                    <Space h='xl' />
                    {this.props.summonerName === null ?
                        <Verify
                            server={this.props.server}
                            updateSummonerName={this.props.updateSummonerName}
                            updateServer={this.props.updateServer}
                            summonerName={this.props.summonerName}
                            updateVerify={this.props.updateVerify}
                            verified={this.props.verified}
                            sessionToken={this.props.sessionToken}
                        />
                        :
                        <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                            <Title order={4}>{this.props.summonerName} ({this.props.server}) {this.props.verified ? <Badge color='green'>verified</Badge> : <Badge color='red'>not verified</Badge>}</Title>
                        </Paper>
                    }
                    <Space h='xl' />
                    {this.props.verified && this.props.summonerName !== null ?
                        <>
                            <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                                <Title order={4}>Ranked &amp; Champions</Title>
                                <Space h='md' />
                                <Group>
                                    <Title order={6}>Rank: {this.state.rank}</Title>
                                    <Title order={6}>Level: {this.state.level}</Title>
                                </Group>
                            </Paper>
                            <Space h='xl' />
                            <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                                <Title order={4}>Game Modes</Title>
                                <Space h='md' />
                                <Chips size='sm' value={this.state.gameModes} onChange={this.gameModeChange} multiple color='orange'>
                                    <Chip value='ranked_solo_duo'>ranked solo/duo</Chip>
                                    <Chip value='ranked_flex'>ranked flex</Chip>
                                    <Chip value='normal_blind'>normal blind</Chip>
                                    <Chip value='normal_draft'>normal draft</Chip>
                                    <Chip value='rgm'>rotating game mode</Chip>
                                </Chips>
                            </Paper>
                            <Space h='xl' />
                            <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                                <Title order={4}>Roles</Title>
                                <Space h='md' />
                                <Chips size='sm' value={this.state.roles} onChange={this.rolesChange} multiple color='orange'>
                                    <Chip value='top'>top</Chip>
                                    <Chip value='jng'>jungle</Chip>
                                    <Chip value='mid'>mid</Chip>
                                    <Chip value='bot'>bot</Chip>
                                    <Chip value='sup'>support</Chip>
                                </Chips>
                            </Paper>
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