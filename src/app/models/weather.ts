export class Weather {
    constructor(
        public lat: string,
        public lon: string,
        public timezone: string,
        public description: string,
        public temperature: number,
        public humidity: number,
        public type: string, //weather[0].main.tolower
        public iconText: string, //weather[0].main
        public windSpeed: number,
        public daily: any[],
        public hourly: any[]
    ) { };
}
