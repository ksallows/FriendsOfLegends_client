import APIURL from '../../helpers/environment'
import React from 'react';
import { Title, Grid, Space, Chips, Chip, Paper, Badge, Group, Avatar, SimpleGrid, Textarea, TextInput, SegmentedControl } from '@mantine/core';
import { ChampionListData, ChampionIdData, baseUrl, serversList } from '../../d'
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
    refreshLoading: boolean,
    description: string | undefined,
    discord: string | undefined,
    voiceComm: boolean | null
}

interface EditProfileProps {
    app_auth: () => boolean,
    app_sessionToken: string | null,
    app_verified: boolean,
    app_updateVerify: (value: boolean) => void,
    app_updateSummonerName: (value: string) => void,
    app_updateServer: (value: string) => void,
    app_summonerName: string | null,
    app_server: string | null,
    app_profileId: string | null,
    app_championNameList: string[] | null,
    app_championValues: ChampionListData[] | null,
    app_championIdsToName: ChampionIdData,
    app_patch: string | null,
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
            refreshLoading: false,
            description: undefined,
            discord: undefined,
            voiceComm: null
        }
    }

    gameModeChange = (value: string[]): void => this.setState({ gameModes: value })

    rolesChange = (value: string[]): void => this.setState({ roles: value })

    descriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => this.setState({ description: event.target.value })

    discordChange = (event: React.ChangeEvent<HTMLInputElement>): void => this.setState({ description: event.target.value })

    voiceCommChange = (value: string) => this.setState({ voiceComm: value === 'null' ? null : value === 'true' ? true : false })

    refresh = async () => {
        this.setState({ refreshLoading: true })
        await fetch(`${APIURL}/profile/refresh`, {
            method: 'PUT',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
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

    componentDidMount = () => {
        setTimeout(async () => {
            await fetch(`${APIURL}/profile/p/${this.props.app_profileId}`, {
                method: 'GET',
                mode: 'cors',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.app_sessionToken}`
                })
            })
                .then(result => result.json())
                .then(result => this.setState({
                    roles: result.profile.roles,
                    gameModes: result.profile.gameModes,
                    rank: result.profile.rank,
                    summonerIcon: result.profile.summonerIcon,
                    topChamps: result.profile.topChamps,
                    level: result.profile.level,
                    description: result.profile.description
                }))
        }, 500)

    }

    render() {
        return (
            <Grid>
                <Grid.Col sx={{ paddingTop: 40 }} xs={10} md={8} lg={6} xl={6} offsetXs={1} offsetMd={2} offsetLg={3} offsetXl={3}>
                    <Group position='apart'>
                        <Title>Edit Profile</Title>
                    </Group>

                    <Space h='xl' />
                    {this.props.app_summonerName === null ?
                        <Verify
                            app_server={this.props.app_server}
                            app_updateSummonerName={this.props.app_updateSummonerName}
                            app_updateServer={this.props.app_updateServer}
                            app_summonerName={this.props.app_summonerName}
                            app_updateVerify={this.props.app_updateVerify}
                            app_verified={this.props.app_verified}
                            app_sessionToken={this.props.app_sessionToken}
                        />
                        :
                        <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                            <Group position='apart'>
                                <Title order={4}>{this.props.app_summonerName} {Object.values(serversList).map(v => {
                                    if (v.value === this.props.app_server) return (<Badge radius='xs' className={v.label} variant='filled'>{v.label}</Badge>)
                                })}</Title>
                                {this.props.app_verified ? <Badge radius='xs' variant='filled' size='lg' color='green'>verified</Badge> : <Badge radius='xs' variant='filled' color='red'>not verified</Badge>}
                            </Group>

                        </Paper>
                    }
                    <Space h='xl' />
                    {this.props.app_verified && this.props.app_summonerName !== null ?
                        <>
                            <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                                <Group position='apart'>
                                    <Title order={4}>Ranked &amp; Champions</Title>
                                    {this.props.app_verified ? <Refresh editProfile_refreshLoading={this.state.refreshLoading} editProfile_refresh={this.refresh} /> : ''}
                                </Group>
                                <Space h='md' />
                                <SimpleGrid cols={3}>
                                    <Group direction='column'>
                                        <Avatar
                                            size='lg'
                                            radius='xl'
                                            src={`${baseUrl}${this.props.app_patch}/img/profileicon/${this.state.summonerIcon}.png`} alt='its me'
                                        />
                                        <p>{this.state.level}</p>
                                    </Group>

                                    <Group direction='column'>
                                        <Title order={6}>Rank:</Title>
                                        <p>{this.state.rank}</p>
                                    </Group>
                                    <Group direction='column'>
                                        <Title order={6}>Top Champs:</Title>
                                        {this.state.topChamps !== undefined ?
                                            <Group>
                                                <Avatar radius='xs' src={`${baseUrl}${this.props.app_patch}/img/champion/${this.props.app_championIdsToName[`n${this.state.topChamps[0]}`]}.png`} />
                                                <Avatar radius='xs' src={`${baseUrl}${this.props.app_patch}/img/champion/${this.props.app_championIdsToName[`n${this.state.topChamps[1]}`]}.png`} />
                                                <Avatar radius='xs' src={`${baseUrl}${this.props.app_patch}/img/champion/${this.props.app_championIdsToName[`n${this.state.topChamps[2]}`]}.png`} />
                                            </Group>
                                            :
                                            ''}
                                    </Group>
                                </SimpleGrid>
                            </Paper>
                            <Space h='xl' />
                            <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                                <Title order={4}>Profile Description</Title>
                                <Space h='md' />
                                <Textarea value={this.state.description} onChange={this.descriptionChange} />
                            </Paper>
                            <Space h='xl' />
                            <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                                <Title order={4}>Voice Comm</Title>
                                <Space h='md' />
                                <SegmentedControl
                                    radius='xl'
                                    value={String(this.state.voiceComm)}
                                    onChange={this.voiceCommChange}
                                    data={[
                                        { label: 'no preference', value: 'null' },
                                        { label: 'yes', value: 'true' },
                                        { label: 'no', value: 'false' }
                                    ]}
                                    fullWidth
                                    size='md'
                                    color='orange'
                                />
                            </Paper>
                            <Space h='xl' />

                            <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                                <Title order={4}>Discord Tag</Title>
                                <Space h='md' />
                                <TextInput placeholder='mydiscord#1234' value={this.state.discord} onChange={this.discordChange} />
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