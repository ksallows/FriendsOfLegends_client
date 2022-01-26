import React from 'react';
import { SegmentedControl, Title, Grid, Space, Chips, Chip, Badge, MultiSelect } from '@mantine/core';

const dataUrl: string = 'http://ddragon.leagueoflegends.com/cdn/12.2.1/data/en_US/champion.json'

const filters: Filter = {
    MonkeyKing: 'Wukong',
    RekSai: 'Rek\'Sai',
    KaiSa: 'Kai\'Sa',
    VelKoz: 'Vel\'Koz',
    KhaZix: 'Kha\'Zix',
    AurelionSol: 'Aurelion Sol',
    TahmKench: 'Tahm Kench'
}

type Filter = { [key: string]: string }
type ChampionListData = { value: string, label: string }
type SearchFormState = {
    voiceComm: boolean | null,
    roles: string[] | undefined,
    rank: string[] | undefined,
    champions: string[] | undefined,
    championNameList: string[] | null,
    championValues: ChampionListData[] | null
}
type SearchFormProps = {
    auth: () => boolean
}

class SearchForm extends React.Component<SearchFormProps, SearchFormState> {
    constructor(props: SearchFormProps) {
        super(props);
        this.state = {
            voiceComm: null,
            roles: [],
            rank: [],
            champions: [],
            championNameList: null,
            championValues: null
        }
    }

    componentDidMount = async () => {
        await fetch(dataUrl)
            .then(result => result.json())
            .then(result => {
                this.setState({ championNameList: Object.keys(result.data) })
                let champData: ChampionListData[] = [];
                Object.keys(result.data).map(key => {
                    if (!Object.keys(filters).includes(result.data[key].id))
                        champData.push({ value: result.data[key].key, label: result.data[key].id })
                    else
                        champData.push({ value: result.data[key].key, label: filters[key] })
                    return null
                })
                this.setState({ championValues: champData })
            })
    }

    voiceCommChange = (value: string) => this.setState({ voiceComm: value === 'null' ? null : value === 'true' ? true : false })

    rolesChange = (value: string[]) => this.setState({ roles: value })

    rankChange = (value: string[]) => this.setState({ roles: value })

    championsChange = (value: []) => this.setState({ champions: value })

    render() {
        return (
            <Grid>
                <Grid.Col
                    sx={{ padding: 20 }}
                    xs={10}
                    md={8}
                    lg={4}
                    xl={4}
                    offsetXs={1}
                    offsetMd={2}
                    offsetLg={4}
                    offsetXl={4}
                >
                    <p>VoiceComm: {String(this.state.voiceComm)}</p>
                    <p>Roles: {String(this.state.roles)}</p>
                    <p>Rank: {String(this.state.rank)}</p>
                    <p>Champions: {String(this.state.champions)}</p>
                    <Title order={3}>Rank</Title>
                    <Space h="md" />
                    <Chips size="md" value={this.state.rank} onChange={this.rankChange} multiple color="orange">
                        <Chip value="unranked">unranked</Chip>
                        <Chip value="iron">iron</Chip>
                        <Chip value="bronze">bronze</Chip>
                        <Chip value="silver">silver</Chip>
                        <Chip value="gold">gold</Chip>
                        <Chip value="platinum">platinum</Chip>
                        <Chip value="diamond">diamond</Chip>
                        <Chip value="master">master+</Chip>
                    </Chips>
                    <Space h="xl" />
                    <Title order={3}>Voice Comm</Title>
                    <Space h="md" />
                    <SegmentedControl
                        radius="xl"
                        value={String(this.state.voiceComm)}
                        onChange={this.voiceCommChange}
                        data={[
                            { label: 'no preference', value: 'null' },
                            { label: 'yes', value: 'true' },
                            { label: 'no', value: 'false' }
                        ]}
                        fullWidth
                        size="md"
                        color="orange"
                    />
                    <Space h="xl" />
                    <Title order={3}>Roles <Badge color='orange' variant="filled">optional</Badge> </Title>
                    <Space h="md" />
                    <Chips size="md" value={this.state.roles} onChange={this.rolesChange} multiple color="orange">
                        <Chip value="top">top</Chip>
                        <Chip value="jng">jungle</Chip>
                        <Chip value="mid">mid</Chip>
                        <Chip value="bot">bot</Chip>
                        <Chip value="sup">support</Chip>
                    </Chips>
                    <Space h="xl" />
                    <Title order={3}>Champions <Badge color='orange' variant="filled">optional</Badge> </Title>
                    <Space h="md" />
                    <MultiSelect
                        size="md"
                        maxSelectedValues={3}
                        searchable limit={20}
                        data={this.state.championValues !== null ? this.state.championValues : [{ value: 'loading', label: 'loading' }]}
                        placeholder="choose up to 3"
                        onChange={this.championsChange}
                        value={this.state.champions}
                    />
                </Grid.Col>

            </Grid>
        )
    }
}

export default SearchForm;