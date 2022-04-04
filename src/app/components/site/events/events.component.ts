import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
})
export class EventsComponent implements OnInit {
  events: any[] = [];
  imageUrl = environment.apiImage;

  p: number = 1;
  title: string;
  date : string;

  constructor(private evt: EventsService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.evt.list().subscribe(
      (res: any) => {
        this.events = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  filterMobile() {
    const mediaSearch: any = document.querySelector('.media-search ');
    mediaSearch.classList.toggle('active');
  }

  search() {
    if (this.title == '') {
      this.ngOnInit();
    } else {
      this.events = this.events.filter((res: any) => {
        return res.titre
          .toLocaleLowerCase()
          .match(this.title.toLocaleLowerCase());
      });
    }
  }

  searchDate() {
    if (this.date == '') {
      this.ngOnInit();
    } else {
      this.evt.searchDate(this.date).subscribe(
        (res: any) => {
          this.events = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }
}
