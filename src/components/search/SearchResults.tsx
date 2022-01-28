import React from 'react';
import ResultBlock from './ResultBlock'

type SearchResultsState = {

}

type SearchResultsProps = {
    results: ResultsList[] | null
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
                <ResultBlock result={dummyData[0]} />
            </>
        )
    }
}

export default SearchResults;