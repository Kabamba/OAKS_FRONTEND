import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgxUsefulSwiperModule } from 'ngx-useful-swiper';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/site/home/home.component';
import { GalerieComponent } from './components/site/galerie/galerie.component';
import { ContactComponent } from './components/site/contact/contact.component';
import { SermonsComponent } from './components/site/sermons/sermons.component';
import { EventsComponent } from './components/site/events/events.component';
import { TestimonialsComponent } from './components/site/testimonials/testimonials.component';
import { SingleSermonComponent } from './components/site/single-sermon/single-sermon.component';
import { SingleTestimonialsComponent } from './components/site/single-testimonials/single-testimonials.component';
import { SingleEventComponent } from './components/site/single-event/single-event.component';
import { MinistriesComponent } from './components/site/ministries/ministries.component';
import { MinistrieSingleComponent } from './components/site/ministrie-single/ministrie-single.component';
import { NavComponent } from './components/site/nav/nav.component';
import { FooterComponent } from './components/site/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { SafePipePipe } from './pipes/safe-pipe.pipe';
import { SideNavComponent } from './components/admin/side-nav/side-nav.component';
import { GalleryComponent } from './components/admin/gallery/gallery.component';
import { AdminsComponent } from './components/admin/admin/admin.component';
import { SermonComponent } from './components/admin/sermon/sermon.component';
import { DetailSermonComponent } from './components/admin/detail-sermon/detail-sermon.component';
import { EventComponent } from './components/admin/event/event.component';
import { EventDetailComponent } from './components/admin/event-detail/event-detail.component';
import { NavResponDashComponent } from './components/admin/nav-respon-dash/nav-respon-dash.component';
import { LoginComponent } from './components/admin/login/login.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { MinistryComponent } from './components/admin/ministry/ministry.component';
import { ToastrModule } from 'ngx-toastr';
import { ReactiveFormsModule } from '@angular/forms';
import { SocialComponent } from './components/site/social/social.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DetailMinistryComponent } from './components/admin/detail-ministry/detail-ministry.component';
import { TestimonialComponent } from './components/admin/testimonial/testimonial.component';
import { DetailTestimonialComponent } from './components/admin/detail-testimonial/detail-testimonial.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalerieComponent,
    ContactComponent,
    SermonsComponent,
    EventsComponent,
    TestimonialsComponent,
    SingleSermonComponent,
    SingleTestimonialsComponent,
    SingleEventComponent,
    MinistriesComponent,
    MinistrieSingleComponent,
    NavComponent,
    FooterComponent,
    AppComponent,
    SideNavComponent,

    GalleryComponent,
    AdminsComponent,
    SermonComponent,
    DetailSermonComponent,
    EventComponent,
    EventDetailComponent,
    MinistriesComponent,
    NavResponDashComponent,
    LoginComponent,
    AdminHomeComponent,
    MinistryComponent,
    SafePipePipe,
    SocialComponent,
    DetailMinistryComponent,
    TestimonialComponent,
    DetailTestimonialComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgxUsefulSwiperModule,
    HttpClientModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    RouterModule,
    FormsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      progressBar: true,
      progressAnimation: 'increasing',
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
