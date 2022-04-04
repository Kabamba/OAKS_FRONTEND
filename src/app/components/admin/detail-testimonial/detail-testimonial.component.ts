import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
import { TestimonialsService } from '../../../services/testimonials.service';

@Component({
  selector: 'app-detail-testimonial',
  templateUrl: './detail-testimonial.component.html',
  styleUrls: ['./detail-testimonial.component.css']
})
export class DetailTestimonialComponent implements OnInit {

  testimonial: any;
  imageUrl = environment.apiImage;
  
  constructor(private route: ActivatedRoute, private testi: TestimonialsService) {}

  ngOnInit(): void {
    this.getSermon();
  }

  getSermon(){
    const id = this.route.snapshot.params['id'];

    this.testi.show(id).subscribe((res:any)=>{
      this.testimonial = res.data
    },(err)=>{
      console.log(err)
    })
  }

  addActive = false;

  toggle() {
    if (this.addActive == false) {
      this.addActive = true;
    } else {
      this.addActive = false;
    }
  }
  
}
