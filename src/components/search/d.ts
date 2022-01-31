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

export interface ChampionIdData { [key: string]: string }

export interface ResultsList {
    profileId: string,
    summonerIcon: number,
    level: number,
    rank: string,
    topChamps: number[],
    roles: string[],
    voiceComm: boolean,
    gameModes: string[]
}

export interface ChampionListData { value: string, label: string }

export interface Filter { [key: string]: string }