import React from 'react';
import { Paper, Title, Space, Avatar, Group } from '@mantine/core';

const summonerIconUrl = 'http://ddragon.leagueoflegends.com/cdn/'

type ResultBlockState = {

}

type ResultBlockProps = {
    result: Result,
    patch: string | null
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

    componentDidMount = async () => {
    }

    render() {
        return (
            <Paper padding='md' shadow='sm' withBorder>
                <Group>
                    <Avatar radius={'xl'} src={`${summonerIconUrl}${this.props.patch}/img/profileicon/${this.props.result.summonerIcon}.png`} alt='its me' />
                    <Title order={4}>{this.props.result.summonerName}</Title>
                </Group>
            </Paper>
        )
    }
}

export default ResultBlock;