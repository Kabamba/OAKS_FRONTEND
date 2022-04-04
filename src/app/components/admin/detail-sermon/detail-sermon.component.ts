import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { ActivatedRoute } from '@angular/router';
import { SermonsService } from '../../../services/sermons.service';

@Component({
  selector: 'app-detail-sermon',
  templateUrl: './detail-sermon.component.html',
  styleUrls: ['./detail-sermon.component.css']
})
export class DetailSermonComponent implements OnInit {

  sermon: any;
  imageUrl = environment.apiImage;
  
  constructor(private route: ActivatedRoute, private serm: SermonsService) {}

  ngOnInit(): void {
    this.getSermon();
  }

  getSermon(){
    const id = this.route.snapshot.params['id'];

    this.serm.show(id).subscribe((res:any)=>{
      this.sermon = res.data
      console.log(this.sermon)
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
