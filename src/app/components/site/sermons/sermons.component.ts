import { Component, OnInit, AfterViewInit } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { SermonsService } from '../../../services/sermons.service';

@Component({
  selector: 'app-sermons',
  templateUrl: './sermons.component.html',
  styleUrls: ['./sermons.component.css'],
})
export class SermonsComponent implements OnInit, AfterViewInit {
  sermons: any[] = [];
  preachers: any[] = [];

  imageUrl = environment.apiImage;

  p: number = 1;

  title : string;
  date : string;

  constructor(private serm: SermonsService) {}

  ngOnInit(): void {
    this.getSermons();
    this.getPreachers();
  }

  getSermons() {
    this.serm.list().subscribe(
      (res: any) => {
        this.sermons = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getPreachers() {
    this.serm.preachers().subscribe(
      (res: any) => {
        this.preachers = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  searchByPreacher(preacher){
    if (preacher == '') {
      this.ngOnInit();
    } else {
      this.serm.searchByPreacher(preacher).subscribe(
        (res: any) => {
          this.sermons = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  search() {
    if (this.title == '') {
      this.ngOnInit();
    } else {
      this.sermons = this.sermons.filter((res: any) => {
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
      this.serm.searchDate(this.date).subscribe(
        (res: any) => {
          this.sermons = res.data;
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  filterMobile() {
    const mediaSearch: any = document.querySelector('.media-search ');
    mediaSearch.classList.toggle('active');
  }

  ngAfterViewInit(): void {
    let nav = document.querySelector('nav');
    let navResp = document.querySelector('.nav-responsive');
    const toggle = document.querySelector('.nav-toggle');
    const cancel = document.querySelector('.nav-cancel');
    let navLinks = document.querySelector('.nav-responsive .links');

    const links = Array.from(
      document.querySelectorAll('.nav-responsive .links a')
    );
    const accordions = Array.from(
      document.querySelectorAll('.nav-responsive .accordion')
    );
    const dropdowns: any = Array.from(
      document.querySelectorAll('.nav-responsive .dropdown')
    );
    const sociaux: any = document.querySelector('.fixed-sociaux');
    const rect = sociaux.getBoundingClientRect();

    const btnTop = document.querySelector('.button-top');

    let index = 0;

    toggle.addEventListener('click', function () {
      navLinks.classList.add('active');
    });

    cancel.addEventListener('click', function () {
      navLinks.classList.remove('active');
      document.querySelector('html').scrollTop = 0;
    });

    function accordion() {
      index = accordions.indexOf(this);
      for (var j = 0; j < dropdowns.length; j++) {
        const dropdownId = dropdowns.indexOf(dropdowns[j]);
        if (index == dropdownId) {
          if (dropdowns[j].style.maxHeight) {
            dropdowns[j].style.maxHeight = null;
            dropdowns[j].style.overflow = 'hidden';
          } else {
            dropdowns[j].style.maxHeight = dropdowns[j].scrollHeight + 'px';
            dropdowns[j].style.overflow = 'visible';
          }
        } else {
          dropdowns[j].style.maxHeight = null;
          dropdowns[j].style.overflow = 'hidden';
        }
      }
    }

    for (var i = 0; i < accordions.length; i++) {
      accordions[i].addEventListener('click', accordion);
    }

    function reset() {
      accordion();
      navLinks.classList.remove('active');
    }

    links.forEach((a) => {
      a.addEventListener('click', reset);
    });

    window.addEventListener('scroll', function () {
      let banner = document.querySelector('.banner');
      let height = window.innerHeight;
      let scrolled = window.scrollY;
      if (scrolled > 130) {
        nav.classList.add('active');
        navResp.classList.add('active');
      } else {
        nav.classList.remove('active');
        navResp.classList.remove('active');
      }

      if (rect.top < scrolled / 1.5) {
        sociaux.classList.add('active');
      } else {
        sociaux.classList.remove('active');
      }

      if (scrolled > 442) {
        btnTop.classList.add('active');
      } else {
        btnTop.classList.remove('active');
      }
    });
  }
}
