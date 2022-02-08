import APIURL from '../../helpers/environment'
import React from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { Grid } from '@mantine/core';
import { ChampionListData, ChampionIdData, Filter, Result } from '../../d'

interface SearchState {
    prevSearch: boolean,
    voiceComm: boolean | null,
    roles: string[] | undefined,
    rank: string[] | undefined,
    champions: string[] | undefined,
    gameModes: string[] | undefined,
    results: Result[] | null,

}

type SearchProps = {
    app_auth: () => boolean,
    app_sessionToken: string | null,
    app_patch: string | null,
    app_championNameList: string[] | null,
    app_championValues: ChampionListData[] | null,
    app_championIdsToName: ChampionIdData
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
            results: null,

        }
    }

    submitSearch = async () => {
        let newRankArray: string[] = []
        let numerals = ['I', 'II', 'III', 'VI']

        if (this.state.rank !== undefined) {
            this.state.rank.map((rank) => {
                if (rank !== 'UNRANKED')
                    numerals.map(numeral => newRankArray.push(`${rank} ${numeral}`))
                else newRankArray.push('UNRANKED')
            })
        }

        //console.log(`new array: ${newRankArray}`)

        console.log(
            {
                server: 'na1',
                gameModes: this.state.gameModes,
                rank: newRankArray,
                voiceComm: this.state.voiceComm,
                topChamps: this.state.champions,
                roles: this.state.roles,
            })
        await fetch(`${APIURL}/profile/find`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                fields: {
                    server: 'na1',
                    gameModes: this.state.gameModes,
                    rank: newRankArray,
                    voiceComm: this.state.voiceComm,
                    topChamps: this.state.champions,
                    roles: this.state.roles,
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
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
                        app_sessionToken={this.props.app_sessionToken}
                        app_auth={this.props.app_auth}
                        search_voiceCommChange={this.voiceCommChange}
                        search_rolesChange={this.rolesChange}
                        search_rankChange={this.rankChange}
                        search_gameModeChange={this.gameModeChange}
                        search_championsChange={this.championsChange}
                        search_submitSearch={this.submitSearch}
                        search_voiceComm={this.state.voiceComm}
                        search_roles={this.state.roles}
                        search_champions={this.state.champions}
                        search_gameModes={this.state.gameModes}
                        search_rank={this.state.rank}
                        app_patch={this.props.app_patch}
                        app_championNameList={this.props.app_championNameList}
                        app_championValues={this.props.app_championValues}
                    />
                </Grid.Col>
                <Grid.Col
                    xs={10}
                    md={8}
                    lg={6}
                    xl={8}
                >
                    <SearchResults
                        app_patch={this.props.app_patch}
                        search_results={this.state.results}
                        app_championIdsToName={this.props.app_championIdsToName}
                    />
                </Grid.Col>
            </Grid>
        )
    }
}

export default Search;