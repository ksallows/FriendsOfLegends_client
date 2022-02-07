import React from 'react';
import ResultBlock from './ResultBlock'
import { ChampionIdData, Result } from '../../d'

interface SearchResultsState { }

interface SearchResultsProps {
    search_results: Result[] | null,
    app_patch: string | null,
    app_championIdsToName: ChampionIdData
}

const dummyData = [
    {
        "profileId": "24f5cec9-6084-4cb7-bcac-fd0b03dd3beb",
        "summonerIcon": 4413,
        "level": 214,
        "rank": "GRANDMASTER",
        "topChamps": [
            "222",
            "17",
            "150"
        ],
        "roles": ['top', 'jungle', 'mid', 'bottom', 'support'],
        "voiceComm": false,
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
                <ResultBlock app_championIdsToName={this.props.app_championIdsToName} app_patch={this.props.app_patch} search_result={dummyData[0]} />
            </>
        )
    }
}

export default SearchResults;