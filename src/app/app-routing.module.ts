import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/site/home/home.component';
import { GalerieComponent } from './components/site/galerie/galerie.component';
import { ContactComponent } from './components/site/contact/contact.component';
import { SermonsComponent } from './components/site/sermons/sermons.component';
import { EventsComponent } from './components/site/events/events.component';
import { TestimonialsComponent } from './components/site/testimonials/testimonials.component';
import { SingleSermonComponent } from './components/site/single-sermon/single-sermon.component';
import { SingleTestimonialsComponent } from './components/site/single-testimonials/single-testimonials.component';
import { MinistriesComponent } from './components/site/ministries/ministries.component';
import { MinistrieSingleComponent } from './components/site/ministrie-single/ministrie-single.component';
import { SingleEventComponent } from './components/site/single-event/single-event.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminsComponent } from './components/admin/admin/admin.component';
import { GalleryComponent } from './components/admin/gallery/gallery.component';
import { SermonComponent } from './components/admin/sermon/sermon.component';
import { MinistryComponent } from './components/admin/ministry/ministry.component';
import { LoginComponent } from './components/admin/login/login.component';
import { EventComponent } from './components/admin/event/event.component';
import { AuthGuard } from './guards/auth.guard';
import { DetailSermonComponent } from './components/admin/detail-sermon/detail-sermon.component';
import { EventDetailComponent } from './components/admin/event-detail/event-detail.component';
import { DetailMinistryComponent } from './components/admin/detail-ministry/detail-ministry.component';
import { TestimonialComponent } from './components/admin/testimonial/testimonial.component';
import { DetailTestimonialComponent } from './components/admin/detail-testimonial/detail-testimonial.component';

const routes: Routes = [
  { path: 'site/home', component: HomeComponent },
  { path: 'site/sermons', component: SermonsComponent },
  { path: 'site/events', component: EventsComponent },
  { path: 'site/testimonials', component: TestimonialsComponent },
  { path: 'site/galerie', component: GalerieComponent },
  { path: 'site/contact', component: ContactComponent },
  { path: 'site/ministries', component: MinistriesComponent },

  { path: 'site/event/:id', component: SingleEventComponent },
  { path: 'site/sermon/:id', component: SingleSermonComponent },
  { path: 'site/testimonial/:id', component: SingleTestimonialsComponent },
  { path: 'site/ministry/:id', component: MinistrieSingleComponent },

  {
    path: 'admin/home',
    canActivate: [AuthGuard],
    component: AdminHomeComponent,
  },
  {
    path: 'admin/admins',
    canActivate: [AuthGuard],
    component: AdminsComponent,
  },
  { path: 'admin/events', component: EventComponent, canActivate: [AuthGuard] },
  { path: 'admin/event/:id', component: EventDetailComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/gallery',
    canActivate: [AuthGuard],
    component: GalleryComponent,
  },
  {
    path: 'admin/sermons',
    canActivate: [AuthGuard],
    component: SermonComponent,
  },
  {
    path: 'admin/sermon/:id',
    canActivate: [AuthGuard],
    component: DetailSermonComponent,
  },
  {
    path: 'admin/ministries',
    canActivate: [AuthGuard],
    component: MinistryComponent,
  },
  {
    path: 'admin/ministry/:id',
    canActivate: [AuthGuard],
    component: DetailMinistryComponent,
  },
  {
    path: 'admin/testimonials',
    canActivate: [AuthGuard],
    component: TestimonialComponent,
  },
  {
    path: 'admin/testimonial/:id',
    canActivate: [AuthGuard],
    component: DetailTestimonialComponent,
  },
  { path: 'admin/login', component: LoginComponent},

  { path: '', redirectTo: 'site/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
