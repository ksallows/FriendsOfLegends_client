import React from 'react';
import { Paper, Title, Space, Avatar, Group, Badge, SimpleGrid } from '@mantine/core';

const url = 'http://ddragon.leagueoflegends.com/cdn/'

type ResultBlockState = {

}

type ResultBlockProps = {
    result: Result,
    patch: string | null,
    championIdsToName: ChampionIdData
}

interface ChampionIdData {
    [key: string]: string
}

type Result = {
    profileId: string,
    summonerIcon: number,
    level: number,
    rank: string,
    topChamps: string[],
    roles: string[] | null,
    voiceComm: boolean | null,
    gameModes: string[] | null,
    summonerName: string
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