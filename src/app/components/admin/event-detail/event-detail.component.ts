import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
import { SermonsService } from '../../../services/sermons.service';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: any;
  imageUrl = environment.apiImage;
  
  constructor(private route: ActivatedRoute, private evt: EventsService) {}

  ngOnInit(): void {
    this.getEvent();
  }

  getEvent(){
    const id = this.route.snapshot.params['id'];

    this.evt.show(id).subscribe((res:any)=>{
      this.event = res.data
      console.log(this.event);
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
