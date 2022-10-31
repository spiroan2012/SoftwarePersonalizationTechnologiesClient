import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationDto } from 'src/app/_models/locationDto';
import { HallsService } from 'src/app/_services/halls.service';
import { InfoService } from 'src/app/_services/info.service';

@Component({
  selector: 'app-hall-management-add',
  templateUrl: './hall-management-add.component.html',
  styleUrls: ['./hall-management-add.component.css']
})
export class HallManagementAddComponent implements OnInit{
  hallForm: FormGroup;
  title: string;
  hallId: string;
  validationErrors: string[] = [];
  markerCoords: LocationDto = null;
  editMode: boolean;

  constructor(private hallService: HallsService,
    private infoService: InfoService, 
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute
  ) { 
    
  }

  ngOnInit(): void {

    this.hallId = this.route.snapshot.params['id'];
    this.editMode = !!this.hallId;
    this.initializeForm();
  }

  initializeForm(){
    this.hallForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      capacity: ['', [Validators.required, Validators.min(0)]],
      emailAddress: ['', [Validators.required, this.testPattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'email')]],
    });

    if(this.editMode){
      this.hallService.getHallById(this.hallId)
            .subscribe(x =>{
              this.hallForm.patchValue(x);
              this.title = "Επεξεργασία θεάτρου "+x.title;
            } );
    }
    else{
      this.title = "Εισαγωγή νέου θεάτρου";
    }
  }

  submitForm(){
    if(!this.editMode){
      this.hallService.addHall(this.hallForm.value, this.markerCoords).subscribe(response => {
        this.openAddSuccessModal(this.hallForm.value.title);
        this.clearForm();
      });
    }
    else if(this.hallForm.dirty){
      this.hallService.updateHall(this.hallForm.value, this.markerCoords, this.hallId).subscribe(response => {
        this.openAddSuccessModal(this.hallForm.value.title);
        this.clearForm();
        this.router.navigateByUrl('/hall-management-index');
      });
    }

  }

  openAddSuccessModal(title){
    if(!this.editMode){
      return this,this.infoService.info('Επιτυχία', 'Το θέατρο '+title+' δημιουργήθηκε με επιτυχία');
    }
    else{
      return this,this.infoService.info('Επιτυχία', 'Το θέατρο '+title+' άλλαξε με επιτυχία');
    }
  }

  testPattern(regExp, type): ValidatorFn{
    //const regExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return (control: AbstractControl) =>{
      const valid = regExp.test(control.value);
      if(type === 'pass')
        return valid ? null : { invalidPatternPass: true };
      else
      return valid ? null : { invalidPatternEmail: true };
    }
  }

  clearForm(){
    this.hallForm.reset();
  }

  updateUserCoords(coords){
    this.markerCoords = coords;
    console.log(coords);
  }

}