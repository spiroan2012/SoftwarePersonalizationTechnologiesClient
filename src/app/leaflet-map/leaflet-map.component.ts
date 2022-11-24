import { AfterViewInit, Component, EventEmitter, Input, Output,} from '@angular/core';
import * as L from 'leaflet';
import { LocationDto } from '../_models/locationDto';
import { HallsService } from '../_services/halls.service';

@Component({
  selector: 'app-leaflet-map',
  templateUrl: './leaflet-map.component.html',
  styleUrls: ['./leaflet-map.component.css']
})
export class LeafletMapComponent implements AfterViewInit {
  private map;
  private marker: any = null;
  @Output() markerEventEmmiter = new EventEmitter<LocationDto>();
  @Input() editMode;
  @Input() viewMode;
  @Input() hallId: string;

  constructor(private hallService: HallsService) { }

  ngAfterViewInit(): void {
    this.initMap();
    //this.selectLocation();
  }

  private initMap(): void{
    var hall = null;
    if(this.hallId != undefined){
      this.hallService.getHallById(this.hallId)
            .subscribe(x =>{
              hall = x;
              var center = new LocationDto(hall.latitude, hall.longitude);
              this.map = L.map('map', {
                center: [center.latitude, center.longitude],
                zoom: 10
              });
          
              const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 18,
                minZoom: 3,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              });
          
              
              console.log(this.hallId);
              
              
              tiles.addTo(this.map);

              if(hall != null){
                if(this.marker !== null){
                  this.map.removeLayer(this.marker);
                }
                var lat = center.latitude;
                var lng = center.longitude;
          
                this.marker = new L.Marker([lat, lng]).addTo(this.map);
                this.selectLocation();
              }
            } );
            
    }
    else{
      this.map = L.map('map', {
        center: [37.984072, 23.728064],
        zoom: 10
      });

      const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        minZoom: 3,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      });
  
      tiles.addTo(this.map);
      this.selectLocation();
    }

    
 }

  private selectLocation(){
    if(!this.viewMode){
      this.map.on('click', (e) => {
        if(this.marker !== null){
          this.map.removeLayer(this.marker);
        }
        var coord = e.latlng;
        var lat = coord.lat;
        var lng = coord.lng;
  
        this.marker = new L.Marker([lat, lng]).addTo(this.map);
  
        var location = new LocationDto(coord.lat, coord.lng);
  
        this.markerEventEmmiter.emit(location); 
      });
    }
    
  }
}
