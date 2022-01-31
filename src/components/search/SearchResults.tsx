import React from 'react';
import ResultBlock from './ResultBlock'

interface SearchResultsState {

}

interface SearchResultsProps {
    results: ResultsList[] | null,
    patch: string | null,
    championIdsToName: ChampionIdData
}

interface ChampionIdData { [key: string]: string }

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

const dummyData = [
    {
        "profileId": "24f5cec9-6084-4cb7-bcac-fd0b03dd3beb",
        "summonerIcon": 4413,
        "level": 214,
        "rank": "Unranked",
        "topChamps": [
            "222",
            "17",
            "150"
        ],
        "roles": null,
        "voiceComm": null,
        "gameModes": null,
        'summonerName': 'summ name'
    }
]

class SearchResults extends React.Component<SearchResultsProps, SearchResultsState> {
    constructor(props: SearchResultsProps) {
        super(props);
        this.state = {

        }
    }

    componentDidMount = async () => {

    }

    render() {
        return (
            <>
                <ResultBlock championIdsToName={this.props.championIdsToName} patch={this.props.patch} result={dummyData[0]} />
            </>
        )
    }
}

export default SearchResults;