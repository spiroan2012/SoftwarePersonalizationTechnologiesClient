import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IDropdownSettings} from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { GenreService } from '../_services/genre.service';

@Component({
  selector: 'app-user-genres',
  templateUrl: './user-genres.component.html',
  styleUrls: ['./user-genres.component.css']
})
export class UserGenresComponent implements OnInit {
  dropdownList = [];
  selectedItems = [];
  dropdownSettings:IDropdownSettings;
  buttonDisabled = true;

  constructor(private genreService: GenreService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.genreService.getAllGenres().subscribe((response) => {
      this.dropdownList = response;
    });

    this.genreService.getLoggedUserGenres().subscribe((response) => {
      this.selectedItems = response;
    });
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'description',
      selectAllText: 'Επιλογή όλων',
      unSelectAllText: 'Αποεπιλογή όλων',
      itemsShowLimit: 5,
      allowSearchFilter: true
    };

    
  }

  updatePreferedGenres(){
    var selectedGenreIds = this.selectedItems.map(x => x.id);
    this.genreService.updateLoggedUserGenres(selectedGenreIds).subscribe(() => {
      this.toastr.success('Επιτυχής ενημέρωση των αγαπημένων σας ειδών');
      this.buttonDisabled = true;
    }, error =>{
      this.toastr.error(error);
    })
  }

  onItemSelect(item: any) {
    this.buttonDisabled = false;
    console.log(item);
  }
  onSelectAll(items: any) {
    this.buttonDisabled = false;
    console.log(items);
  }
}
