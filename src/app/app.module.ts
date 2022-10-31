import { NgModule, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { DateInputComponent } from './_forms/date-input/date-input.component';
import { NavComponent } from './nav/nav.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { EntranceRegisterComponent } from './entrance-register/entrance-register.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { RegisterComponent } from './register/register.component';
import {BsDatepickerModule, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ConfirmDialogComponent } from './modals/confirm-dialog/confirm-dialog.component';
import { RolesModalComponent } from './modals/roles-modal/roles-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import {PaginationModule} from 'ngx-bootstrap/pagination';
import { ShowBookingListComponent } from './show-booking/show-booking-list/show-booking-list.component';
import { ShowBookingCardComponent } from './show-booking/show-booking-card/show-booking-card.component';
import { ShowBookingDetailsComponent } from './show-booking/show-booking-details/show-booking-details.component';
import localeGr from '@angular/common/locales/el';
import { registerLocaleData } from '@angular/common';
import { ShowBookingReserveComponent } from './show-booking/show-booking-reserve/show-booking-reserve.component';
import { BookingCalendarListComponent } from './booking-calendar/booking-calendar-list/booking-calendar-list.component';
import { BookingCalendarDetailComponent } from './booking-calendar/booking-calendar-detail/booking-calendar-detail.component';
import { BookingCalendarBookingsComponent } from './booking-calendar/booking-calendar-bookings/booking-calendar-bookings.component';
import { InfoDialogComponent } from './modals/info-dialog/info-dialog.component';
import { ShowManagementIndexComponent } from './show-management/show-management-index/show-management-index.component';
import { ShowManagementViewComponent } from './show-management/show-management-view/show-management-view.component';
import { ShowManagementAddComponent } from './show-management/show-management-add/show-management-add.component';
import { TextAreaComponent } from './_forms/text-area/text-area.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { HallManagementIndexComponent } from './hall-management/hall-management-index/hall-management-index.component';
import { HallManagementViewComponent } from './hall-management/hall-management-view/hall-management-view.component';
import { HallManagementAddComponent } from './hall-management/hall-management-add/hall-management-add.component';
import { EntranceRegisterGuestComponent } from './entrance-register/entrance-register-guest/entrance-register-guest.component';
import { EntranceRegisterListComponent } from './entrance-register/entrance-register-list/entrance-register-list.component';
import { DatePipe } from '@angular/common';
import { UserGenresComponent } from './user-genres/user-genres.component';
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { CommonModule } from '@angular/common';
import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { ShowRecommendationsComponent } from './show-recommendations/show-recommendations.component';  
// import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
// import { GoogleLoginProvider } from '@abacritt/angularx-social-login';
// import { FacebookLoginProvider, SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
// import {
//   SocialLoginModule,
//   SocialAuthServiceConfig,
// } from 'angularx-social-login';
// import { GoogleLoginProvider } from 'angularx-social-login';

registerLocaleData(localeGr);

@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    NavComponent,
    LoginComponent,
    HomeComponent,
    EntranceRegisterComponent,
    HasRoleDirective,
    RegisterComponent,
    DateInputComponent,
    AdminPanelComponent,
    UserManagementComponent,
    ConfirmDialogComponent,
    RolesModalComponent,
    ShowBookingListComponent,
    ShowBookingCardComponent,
    ShowBookingDetailsComponent,
    ShowBookingReserveComponent,
    BookingCalendarListComponent,
    BookingCalendarDetailComponent,
    BookingCalendarBookingsComponent,
    InfoDialogComponent,
    ShowManagementIndexComponent,
    ShowManagementViewComponent,
    ShowManagementAddComponent,
    TextAreaComponent,
    HallManagementIndexComponent,
    HallManagementViewComponent,
    HallManagementAddComponent,
    EntranceRegisterGuestComponent,
    EntranceRegisterListComponent,
    UserGenresComponent,
    LeafletMapComponent,
    ShowRecommendationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    }),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    NgxMaterialTimepickerModule.setLocale('el'),
    NgMultiSelectDropDownModule.forRoot(),
    NgSelectModule,
    CommonModule
    //SocialLoginModule
  ],
  providers: [
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(
    //           '729388044471-j76tjkgp3ko9u7n2tfrsksa0ain3qb4q.apps.googleusercontent.com'
    //         )
    //       },
    //     ],
    //     onError: (err) => {
    //       console.error(err);
    //     }
    //   } as SocialAuthServiceConfig
    // },
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: FacebookLoginProvider.PROVIDER_ID,
    //         provider: new FacebookLoginProvider(
    //           '1034357964127831'
    //         )
    //       }
    //     ]
    //   } as SocialAuthServiceConfig,
    // },
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider('126290248420-868rc5ntp3fgk7act69kjdqg26498432.apps.googleusercontent.com'),
    //       },
    //     ],
    //   } as SocialAuthServiceConfig,
    // },
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: LOCALE_ID, useValue: 'el'},
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
