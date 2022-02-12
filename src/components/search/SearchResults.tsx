import React from 'react';
import ResultBlock from './ResultBlock'
import { ChampionIdData } from '../../d'
import { Space, Pagination } from '@mantine/core';
import { useState } from 'react';

interface SearchResultsProps {
    search_results: any | null,
    app_patch: string | null,
    app_championIdsToName: ChampionIdData
}

const SearchResults = ({ search_results, app_patch, app_championIdsToName }: SearchResultsProps) => {

    const [activePage, setPage] = useState(1);

    return (
        <> {search_results !== null && search_results.length > 10 ? <Pagination total={search_results.length / 10} page={activePage} onChange={setPage} /> : ''}
            {search_results !== null ?
                Object.keys(search_results.matches).map((key, index) => (
                    <>
                        <ResultBlock
                            key={index}
                            app_championIdsToName={app_championIdsToName}
                            app_patch={app_patch}
                            search_result={search_results.matches[index]} />
                        <Space h='xl'></Space>
                    </>
                ))
                :
                ''
            }
        </>
    )
}

export default SearchResults;