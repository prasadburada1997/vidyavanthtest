import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './shared/button/button.component';
import { LinkComponent } from './shared/link/link.component';
import { SignupComponent } from './home/pages/signup/signup.component';
import { LoginComponent } from './home/pages/login/login.component';
import { ForgotPasswordComponent } from './home/pages/forgot-password/forgot-password.component';
import { OtpComponent } from './home/components/otp/otp.component';
import { HeaderComponent } from './core/header/header.component';
import { SidebarComponent } from './home/components/sidebar/sidebar.component';
import { SearchComponent } from './home/components/search/search.component';
import { CategoriesComponent } from './home/components/categories/categories.component';
import { ProfileComponent } from './home/pages/profile/profile.component';
import { ChangePasswordComponent } from './home/pages/change-password/change-password.component';
import { TuitionCardComponent } from './shared/tuition-card/tuition-card.component';
import { HomepageComponent } from './home/pages/homepage/homepage.component';
import { DropdownComponent } from './shared/dropdown/dropdown.component';
import { FilterComponent } from './home/components/filter/filter.component';
import { MyTuitionsComponent } from './home/pages/my-tuitions/my-tuitions.component';
import { TuitionComponent } from './home/pages/tuition/tuition.component';
import { MaterialCardComponent } from './shared/material-card/material-card.component';
import { MaterialComponent } from './home/pages/material/material.component';
import { MyMaterialsComponent } from './home/pages/my-materials/my-materials.component';
import { CategoryPageComponent } from './home/pages/category-page/category-page.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { ShareComponent } from './shared/share/share.component';
import { ReportComponent } from './shared/report/report.component';
import { PopupComponent } from './shared/popup/popup.component';
import { RatingComponent } from './shared/rating/rating.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { ContactUsComponent } from './home/pages/contact-us/contact-us.component';
import { FooterComponent } from './core/footer/footer.component';
import { PrivacyPolicyComponent } from './home/pages/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './home/pages/terms-conditions/terms-conditions.component';
import { ViewAllComponent } from './home/pages/view-all/view-all.component';
import { PaginationComponent } from './shared/pagination/pagination.component';
import { PageNotFoundComponent } from './home/pages/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TutorComponent } from './tutor/tutor.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatCardModule} from '@angular/material/card';
import {MatSidenavModule} from '@angular/material/sidenav';
import { CourseDetailsComponent } from './tutor/course-details/course-details.component';
import { IntendLearnComponent } from './tutor/intend-learn/intend-learn.component';
import { DateTimeComponent } from './tutor/date-time/date-time.component';
import { PriceComponent } from './tutor/price/price.component';
import { CurriculamComponent } from './tutor/curriculam/curriculam.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TutorSidenavComponent } from './tutor/tutor_components/tutor-sidenav/tutor-sidenav.component';
import { MaterialInfoComponent } from './tutor/upload_material/material-info/material-info.component';
@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    LinkComponent,
    SignupComponent,
    LoginComponent,
    ForgotPasswordComponent,
    OtpComponent,
    HeaderComponent,
    SidebarComponent,
    SearchComponent,
    CategoriesComponent,
    ProfileComponent,
    ChangePasswordComponent,
    TuitionCardComponent,
    HomepageComponent,
    DropdownComponent,
    FilterComponent,
    MyTuitionsComponent,
    TuitionComponent,
    MaterialCardComponent,
    MaterialComponent,
    MyMaterialsComponent,
    CategoryPageComponent,
    LoaderComponent,
    ShareComponent,
    ReportComponent,
    PopupComponent,
    RatingComponent,
    CarouselComponent,
    ContactUsComponent,
    FooterComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    ViewAllComponent,
    PaginationComponent,
    PageNotFoundComponent,
    TutorComponent,
    CourseDetailsComponent,
    IntendLearnComponent,
    DateTimeComponent,
    PriceComponent,
    CurriculamComponent,
    TutorSidenavComponent,
    MaterialInfoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    MatButtonModule,
    FlexLayoutModule,
    MatCardModule,
    MatDatepickerModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatNativeDateModule,
    NgbModule,
  ],
  providers: [
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
