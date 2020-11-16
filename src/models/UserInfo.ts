export interface MapPlace {
    lng: number,
    lat: number,
    desc?: string
}

export interface PersonalInfo {
    fName: string,
    lName: string,
    dateOfBirth: string
    gender: string,
    img?: string
}

export interface AdditionalInfo {
    key: string,
    value: string
}

export interface UserInfo {
    personal: PersonalInfo
    additional? : Array<AdditionalInfo>
    mapPlaces? : Array<MapPlace>
}