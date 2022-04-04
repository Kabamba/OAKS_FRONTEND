import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  @Input() addActive:any;

  constructor(private auth: AdminAuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(){
    this.auth.Logout().subscribe((res)=>{
      localStorage.removeItem('user')
      console.log(res)
      this.router.navigate(['/admin/login']);
    }, (err) =>{
      console.log(err)
      this.router.navigate(['/admin/login']);
    });
  }

}
