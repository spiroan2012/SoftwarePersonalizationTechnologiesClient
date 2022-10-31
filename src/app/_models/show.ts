export interface Show{
    id: number;
    title: string;
    description: string;
    dateStart: Date;
    dateEnd: Date;
    actors: string[];
    directors: string[];
    duration: number;
    timeStart: Date;
    hallId: number;
    hallName: string;
    hallAddress: string;
    hallPhone: string;
    hallEmail: string;
    hallDescription: string;
    hallCapacity: number;
    genreId: number;
    genreDescription: number;
}