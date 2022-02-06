export interface Result {
    profileId: string,
    summonerIcon: number,
    level: number,
    rank: string,
    topChamps: string[],
    roles: string[] | null,
    voiceComm: boolean | null,
    gameModes: string[] | null,
    summonerName: string
}

//{n233: 'Aatrox'}
export interface ChampionIdData { [key: string]: string }

// {value: '233', label: 'Aatrox'}
export interface ChampionListData { value: string, label: string }

export interface Filter { [key: string]: string }

export const baseUrl = 'http://ddragon.leagueoflegends.com/cdn/'

export const serversList = [
    { value: 'br1', label: 'BR' },
    { value: 'eun1', label: 'EUNE' },
    { value: 'euw1', label: 'EUW' },
    { value: 'jp1', label: 'JP' },
    { value: 'kr', label: 'KR' },
    { value: 'la1', label: 'LAN' },
    { value: 'la2', label: 'LAS' },
    { value: 'na1', label: 'NA' },
    { value: 'oc1', label: 'OCE' },
    { value: 'tr1', label: 'TR' },
    { value: 'ru1', label: 'RU' },
]