import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MinistriesService } from '../../../services/ministries.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-detail-ministry',
  templateUrl: './detail-ministry.component.html',
  styleUrls: ['./detail-ministry.component.css']
})
export class DetailMinistryComponent implements OnInit {

  ministry: any;
  imageUrl = environment.apiImage;
  
  constructor(private route: ActivatedRoute, private minis: MinistriesService) {}

  ngOnInit(): void {
    this.getMinistry();
  }

  getMinistry(){
    const id = this.route.snapshot.params['id'];

    this.minis.show(id).subscribe((res:any)=>{
      this.ministry = res.data
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
