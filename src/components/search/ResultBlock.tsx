import React from 'react';
import { Paper, Title, Space, Avatar, Group, Badge, SimpleGrid, Tooltip } from '@mantine/core';
import { Result, ChampionIdData } from './d'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone, faMicrophoneSlash } from '@fortawesome/free-solid-svg-icons'

const url = 'http://ddragon.leagueoflegends.com/cdn/'

type ResultBlockState = {}

interface ResultBlockProps {
    result: Result,
    patch: string | null,
    championIdsToName: ChampionIdData
}

class ResultBlock extends React.Component<ResultBlockProps, ResultBlockState> {
    constructor(props: ResultBlockProps) {
        super(props);
        this.state = {

        }
    }

    topChamps = (): any => {
        let champs = []
        for (let i = 0; i < this.props.result.topChamps.length; i++) {
            champs.push(<Avatar radius='xs' src={`${url}${this.props.patch}/img/champion/${this.props.championIdsToName[`n${this.props.result.topChamps[i]}`]}.png`} />)
        }
        return champs;
    }

    render() {
        return (
            <Paper padding='md' shadow='sm' withBorder>
                <Group>
                    <Avatar
                        size='lg'
                        radius='xl'
                        src={`${url}${this.props.patch}/img/profileicon/${this.props.result.summonerIcon}.png`} alt='its me'
                    />
                    <Title order={4}>{this.props.result.summonerName}</Title>
                    {this.props.result.voiceComm === null ? '' :
                        this.props.result.voiceComm === true ? <Tooltip withArrow color='orange' label='wants to voice chat'><FontAwesomeIcon size='lg' icon={faMicrophone} color="green" /></Tooltip> :
                            <Tooltip withArrow color='orange' label='does not want to voice chat'><FontAwesomeIcon icon={faMicrophoneSlash} color="red" /></Tooltip>}
                </Group>
                <Space h='xl' />
                <SimpleGrid cols={3}>
                    <Group direction='column'>
                        <Title order={4}>TOP CHAMPS</Title>
                        <Group>{this.topChamps()}</Group>
                    </Group>
                    <Group direction='column'>
                        <Title order={4}>ROLES</Title>
                        <Group>{this.topChamps()}</Group>
                    </Group>
                    <Group direction='column'>
                        <Title order={4}>GAME MODES</Title>
                        <Group>
                            <Badge color='orange' variant='filled' size='md'>Ranked Solo/Duo</Badge>
                            <Badge color='orange' variant='filled' size='md'>Normal Draft</Badge>
                        </Group>
                    </Group>
                </SimpleGrid>
            </Paper>
        )
    }
}

export default ResultBlock;