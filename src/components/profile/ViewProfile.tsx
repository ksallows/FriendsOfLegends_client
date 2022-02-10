import React from 'react';
import APIURL from '../../helpers/environment'
import { Title, Grid, Space, Paper, Badge, Group, Avatar, SimpleGrid, Text } from '@mantine/core';
import { rankToCSS, baseUrl, ChampionIdData, serversList } from '../../d';
import all from '../../assets/all.svg'
import jungle from '../../assets/jungle.svg'
import mid from '../../assets/mid.svg'
import support from '../../assets/support.svg'
import bottom from '../../assets/bottom.svg'
import top from '../../assets/top.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDiscord } from '@fortawesome/free-brands-svg-icons'

interface ViewProfileProps {
    app_sessionToken: string | null,
    app_patch: string | null,
    app_championIdsToName: ChampionIdData
}

interface ViewProfileState {
    profileId: string | undefined,
    profileData: Data | undefined,
    rankClass: string | undefined
}

interface Data {
    profileId: string,
    summonerIcon: number,
    discord: string,
    level: number,
    gameModes: string[],
    topChamps: string[],
    summonerName: string,
    voiceComm: boolean | null,
    roles: string[],
    rank: string,
    description: string,
    server: string | undefined
}

class ViewProfile extends React.Component<ViewProfileProps, ViewProfileState> {
    constructor(props: ViewProfileProps) {
        super(props);

        this.state = {
            profileId: window.location.pathname.slice(-36),
            profileData: undefined,
            rankClass: undefined
        }
    }

    topChamps = (): JSX.Element[] | false => {
        let champs: JSX.Element[] = []
        if (this.state.profileData?.topChamps) {
            for (let i = 0; i < this.state.profileData.topChamps.length; i++) {
                champs.push(<Avatar radius='xs' src={`${baseUrl}${this.props.app_patch}/img/champion/${this.props.app_championIdsToName[`n${this.state.profileData.topChamps[i]}`]}.png`} />)
            }
            return champs;
        }
        else return false
    }

    roles = (): JSX.Element[] | JSX.Element => {
        let roles: JSX.Element[] = []

        if (this.state.profileData?.roles) {
            for (let i = 0; i < this.state.profileData.roles.length; i++) {
                switch (this.state.profileData.roles[i]) {
                    case 'top': roles.push(<Avatar src={top} />); break;
                    case 'mid': roles.push(<Avatar src={mid} />); break;
                    case 'sup': roles.push(<Avatar src={support} />); break;
                    case 'jng': roles.push(<Avatar src={jungle} />); break;
                    case 'bot': roles.push(<Avatar src={bottom} />); break;
                }
            }
            return roles;
        }
        else return <Avatar src={all} />
    }

    gameModes = () => {
        let gameModes: JSX.Element[] = [];
        if (this.state.profileData?.gameModes) {
            for (let i = 0; i < this.state.profileData.gameModes.length; i++) {
                gameModes.push(<Badge color='orange' variant='filled' size='md'>{this.state.profileData.gameModes[i]}</Badge>)
            }
            return gameModes;
        }
        else return <Badge color='orange' variant='filled' size='md'>any</Badge>
    }

    componentDidMount = async () => {
        setTimeout(async () => {
            await fetch(`${APIURL}/profile/p/${this.state.profileId}`, {
                method: 'GET',
                mode: 'cors',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.props.app_sessionToken}`
                })
            })
                .then(result => result.json())
                .then(result => { this.setState({ profileData: result.profile, rankClass: rankToCSS(result.profile.rank) }) })
        }, 500)

    }

    render() {
        return (
            <Grid>
                <Grid.Col sx={{ paddingTop: 40 }} xs={10} md={8} lg={6} xl={6} offsetXs={1} offsetMd={2} offsetLg={3} offsetXl={3}>
                    <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                        <Group position='apart'>
                            <Group>
                                <Avatar
                                    size='lg'
                                    radius='xl'
                                    src={`${baseUrl}${this.props.app_patch}/img/profileicon/${this.state.profileData?.summonerIcon}.png`} alt='its me'
                                />
                                <Title order={4}>

                                    {this.state.profileData?.summonerName}

                                    {Object.values(serversList).map(v => {
                                        if (v.value === this.state.profileData?.server) return (<Badge key={v.value} sx={{ marginLeft: '0.5rem' }} radius='xs' className={v.label} variant='filled'>{v.label}</Badge>)
                                    })}

                                    <Badge radius='xs' sx={{ marginLeft: '0.5rem' }} variant='filled' className={`${this.state.rankClass}`}>{this.state.profileData?.rank}</Badge>

                                </Title>
                            </Group>
                            <Text sx={{ marginRight: '0.5rem' }}>{this.state.profileData?.discord !== undefined ? <><FontAwesomeIcon icon={faDiscord} /> {this.state.profileData?.discord}</> : ''}</Text>
                        </Group>
                    </Paper>
                    <Space h='xl' />
                    <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                        <p>{this.state.profileData?.description}</p>
                    </Paper>
                    <Space h='xl' />
                    <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                        <SimpleGrid cols={3}>
                            <Group direction='column'>
                                <Title order={4}>TOP CHAMPS</Title>
                                <Group>{this.topChamps()}</Group>
                            </Group>
                            <Group direction='column'>
                                <Title order={4}>ROLES</Title>
                                <Group>{this.roles()}</Group>
                            </Group>
                            <Group direction='column'>
                                <Title order={4}>GAME MODES</Title>
                                <Group>
                                    {this.gameModes()}
                                </Group>
                            </Group>
                        </SimpleGrid>
                    </Paper>
                    <Space h='xl' />
                    <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                        <Title order={4}>Comments</Title>

                    </Paper>
                </Grid.Col>
            </Grid>
        )
    }
}

export default ViewProfile;