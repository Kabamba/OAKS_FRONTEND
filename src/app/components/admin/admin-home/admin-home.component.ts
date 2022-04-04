import { Component, OnInit } from '@angular/core';
import { StatistiqueService } from '../../../services/statistique.service';
import { EventsService } from '../../../services/events.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  totEvent: number;
  totGalerie: number;
  totSermon: number;
  totMinistry: number;

  events: any[] = [];
  key = 'id';
  reverse: boolean = false;

  p: number = 1;
  nom: any;

  constructor(private stat: StatistiqueService, private evt: EventsService) {}

  ngOnInit(): void {
    this.getStatEvent();
    this.getStatGalerie();
    this.getStatSermon();
    this.getStatMinistry();
    this.getEvents();
  }

  getStatEvent() {
    this.stat.totEvent().subscribe(
      (res: any) => {
        this.totEvent = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getStatGalerie() {
    this.stat.totGalerie().subscribe(
      (res: any) => {
        this.totGalerie = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getStatSermon() {
    this.stat.totSermon().subscribe(
      (res: any) => {
        this.totSermon = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getStatMinistry() {
    this.stat.totMinistry().subscribe(
      (res: any) => {
        this.totMinistry = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getEvents() {
    this.evt.list().subscribe(
      (res: any) => {
        this.events = res.data;
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  search() {
    if (this.nom == '') {
      this.ngOnInit();
    } else {
      this.events = this.events.filter((res: any) => {
        return res.titre.toLocaleLowerCase().match(this.nom.toLocaleLowerCase());
      });
    }
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  addActive = false;

  toggle() {
    if (this.addActive == false) {
      this.addActive = true;
    } else {
      this.addActive = false;
    }
  }

  Filter() {
    const filterInputs: any = document.querySelector('.filter-inputs');

    if (filterInputs.style.maxHeight) {
      filterInputs.style.maxHeight = null;
    } else {
      filterInputs.style.maxHeight = filterInputs.scrollHeight + 'px';
    }
  }
}
