import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SwiperOptions } from 'swiper';
import { environment } from 'src/environments/environment.prod';
import { GalerieService } from '../../../services/galerie.service';


@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.css']
})
export class GalerieComponent implements OnInit, AfterViewInit {

  images: any[] = [];
  imageUrl = environment.apiImage;

  p: number = 1;
  slide :boolean;
  current : string;

  constructor(private galerie: GalerieService) {}

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents() {
    this.galerie.list().subscribe(
      (res: any) => {
        this.images = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  config: SwiperOptions = {
    // npm install --save ngx-useful-swiper@latest swiper
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },

    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    speed: 2000,
  };

  showSlide(url){
    this.current = url;
    this.slide = true;
  }

  closeSlide(event:Event){
    event.stopPropagation();
    this.slide = false;
    console.log('Close ' + this.slide)
  }

  ngAfterViewInit(): void {
    const galleryModal = document.querySelector('.gallery-modal');
    const gallerWrapper = document.querySelector('.gallery-modal-wrapper');

    const sees = document.querySelectorAll('.see');
    const imageFirst = document.querySelector('.imageFirst');

    // sees.forEach(see => {
    //   see.addEventListener('click', function(){
    //     // const parent = see.parentElement;
    //     // const imageTarget = parent.querySelector('img');
    //     // const srcUrl = imageTarget.getAttribute('src');
    //     // imageFirst.setAttribute("src", srcUrl);
    //     galleryModal.classList.add('active');
    //   })
    // });

    // galleryModal.addEventListener('click', function(){
    //   this.classList.remove('active');
    // });

    gallerWrapper.addEventListener('click', function(e){
      e.stopPropagation();
    });

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
