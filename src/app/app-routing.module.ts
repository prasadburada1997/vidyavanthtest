import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryPageComponent } from './home/pages/category-page/category-page.component';
import { ContactUsComponent } from './home/pages/contact-us/contact-us.component';
import { ForgotPasswordComponent } from './home/pages/forgot-password/forgot-password.component';
import { HomepageComponent } from './home/pages/homepage/homepage.component';
import { LoginComponent } from './home/pages/login/login.component';
import { MaterialComponent } from './home/pages/material/material.component';
import { MyMaterialsComponent } from './home/pages/my-materials/my-materials.component';
import { MyTuitionsComponent } from './home/pages/my-tuitions/my-tuitions.component';
import { PageNotFoundComponent } from './home/pages/page-not-found/page-not-found.component';
import { PrivacyPolicyComponent } from './home/pages/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './home/pages/profile/profile.component';
import { SignupComponent } from './home/pages/signup/signup.component';
import { TermsConditionsComponent } from './home/pages/terms-conditions/terms-conditions.component';
import { TuitionComponent } from './home/pages/tuition/tuition.component';
import { ViewAllComponent } from './home/pages/view-all/view-all.component';
import { TutorComponent } from './tutor/tutor.component'
import { CourseDetailsComponent } from './tutor/course-details/course-details.component'
import { CurriculamComponent } from './tutor/curriculam/curriculam.component'
import { DateTimeComponent } from './tutor/date-time/date-time.component'
import { IntendLearnComponent } from './tutor/intend-learn/intend-learn.component'
import { PriceComponent } from './tutor/price/price.component'
import { MaterialInfoComponent } from './tutor/upload_material/material-info/material-info.component';
const routes: Routes = [
	{ path: 'login', component: LoginComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'forgot-password', component: ForgotPasswordComponent },
	{ path: 'profile', component: ProfileComponent },
	{ path: 'view-all', component: ViewAllComponent },
	{ path: 'contact-us', component: ContactUsComponent },
	{ path: 'privacy-policy', component: PrivacyPolicyComponent },
	{ path: 'terms-conditions', component: TermsConditionsComponent },
	{ path: 'my-tuitions', component: MyTuitionsComponent },
	{ path: 'my-materials', component: MyMaterialsComponent },
	{ path: 'tuition/:id', component: TuitionComponent },
	{ path: 'material/:id', component: MaterialComponent },
	{ path: 'categories/:title', component: CategoryPageComponent },
	// { path: '404', component: PageNotFoundComponent },
	{ path: '', component: HomepageComponent },
	// { path: '**', component: PageNotFoundComponent },
	{ path: 'tutor', component: TutorComponent },
	{ path: 'course-details', component: CourseDetailsComponent },
	{ path: 'curriculam', component: CurriculamComponent },

	{ path: 'date-time', component: DateTimeComponent },

	{ path: 'intend-learn', component: IntendLearnComponent },

	{ path: 'uplode_material', component: MaterialInfoComponent },

	{ path: 'price', component: PriceComponent },

];

@NgModule({
	imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
	exports: [RouterModule]
})
export class AppRoutingModule { }
