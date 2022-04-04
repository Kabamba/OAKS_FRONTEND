import { Component, AfterViewInit, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild("mainContent")
  private mainContentDiv: ElementRef<HTMLElement>;

  constructor(private router: Router) { }

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

  onActivate(_event: any): void {
    if (this.mainContentDiv) {
      (this.mainContentDiv.nativeElement as HTMLElement).scrollTop = 0;
    }
  }
  
  ngOnInit(): void {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
          return;
      }
      window.scrollTo(0, 0)
  });
  }
}
