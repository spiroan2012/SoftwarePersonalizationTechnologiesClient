export class CreateBooking{
    showId: number;
    dateOfShow: string;
    seats: string[];

    constructor(showId: number, dateOfShow: string, seats: string[]){
        this.showId = showId;
        this.dateOfShow = dateOfShow;
        this.seats = seats;
    }
}