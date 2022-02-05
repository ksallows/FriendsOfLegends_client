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