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

export const baseUrl = '//ddragon.leagueoflegends.com/cdn/'

export const serversList = [
    { value: 'na1', label: 'NA' },
    { value: 'br1', label: 'BR' },
    { value: 'eun1', label: 'EUNE' },
    { value: 'euw1', label: 'EUW' },
    { value: 'jp1', label: 'JP' },
    { value: 'kr', label: 'KR' },
    { value: 'la1', label: 'LAN' },
    { value: 'la2', label: 'LAS' },
    { value: 'oc1', label: 'OCE' },
    { value: 'tr1', label: 'TR' },
    { value: 'ru1', label: 'RU' },
]

export const filters: Filter = {
    MonkeyKing: 'Wukong',
    Reksai: 'Rek\'Sai',
    Kaisa: 'Kai\'Sa',
    Velkoz: 'Vel\'Koz',
    Khazix: 'Kha\'Zix',
    AurelionSol: 'Aurelion Sol',
    TahmKench: 'Tahm Kench',
    Kogmaw: 'Kog\'Maw',
    Renata: 'Renata Glasc'
}

export function rankToCSS(rank: string | undefined) {
    if (rank !== undefined && rank !== null) {
        switch (rank.substring(0, 2)) {
            case 'UN': return 'unranked';
            case 'IR': return 'iron';
            case 'BR': return 'bronze';
            case 'SI': return 'silver';
            case 'GO': return 'gold';
            case 'PL': return 'platinum';
            case 'DI': return 'diamond';
            case 'MA': return 'master';
            case 'GR': return 'grandmaster';
            case 'CH': return 'challenger';
        }
    }
    else return ''
}

export interface Comment {
    fromProfileId: string,
    fromSummonerName: string,
    body: string,
    commentId: string
}