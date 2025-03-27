export enum TimeIntervalMs {
    Second = 1000,
    Minute = TimeIntervalMs.Second * 60,
    Hour = TimeIntervalMs.Minute * 60,
    Day = TimeIntervalMs.Hour * 24,
}

export enum TimeIntervalS {
    Second = 1,
    Minute = TimeIntervalS.Second * 60,
    Hour = TimeIntervalS.Minute * 60,
    Day = TimeIntervalS.Hour * 24,
}
