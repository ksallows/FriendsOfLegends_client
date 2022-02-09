import React from 'react';
import ResultBlock from './ResultBlock'
import { ChampionIdData, Result } from '../../d'
import { Space } from '@mantine/core';

interface SearchResultsState { }

interface SearchResultsProps {
    search_results: any | null,
    app_patch: string | null,
    app_championIdsToName: ChampionIdData
}

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
                {this.props.search_results !== null ?

                    Object.keys(this.props.search_results.matches).map((key, index) => (
                        <><ResultBlock
                            key={index}
                            app_championIdsToName={this.props.app_championIdsToName}
                            app_patch={this.props.app_patch}
                            search_result={this.props.search_results.matches[index]} />
                            <Space h='xl'></Space>
                        </>
                    ))
                    :
                    ''
                }
            </>
        )
    }
}

export default SearchResults;