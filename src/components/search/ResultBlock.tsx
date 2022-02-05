import React from 'react';
import { Paper, Title, Space, Avatar, Group, Badge, SimpleGrid, Tooltip } from '@mantine/core';
import { Result, ChampionIdData, baseUrl } from '../../d'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'
import all from '../../assets/all.svg'
import jungle from '../../assets/jungle.svg'
import mid from '../../assets/mid.svg'
import support from '../../assets/support.svg'
import bottom from '../../assets/bottom.svg'
import top from '../../assets/top.svg'

interface ResultBlockState {
    rankClass: string | null
}

interface ResultBlockProps {
    result: Result,
    patch: string | null,
    championIdsToName: ChampionIdData
}

class ResultBlock extends React.Component<ResultBlockProps, ResultBlockState> {
    constructor(props: ResultBlockProps) {
        super(props);
        this.state = {
            rankClass: null
        }
    }

    topChamps = (): JSX.Element[] => {
        let champs: JSX.Element[] = []
        for (let i = 0; i < this.props.result.topChamps.length; i++) {
            champs.push(<Avatar radius='xs' src={`${baseUrl}${this.props.patch}/img/champion/${this.props.championIdsToName[`n${this.props.result.topChamps[i]}`]}.png`} />)
        }
        return champs;
    }

    roles = (): JSX.Element[] | JSX.Element => {
        let roles: JSX.Element[] = []
        if (this.props.result.roles !== null) {
            for (let i = 0; i < this.props.result.roles.length; i++) {
                switch (this.props.result.roles[i]) {
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
        if (this.props.result.gameModes !== null) {
            for (let i = 0; i < this.props.result.gameModes.length; i++) {
                gameModes.push(<Badge color='orange' variant='filled' size='md'>{this.props.result.gameModes[i]}</Badge>)
            }
            return gameModes;
        }
        else return <Badge color='orange' variant='filled' size='md'>any</Badge>
    }

    componentDidMount = () => {
        switch (this.props.result.rank.substring(0, 2)) {
            case 'Un': this.setState({ rankClass: 'unranked' }); break;
            case 'Ir': this.setState({ rankClass: 'iron' }); break;
            case 'Br': this.setState({ rankClass: 'bronze' }); break;
            case 'Si': this.setState({ rankClass: 'silver' }); break;
            case 'Go': this.setState({ rankClass: 'gold' }); break;
            case 'Pl': this.setState({ rankClass: 'platinum' }); break;
            case 'Di': this.setState({ rankClass: 'diamond' }); break;
            case 'Ma': this.setState({ rankClass: 'master' }); break;
            case 'Gr': this.setState({ rankClass: 'grandmaster' }); break;
            case 'Ch': this.setState({ rankClass: 'challenger' }); break;
        }
    }

    render() {
        return (
            <Paper sx={{ backgroundColor: '#1f2023' }} padding='md' shadow='sm' withBorder>
                <Group>
                    <Avatar
                        size='lg'
                        radius='xl'
                        src={`${baseUrl}${this.props.patch}/img/profileicon/${this.props.result.summonerIcon}.png`} alt='its me'
                    />
                    <Title order={3}>{this.props.result.summonerName}</Title>
                    <Badge variant='filled' className={`${this.state.rankClass}`}>{this.props.result.rank}</Badge>
                    {this.props.result.voiceComm === null ? '' :
                        this.props.result.voiceComm === true ? <Tooltip withArrow color='orange' label='wants to voice chat'><FontAwesomeIcon size='lg' icon={faMicrophone} color="green" /></Tooltip> :
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