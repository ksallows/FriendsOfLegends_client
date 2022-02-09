import APIURL from '../../helpers/environment'
import React from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { Grid } from '@mantine/core';
import { ChampionListData, ChampionIdData, Filter, Result } from '../../d'

interface SearchState {
    search_prevSearch: boolean,
    search_voiceComm: boolean | null,
    search_roles: string[] | undefined,
    search_rank: string[] | undefined,
    search_champions: string[] | undefined,
    search_gameModes: string[] | undefined,
    search_results: any | null,

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
            search_prevSearch: false,
            search_voiceComm: null,
            search_roles: [],
            search_rank: [],
            search_champions: [],
            search_gameModes: [],
            search_results: null,
        }
    }

    submitSearch = async () => {
        let newRankArray: string[] = []
        let numerals = ['III', 'II', 'I', 'IV']
        if (this.state.search_rank !== undefined) {
            this.state.search_rank.map((rank) => {
                if (rank !== 'UNRANKED')
                    numerals.map(numeral => newRankArray.push(`${rank} ${numeral}`))
                else newRankArray.push('UNRANKED')
            })
        }
        await fetch(`${APIURL}/profile/find`, {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                fields: {
                    server: 'na1',
                    gameModes: this.state.search_gameModes,
                    rank: newRankArray,
                    voiceComm: this.state.search_voiceComm,
                    topChamps: this.state.search_champions,
                    roles: this.state.search_roles,
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.props.app_sessionToken}`
            })
        })
            .then(result => result.json())
            .then(result => this.setState({ search_results: result }))
    }

    voiceCommChange = (value: string) => this.setState({ search_voiceComm: value === 'null' ? null : value === 'true' ? true : false })

    rolesChange = (value: string[]) => this.setState({ search_roles: value })

    rankChange = (value: string[]) => this.setState({ search_rank: value })

    gameModeChange = (value: string[]) => this.setState({ search_gameModes: value })

    championsChange = (value: []) => this.setState({ search_champions: value })

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
                        search_voiceComm={this.state.search_voiceComm}
                        search_roles={this.state.search_roles}
                        search_champions={this.state.search_champions}
                        search_gameModes={this.state.search_gameModes}
                        search_rank={this.state.search_rank}
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
                    {this.state.search_results !== null ?
                        <SearchResults
                            app_patch={this.props.app_patch}
                            search_results={this.state.search_results}
                            app_championIdsToName={this.props.app_championIdsToName}
                        />
                        :
                        <></>
                    }
                </Grid.Col>
            </Grid>
        )
    }
}

export default Search;