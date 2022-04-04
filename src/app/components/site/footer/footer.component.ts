import { Component, OnInit } from '@angular/core';
import { MinistriesService } from '../../../services/ministries.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {

  ministries: any[] = [];

  constructor(private minist: MinistriesService) {}

  ngOnInit(): void {
    this.getMinsitries();
  }

  getMinsitries() {
    this.minist.list().subscribe(
      (res: any) => {
        this.ministries = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
