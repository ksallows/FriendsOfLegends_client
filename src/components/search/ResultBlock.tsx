import React from 'react';
import { Paper, Title, Space, Avatar, Group, Badge, SimpleGrid, Tooltip } from '@mantine/core';
import { Result, ChampionIdData, baseUrl, rankToCSS } from '../../d'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'
import all from '../../assets/all.svg'
import jungle from '../../assets/jungle.svg'
import mid from '../../assets/mid.svg'
import support from '../../assets/support.svg'
import bottom from '../../assets/bottom.svg'
import top from '../../assets/top.svg'

interface ResultBlockState {
    rankClass: string | undefined
}

interface ResultBlockProps {
    search_result: Result,
    app_patch: string | null,
    app_championIdsToName: ChampionIdData
}

class ResultBlock extends React.Component<ResultBlockProps, ResultBlockState> {
    constructor(props: ResultBlockProps) {
        super(props);
        this.state = {
            rankClass: undefined
        }
    }

    topChamps = (): JSX.Element[] => {
        let champs: JSX.Element[] = []
        for (let i = 0; i < this.props.search_result.topChamps.length; i++) {
            champs.push(<Avatar radius='xs' src={`${baseUrl}${this.props.app_patch}/img/champion/${this.props.app_championIdsToName[`n${this.props.search_result.topChamps[i]}`]}.png`} />)
        }
        return champs;
    }

    roles = (): JSX.Element[] | JSX.Element => {
        let roles: JSX.Element[] = []
        if (this.props.search_result.roles !== null) {
            for (let i = 0; i < this.props.search_result.roles.length; i++) {
                switch (this.props.search_result.roles[i]) {
                    case 'top': roles.push(<Avatar src={top} />); break;
                    case 'mid': roles.push(<Avatar src={mid} />); break;
                    case 'support': roles.push(<Avatar src={support} />); break;
                    case 'jungle': roles.push(<Avatar src={jungle} />); break;
                    case 'bottom': roles.push(<Avatar src={bottom} />); break;
                }
            }
            return roles;
        }
        else return <Avatar src={all} />
    }

    gameModes = () => {
        let gameModes: JSX.Element[] = [];
        if (this.props.search_result.gameModes !== null) {
            for (let i = 0; i < this.props.search_result.gameModes.length; i++) {
                gameModes.push(<Badge color='orange' variant='filled' size='md'>{this.props.search_result.gameModes[i]}</Badge>)
            }
            return gameModes;
        }
        else return <Badge color='orange' variant='filled' size='md'>any</Badge>
    }

    componentDidMount = () => {
        this.setState({ rankClass: rankToCSS(this.props.search_result.rank) });
    }

    render() {
        return (
            <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                <Group>
                    <Avatar
                        size='lg'
                        radius='xl'
                        src={`${baseUrl}${this.props.app_patch}/img/profileicon/${this.props.search_result.summonerIcon}.png`} alt='its me'
                    />
                    <Title order={3}>{this.props.search_result.summonerName}</Title>
                    <Badge variant='filled' className={`${this.state.rankClass}`}>{this.props.search_result.rank}</Badge>
                    {this.props.search_result.voiceComm === null ? '' :
                        this.props.search_result.voiceComm === true ? <Tooltip withArrow color='orange' label='wants to voice chat'><FontAwesomeIcon size='lg' icon={faMicrophone} color="green" /></Tooltip> :
                            <Tooltip withArrow color='orange' label='does not want to voice chat'><FontAwesomeIcon icon={faMicrophoneSlash} color="red" /></Tooltip>
                    }
                </Group>
                <Space h='xl' />
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
        )
    }
}

export default ResultBlock;