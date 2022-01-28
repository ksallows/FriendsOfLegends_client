import APIURL from '../../helpers/environment'
import React from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { Grid } from '@mantine/core';

type SearchState = {
    prevSearch: boolean,
    voiceComm: boolean | null,
    roles: string[] | undefined,
    rank: string[] | undefined,
    champions: string[] | undefined,
    gameModes: string[] | undefined,
    results: ResultsList[] | null
}

type SearchProps = {
    auth: () => boolean,
    sessionToken: string | null
}

type ResultsList = {
    profileId: string,
    summonerIcon: number,
    level: number,
    rank: string,
    topChamps: number[],
    roles: string[],
    voiceComm: boolean,
    gameModes: string[]
}

class Search extends React.Component<SearchProps, SearchState> {
    constructor(props: SearchProps) {
        super(props);
        this.state = {
            prevSearch: false,
            voiceComm: null,
            roles: [],
            rank: [],
            champions: [],
            gameModes: [],
            results: null
        }
    }

    submitSearch = async () => {
        await fetch(`${APIURL}/profile/find`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                fields: {
                    server: 'na1',
                    gameModes: this.state.gameModes,
                    rank: this.state.rank,
                    voiceComm: this.state.voiceComm,
                    topChamps: this.state.champions,
                    roles: this.state.roles,
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.sessionToken}`
            })
        })
            .then(result => result.json())
            .then(result => console.log(result))
    }

    voiceCommChange = (value: string) => this.setState({ voiceComm: value === 'null' ? null : value === 'true' ? true : false })

    rolesChange = (value: string[]) => this.setState({ roles: value })

    rankChange = (value: string[]) => this.setState({ rank: value })

    gameModeChange = (value: string[]) => this.setState({ gameModes: value })

    championsChange = (value: []) => this.setState({ champions: value })

    componentDidMount = async () => {
    }

    render() {
        return (
            <Grid sx={{ marginTop: '2rem' }} justify='center'>
                <Grid.Col
                    xs={10}
                    md={8}
                    lg={4}
                    xl={2}
                >
                    <SearchForm
                        sessionToken={this.props.sessionToken}
                        auth={this.props.auth}
                        voiceCommChange={this.voiceCommChange}
                        rolesChange={this.rolesChange}
                        rankChange={this.rankChange}
                        gameModeChange={this.gameModeChange}
                        championsChange={this.championsChange}
                        submitSearch={this.submitSearch}
                        voiceComm={this.state.voiceComm}
                        roles={this.state.roles}
                        champions={this.state.champions}
                        gameModes={this.state.gameModes}
                        rank={this.state.rank}
                    />
                </Grid.Col>
                <Grid.Col
                    xs={10}
                    md={8}
                    lg={6}
                    xl={8}
                >
                    <SearchResults results={this.state.results} />
                </Grid.Col>
            </Grid>
        )
    }
}

export default Search;