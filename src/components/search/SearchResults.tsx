import ResultBlock from './ResultBlock'
import { ChampionIdData } from '../../d'
import { Space, Pagination, Paper } from '@mantine/core';
import { useState } from 'react';

interface SearchResultsProps {
    search_results: any | null,
    app_patch: string | null,
    app_championIdsToName: ChampionIdData,
    search_status: string
}

const SearchResults = ({ search_results, app_patch, app_championIdsToName, search_status }: SearchResultsProps) => {

    const [activePage, setPage] = useState(1);

    return (
        <>
            {search_status === 'initial' ?
                <Paper sx={{ backgroundColor: '#1f2023', textAlign: 'center' }} padding='md' shadow='sm' withBorder>
                    Use the controls to search!
                </Paper>
                :
                search_status === 'no results' ?
                    <Paper sx={{ backgroundColor: '#1f2023', textAlign: 'center' }} padding='md' shadow='sm' withBorder>
                        Sorry, there were no results!
                    </Paper>
                    :
                    <>
                        {search_results !== null && search_results.matches.length > 4 ?
                            <>
                                <Pagination color='orange' total={Math.ceil(search_results.matches.length / 4)} page={activePage} onChange={setPage} />
                                <Space h='md' />
                            </>
                            :
                            ''
                        }
                        {search_results !== null ?
                            Object.keys(search_results.matches).map((key, index) => (
                                <>
                                    {index < (activePage * 4) && index > ((activePage - 1) * 4 - 1) ?
                                        <>
                                            <ResultBlock
                                                key={key}
                                                app_championIdsToName={app_championIdsToName}
                                                app_patch={app_patch}
                                                search_result={search_results.matches[index]} />
                                            <Space h='xl'></Space>
                                        </>
                                        :
                                        ''
                                    }

                                </>
                            ))
                            :
                            ''
                        }
                    </>
            }
        </>
    )
}

export default SearchResults;