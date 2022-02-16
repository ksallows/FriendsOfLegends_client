import APIURL from '../../helpers/environment'
import React from 'react';
import { Title, Grid, Space, Chips, Chip, Paper, Badge, Group, Avatar, Textarea, TextInput, SegmentedControl, Button, Center, Alert } from '@mantine/core';
import { ChampionListData, ChampionIdData, baseUrl, serversList, rankToCSS } from '../../d'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord } from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom';
import Verify from './Verify'
import Refresh from './Refresh'
import equal from 'fast-deep-equal'

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
    voiceComm: boolean | null,
    rankClass: string | undefined,
    loading: boolean,
    notification?: string,
    color?: string
}

interface EditProfileProps {
    app_sessionToken: string | null,
    app_verified: boolean,
    app_updateVerify: (value: boolean) => void,
    app_updateSummonerName: (value: string | null) => void,
    app_updateServer: (value: string | null) => void,
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
            voiceComm: null,
            rankClass: undefined,
            loading: false
        }
    }

    gameModeChange = (value: string[]): void => this.setState({ gameModes: value })

    rolesChange = (value: string[]): void => this.setState({ roles: value })

    descriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>): void => this.setState({ description: event.target.value })

    discordChange = (event: React.ChangeEvent<HTMLInputElement>): void => this.setState({ discord: event.target.value })

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
            .then(result => {
                console.log('json triggered')
                return result.json()
            })
            .then(result => {
                console.log('set state triggered')
                this.setState({
                    rank: result.rank,
                    topChamps: result.topChamps,
                    summonerIcon: result.summonerIcon,
                    level: result.level,
                    rankClass: rankToCSS(result.rank)
                })
            })
            .then(result => this.setState({ refreshLoading: false }))
    }

    getProfile = async () => {
        if (this.props.app_profileId !== undefined && this.props.app_profileId !== null) {
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
                    description: result.profile.description,
                    rankClass: rankToCSS(result.profile.rank),
                    discord: result.profile.discord
                }))
                .catch(error => console.log(error))
        }
    }

    saveProfile = async () => {
        this.setState({ loading: true })
        await fetch(`${APIURL}/profile/update`, {
            method: 'PUT',
            mode: 'cors',
            body: JSON.stringify({
                profile: {
                    // summonerName: this.props.app_summonerName,
                    // server: this.props.app_server,
                    gameModes: this.state.gameModes,
                    voiceComm: this.state.voiceComm,
                    roles: this.state.roles,
                    discord: this.state.discord !== '' ? this.state.discord : null,
                    description: this.state.description
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
            })
        })
            .then(result => {
                if (result.status === 200) this.setState({ color: 'green' })
                return result
            })
            .then(result => result.json())
            .then(result => this.setState({ notification: result.message, loading: false }))
            .catch(error => console.log(error))
    }

    componentDidMount = () => {
        setTimeout(this.getProfile, 500);
    }

    componentDidUpdate(prevProps: EditProfileProps) {
        if (!equal(this.props.app_sessionToken, prevProps.app_sessionToken))
            this.getProfile()
    }

    render() {
        return (
            <Grid>
                <Grid.Col sx={{ paddingTop: 40 }} xs={10} md={8} lg={6} xl={6} offsetXs={1} offsetMd={2} offsetLg={3} offsetXl={3}>
                    <Group position='apart'>
                        <Title>Edit Profile</Title>
                        <Group>
                            {this.props.app_verified ?
                                <>
                                    <Refresh editProfile_refreshLoading={this.state.refreshLoading} editProfile_refresh={this.refresh} />
                                    <Button variant='default' component={Link} to={`/p/${this.props.app_profileId}`}>View Profile</Button>
                                </>

                                : ''}
                        </Group>
                    </Group>

                    <Space h='xl' />
                    {this.props.app_summonerName === null || !this.props.app_verified ?
                        <Verify
                            app_server={this.props.app_server}
                            app_updateSummonerName={this.props.app_updateSummonerName}
                            app_updateServer={this.props.app_updateServer}
                            app_summonerName={this.props.app_summonerName}
                            app_updateVerify={this.props.app_updateVerify}
                            app_verified={this.props.app_verified}
                            app_sessionToken={this.props.app_sessionToken}
                            refresh={this.refresh}
                        />
                        :
                        <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                            <Group position='apart'>
                                <Group>
                                    <Avatar
                                        size='lg'
                                        radius='xl'
                                        src={`${baseUrl}${this.props.app_patch}/img/profileicon/${this.state.summonerIcon}.png`} alt='its me'
                                    />
                                    <Title order={4}>
                                        {this.props.app_summonerName}
                                        {Object.values(serversList).map(v => {
                                            if (v.value === this.props.app_server) return (<Badge key={v.value} sx={{ marginLeft: '0.5rem' }} radius='xs' className={v.label} variant='filled'>{v.label}</Badge>)
                                            return null;
                                        })}
                                        {this.state.rank !== undefined ?
                                            <Badge radius='xs' sx={{ marginLeft: '0.5rem' }} variant='filled' className={`${this.state.rankClass}`}>{this.state.rank}</Badge>
                                            :
                                            ''}
                                    </Title>
                                </Group>

                                {this.props.app_verified ? <Badge radius='xs' variant='filled' size='lg' color='green'>verified</Badge> : <Badge radius='xs' variant='filled' color='red'>not verified</Badge>}
                            </Group>

                        </Paper>
                    }
                    <Space h='xl' />
                    {this.props.app_verified && this.props.app_summonerName !== null ?
                        <>
                            <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                                <Group position='apart'>
                                    <Title order={4}>Top Champions</Title>
                                    {this.state.topChamps !== null && this.state.topChamps !== undefined ?
                                        <Group>
                                            <Avatar radius='xs' src={`${baseUrl}${this.props.app_patch}/img/champion/${this.props.app_championIdsToName[`n${this.state.topChamps![0]}`]}.png`} />
                                            <Avatar radius='xs' src={`${baseUrl}${this.props.app_patch}/img/champion/${this.props.app_championIdsToName[`n${this.state.topChamps![1]}`]}.png`} />
                                            <Avatar radius='xs' src={`${baseUrl}${this.props.app_patch}/img/champion/${this.props.app_championIdsToName[`n${this.state.topChamps![2]}`]}.png`} />
                                        </Group>
                                        :
                                        ''}

                                </Group>
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
                                <TextInput icon={<FontAwesomeIcon icon={faDiscord} />} placeholder='mydiscord#1234' value={this.state.discord} onChange={this.discordChange} />
                            </Paper>
                            <Space h='xl' />
                            <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                                <Title order={4}>Game Modes</Title>
                                <Space h='md' />
                                <Chips size='sm' value={this.state.gameModes} onChange={this.gameModeChange} multiple color='orange'>
                                    <Chip value='Ranked Solo/Duo'>ranked solo/duo</Chip>
                                    <Chip value='Ranked Flex'>ranked flex</Chip>
                                    <Chip value='Normal Blind'>normal blind</Chip>
                                    <Chip value='Normal Draft'>normal draft</Chip>
                                    <Chip value='RGM'>rotating game mode</Chip>
                                    <Chip value='ARAM'>aram</Chip>
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
                            <Space h='xl' />
                            <Center><Button loading={this.state.loading} onClick={this.saveProfile} size='lg' color='orange'>save</Button></Center>
                            {this.state.notification ? <Alert sx={{ marginTop: '1rem' }} color={this.state.color} variant='filled'>{this.state.notification}</Alert> : ''}
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