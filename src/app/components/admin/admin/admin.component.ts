import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminsComponent implements OnInit {
  admins: any[] = [];

  brandForm: FormGroup;

  isAdding: boolean;
  isLoanding: boolean;
  AppearModal: boolean;
  addActive = false;

  errors = {
    name: '',
    email: '',
    password: '',
  };

  key = 'id';
  reverse: boolean = false;
  p: number = 1;
  nom: string;

  constructor(private adm: AdminService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getAdmins();
    this.resetForm();
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
      name: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  resetError() {
    this.errors.name = '';
    this.errors.email = '';
    this.errors.password = '';
  }

  getAdmins() {
    this.isLoanding = true;
    this.adm.list().subscribe(
      (res: any) => {
        this.admins = res;
        this.isLoanding = false;
      },
      (err) => {
        this.isLoanding = false;
      }
    );
  }

  sauvegarder() {
    this.isAdding = true;

    if (this.brandForm.value.id == '0') {
      this.adm
        .ajouter(
          this.brandForm.value.name,
          this.brandForm.value.email,
          this.brandForm.value.password
        )
        .subscribe(
          (res: any) => {
            this.toastr.success(res.message);
            this.ngOnInit();
            this.closeModal();
            this.isAdding = false;
          },
          (err) => {
            this.errors = err.error.errors;
            this.isAdding = false;
          }
        );
    } else {
      this.adm
        .editer(
          this.brandForm.value.id,
          this.brandForm.value.name,
          this.brandForm.value.email,
          this.brandForm.value.password
        )
        .subscribe(
          (res: any) => {

            if (res.visibility == false) {
              this.toastr.error(res.message);
            } else {
              this.toastr.success(res.message);
            }

            console.log(res.message)

            this.ngOnInit();
            this.closeModal();
            this.isAdding = false;
          },
          (err) => {
            this.errors = err.error.errors;
            this.isAdding = false;
          }
        );
    }
  }

  show(id) {
    this.adm.show(id).subscribe(
      (res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.id),
          name: new FormControl(res.name),
          email: new FormControl(res.email),
          password: new FormControl(''),
        });
        console.log(res);
        this.showModal();
      },
      (err) => {}
    );
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  search() {
    if (this.nom == '') {
      this.ngOnInit();
    } else {
      this.admins = this.admins.filter((res: any) => {
        return (
          res.name.toLocaleLowerCase().match(this.nom.toLocaleLowerCase()) ||
          res.email.toLocaleLowerCase().match(this.nom.toLocaleLowerCase())
        );
      });
    }
  }

  delete(id) {
    this.adm.delete(id).subscribe(
      (res: any) => {
        if (res.visibility == false) {
          this.toastr.error(res.message);
        } else {
          this.toastr.success(res.message);
        }
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  toggle() {
    if (this.addActive == false) {
      this.addActive = true;
    } else {
      this.addActive = false;
    }
  }

  showModal() {
    this.AppearModal = true;
  }

  closeModal() {
    this.AppearModal = false;
    this.resetError();
    this.resetForm();
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
