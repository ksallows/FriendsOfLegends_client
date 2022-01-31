import APIURL from '../../helpers/environment'
import React from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';
import { Grid } from '@mantine/core';
import { ChampionListData, ChampionIdData, Filter, ResultsList } from './d'

const dataUrl: string = 'http://ddragon.leagueoflegends.com/cdn/'

interface SearchState {
    prevSearch: boolean,
    voiceComm: boolean | null,
    roles: string[] | undefined,
    rank: string[] | undefined,
    champions: string[] | undefined,
    gameModes: string[] | undefined,
    results: ResultsList[] | null,
    championNameList: string[] | null,
    championValues: ChampionListData[] | null,
    championIdsToName: ChampionIdData
}

type SearchProps = {
    auth: () => boolean,
    sessionToken: string | null,
    patch: string | null
}

const filters: Filter = {
    MonkeyKing: 'Wukong',
    Reksai: 'Rek\'Sai',
    Kaisa: 'Kai\'Sa',
    Velkoz: 'Vel\'Koz',
    Khazix: 'Kha\'Zix',
    AurelionSol: 'Aurelion Sol',
    TahmKench: 'Tahm Kench',
    Kogmaw: 'Kog\'Maw'
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
            championNameList: null, // 1 dimensional array of all champ names    
            championValues: null,   // {{label: 'Aatrox', value: '266'}, ...}
            championIdsToName: { n0: '' } // {n266: 'AAtrox, ...}
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
        for (let i = 0; i < 5 || this.state.championValues !== null; i++) {
            setTimeout(async () => {
                if (this.props.patch !== null) {
                    await fetch(`${dataUrl}${this.props.patch}/data/en_US/champion.json`)
                        .then(result => result.json())
                        .then(result => {
                            this.setState({ championNameList: Object.keys(result.data) })
                            let champData: ChampionListData[] = [];
                            let champIds: ChampionIdData = {}
                            Object.keys(result.data).map(key => {
                                champData.push({ value: result.data[key].key, label: Object.keys(filters).includes(result.data[key].id) ? filters[key] : result.data[key].id });
                                champIds[`n${result.data[key].key}`] = result.data[key].id
                                return null
                            })
                            this.setState({ championValues: champData, championIdsToName: champIds })
                        })
                }
            }, 1000)
        }
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
                        patch={this.props.patch}
                        championNameList={this.state.championNameList}
                        championValues={this.state.championValues}
                    />
                </Grid.Col>
                <Grid.Col
                    xs={10}
                    md={8}
                    lg={6}
                    xl={8}
                >
                    <SearchResults
                        patch={this.props.patch}
                        results={this.state.results}
                        championIdsToName={this.state.championIdsToName}
                    />
                </Grid.Col>
            </Grid>
        )
    }
}

export default Search;