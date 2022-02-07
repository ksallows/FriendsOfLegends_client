import React from 'react';
import { SegmentedControl, Title, Space, Chips, Chip, MultiSelect, Button, Center } from '@mantine/core';
import { ChampionListData } from '../../d'

interface SearchFormState { }

interface SearchFormProps {
    app_auth: () => boolean,
    search_submitSearch: () => void,
    app_sessionToken: string | null,
    search_voiceCommChange: (value: string) => void,
    search_rolesChange: (value: string[]) => void,
    search_rankChange: (value: string[]) => void,
    search_gameModeChange: (value: string[]) => void,
    search_championsChange: (value: []) => void,
    search_voiceComm: boolean | null,
    search_roles: string[] | undefined,
    search_rank: string[] | undefined,
    search_champions: string[] | undefined,
    search_gameModes: string[] | undefined,
    app_patch: string | null,
    app_championNameList: string[] | null,
    app_championValues: ChampionListData[] | null
}

class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
    constructor(props: SearchFormProps) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <>
                <Title order={4}>Game Modes</Title>
                <Space h='md' />
                <Chips size='sm' value={this.props.search_gameModes} onChange={this.props.search_gameModeChange} multiple color='orange'>
                    <Chip value='ranked_solo_duo'>ranked solo/duo</Chip>
                    <Chip value='ranked_flex'>ranked flex</Chip>
                    <Chip value='normal_blind'>normal blind</Chip>
                    <Chip value='normal_draft'>normal draft</Chip>
                    <Chip value='rgm'>rotating game mode</Chip>
                </Chips>
                <Space h='xl' />
                <Title order={4}>Rank</Title>
                <Space h='md' />
                <Chips size='sm' value={this.props.search_rank} onChange={this.props.search_rankChange} multiple color='orange'>
                    <Chip value='unranked'>unranked</Chip>
                    <Chip value='iron'>iron</Chip>
                    <Chip value='bronze'>bronze</Chip>
                    <Chip value='silver'>silver</Chip>
                    <Chip value='gold'>gold</Chip>
                    <Chip value='platinum'>platinum</Chip>
                    <Chip value='diamond'>diamond</Chip>
                    <Chip value='master'>master+</Chip>
                </Chips>
                <Space h='xl' />
                <Title order={4}>Voice Comm</Title>
                <Space h='md' />
                <SegmentedControl
                    radius='xl'
                    value={String(this.props.search_voiceComm)}
                    onChange={this.props.search_voiceCommChange}
                    data={[
                        { label: 'no preference', value: 'null' },
                        { label: 'yes', value: 'true' },
                        { label: 'no', value: 'false' }
                    ]}
                    fullWidth
                    size='md'
                    color='orange'
                />
                <Space h='xl' />
                <Title order={4}>Roles</Title>
                <Space h='md' />
                <Chips size='sm' value={this.props.search_roles} onChange={this.props.search_rolesChange} multiple color='orange'>
                    <Chip value='top'>top</Chip>
                    <Chip value='jng'>jungle</Chip>
                    <Chip value='mid'>mid</Chip>
                    <Chip value='bot'>bot</Chip>
                    <Chip value='sup'>support</Chip>
                </Chips>
                <Space h='xl' />
                <Title order={4}>Champions</Title>
                <Space h='md' />
                <MultiSelect
                    size='sm'
                    maxSelectedValues={3}
                    searchable limit={20}
                    data={this.props.app_championValues !== null ? this.props.app_championValues : [{ value: 'loading', label: 'loading' }]}
                    placeholder='choose up to 3'
                    onChange={this.props.search_championsChange}
                    value={this.props.search_champions}
                />
                <Space h='xl' />
                <Center><Button size='md' color='orange' onClick={this.props.search_submitSearch}>search</Button></Center>
            </>
        )
    }
}

export default SearchForm;