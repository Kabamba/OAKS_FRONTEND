import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { SermonsService } from '../../../services/sermons.service';
import { environment } from '../../../../environments/environment.prod';
import { EventsService } from '../../../services/events.service';
import { TestimonialsService } from '../../../services/testimonials.service';
import { MinistriesService } from '../../../services/ministries.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit{
  sermons: any[] = [];
  events: any[] = [];
  testimonials: any[] = [];

  imageUrl = environment.apiImage;

  constructor(
    private serm: SermonsService,
    private evt: EventsService,
    private testi: TestimonialsService
  ) {}

  config_slider: SwiperOptions = {
    // npm install --save ngx-useful-swiper@latest swiper
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1600: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      1080: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      1366: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      500: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
    loop: true,
    speed: 4000,
    autoplay: true,
  };

  config: SwiperOptions = {
    // npm install --save ngx-useful-swiper@latest swiper
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1600: {
        slidesPerView: 4,
        spaceBetween: -140,
      },
      1080: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1366: {
        slidesPerView: 4,
        spaceBetween: 30,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: -100,
      },
      500: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
    },
    loop: true,
    speed: 2000,
  };

  config_1: SwiperOptions = {
    // npm install --save ngx-useful-swiper@latest swiper
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1600: {
        slidesPerView: 3,
        spaceBetween: 350,
      },
      1366: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      1024: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 0,
      },
      500: {
        slidesPerView: 1,
        spaceBetween: 100,
      },
    },
    loop: true,
    speed: 2000,
  };

  config_2: SwiperOptions = {
    // npm install --save ngx-useful-swiper@latest swiper
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      1600: {
        slidesPerView: 4,
        spaceBetween: 60,
      },
      1080: {
        slidesPerView: 3,
        spaceBetween: -20,
      },
      1366: {
        slidesPerView: 3,
        spaceBetween: -120,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
      500: {
        slidesPerView: 2,
        spaceBetween: 0,
      },
    },
    loop: true,
    speed: 2000,
  };

  ngOnInit(): void {
    this.getSermons();
    this.getEvents();
    this.getTestis();
  }

  getSermons() {
    this.serm.limit(10).subscribe(
      (res: any) => {
        this.sermons = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getEvents() {
    this.evt.limit(10).subscribe(
      (res: any) => {
        this.events = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getTestis() {
    this.testi.limit(10).subscribe(
      (res: any) => {
        this.testimonials = res.data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ngAfterViewInit(): void {
    let nav = document.querySelector('nav');
    let navResp = document.querySelector('.nav-responsive');
    const toggle = document.querySelector('.nav-toggle');
    const cancel = document.querySelector('.nav-cancel');
    let navLinks = document.querySelector('.nav-responsive .links');

    const links = Array.from(document.querySelectorAll('.nav-responsive .links a'));
    const accordions = Array.from(document.querySelectorAll('.nav-responsive .accordion'));
    const dropdowns: any = Array.from(document.querySelectorAll('.nav-responsive .dropdown'));
    const sociaux: any  = document.querySelector('.fixed-sociaux');
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
            dropdowns[j].style.overflow = "hidden";
          } else {
            dropdowns[j].style.maxHeight = dropdowns[j].scrollHeight + "px";
            dropdowns[j].style.overflow = "visible";
          }
        } else {
          dropdowns[j].style.maxHeight = null;
          dropdowns[j].style.overflow = "hidden";
        }
      }
    }

    for (var i = 0; i < accordions.length; i++) {
      accordions[i].addEventListener('click', accordion)
    }

    function reset() {
      accordion()
      navLinks.classList.remove('active');
    }

    links.forEach((a) => {
      a.addEventListener('click', reset)
    })

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

      if(rect.top < scrolled / 1.5){
        sociaux.classList.add('active');
      }else{
        sociaux.classList.remove('active');
      }

      if(scrolled > 442){
        btnTop.classList.add('active');
      }else{
        btnTop.classList.remove('active');
      }
      
    });
  }
}
