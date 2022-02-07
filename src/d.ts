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

export const filters: Filter = {
    MonkeyKing: 'Wukong',
    Reksai: 'Rek\'Sai',
    Kaisa: 'Kai\'Sa',
    Velkoz: 'Vel\'Koz',
    Khazix: 'Kha\'Zix',
    AurelionSol: 'Aurelion Sol',
    TahmKench: 'Tahm Kench',
    Kogmaw: 'Kog\'Maw'
}

export function rankToCSS(rank: string | undefined) {
    if (rank !== undefined) {
        switch (rank.substring(0, 2)) {
            case 'UN': return 'unranked';
            case 'IR': return 'iron';
            case 'BR': return 'bronze';
            case 'SS': return 'silver';
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

export async function quickFetch(url: string, method: string, credentials: boolean, token?: string) {
    let request: any = {}
    if (credentials) {
        request.credentials = 'include'
        request.headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        })
    }
    else {
        request.headers = new Headers({
            'Content-Type': 'application/json',
        })
    }
    request.method = method
    request.mode = 'cors'
    return await fetch(url, request)
}