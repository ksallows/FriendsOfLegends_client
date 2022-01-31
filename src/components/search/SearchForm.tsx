import APIURL from '../../helpers/environment'
import React from 'react';
import { SegmentedControl, Title, Space, Chips, Chip, MultiSelect, Button, Center } from '@mantine/core';

interface SearchFormState {

}
interface SearchFormProps {
    auth: () => boolean,
    submitSearch: () => void,
    sessionToken: string | null,
    voiceCommChange: (value: string) => void,
    rolesChange: (value: string[]) => void,
    rankChange: (value: string[]) => void,
    gameModeChange: (value: string[]) => void,
    championsChange: (value: []) => void,
    voiceComm: boolean | null,
    roles: string[] | undefined,
    rank: string[] | undefined,
    champions: string[] | undefined,
    gameModes: string[] | undefined,
    patch: string | null,
    championNameList: string[] | null,
    championValues: ChampionListData[] | null
}

interface ChampionListData { value: string, label: string }

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
                <Chips size='sm' value={this.props.gameModes} onChange={this.props.gameModeChange} multiple color='orange'>
                    <Chip value='ranked_solo_duo'>ranked solo/duo</Chip>
                    <Chip value='ranked_flex'>ranked flex</Chip>
                    <Chip value='normal_blind'>normal blind</Chip>
                    <Chip value='normal_draft'>normal draft</Chip>
                    <Chip value='rgm'>rotating game mode</Chip>
                </Chips>
                <Space h='xl' />
                <Title order={4}>Rank</Title>
                <Space h='md' />
                <Chips size='sm' value={this.props.rank} onChange={this.props.rankChange} multiple color='orange'>
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
                    value={String(this.props.voiceComm)}
                    onChange={this.props.voiceCommChange}
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
                <Chips size='sm' value={this.props.roles} onChange={this.props.rolesChange} multiple color='orange'>
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
                    data={this.props.championValues !== null ? this.props.championValues : [{ value: 'loading', label: 'loading' }]}
                    placeholder='choose up to 3'
                    onChange={this.props.championsChange}
                    value={this.props.champions}
                />
                <Space h='xl' />
                <Center><Button size='md' color='orange' onClick={this.props.submitSearch}>search</Button></Center>
            </>
        )
    }
}

export default SearchForm;