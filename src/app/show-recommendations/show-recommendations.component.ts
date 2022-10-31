import { Component, OnInit } from '@angular/core';
import { Show } from '../_models/show';
import { ShowsService } from '../_services/shows.service';

@Component({
  selector: 'app-show-recommendations',
  templateUrl: './show-recommendations.component.html',
  styleUrls: ['./show-recommendations.component.css']
})
export class ShowRecommendationsComponent implements OnInit {
  recommendedShows: Show[] = [];
  
  constructor(private showsService: ShowsService) { }

  ngOnInit(): void {
    this.loadRecommendedShows();
  }

  private loadRecommendedShows(){
    this.showsService.getRecommendedShows().subscribe(response =>{
      this.recommendedShows = response;
    });
  }
}
