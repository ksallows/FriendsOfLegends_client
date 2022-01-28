import React from 'react';
import { Paper, Title, Space, Avatar, Group } from '@mantine/core';

const summonerIconUrl = 'http://ddragon.leagueoflegends.com/cdn/12.2.1/img/profileicon/'

type ResultBlockState = {

}

type ResultBlockProps = {
    result: any;
}

type Result = {
    profileId: string,
    summonerIcon: number,
    level: number,
    rank: string,
    topChamps: number[],
    roles: string[],
    voiceComm: boolean,
    gameModes: string[],
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
                    <Avatar radius={'xl'} src={`${summonerIconUrl}${this.props.result.summonerIcon}.png`} alt='its me' />
                    <Title order={4}>{this.props.result.summonerName}</Title>
                </Group>
            </Paper>
        )
    }
}

export default ResultBlock;