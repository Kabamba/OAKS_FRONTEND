import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { MinistriesService } from '../../../services/ministries.service';
import { AdminAuthService } from 'src/app/services/admin-auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ministry',
  templateUrl: './ministry.component.html',
  styleUrls: ['./ministry.component.css']
})
export class MinistryComponent implements OnInit {

  ministries: any[] = [];

  brandForm: FormGroup;

  isAdding: boolean;
  isLoanding: boolean;
  AppearModal: boolean;
  addActive = false;

  imageUrl = environment.apiImage;

  errors = {
    ministry_name: '',
    descriptions: '',
    leader_name: '',
    image: ''
  };

  key = 'id';
  reverse: boolean = false;
  p: number = 1;
  word: string;

  fichier : any;
  chemin : any;

  showFileInputs:boolean;
  
  constructor(private min: MinistriesService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getMinistries();
    this.resetForm();
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
      ministry_name: new FormControl(''),
      descriptions: new FormControl(''),
      leader_name: new FormControl(''),
    });
  }

  resetError() {
    this.errors.ministry_name = '';
    this.errors.descriptions = '';
    this.errors.leader_name = '';
    this.errors.image = '';
  }

  getMinistries() {
    this.isLoanding = true;
    this.min.list().subscribe(
      (res: any) => {
        this.ministries = res.data;
        this.isLoanding = false;
      },
      (err) => {
        console.log(err)
        this.isLoanding = false;
      }
    );
  }

  sauvegarder() {
    this.isAdding = true;
    const formData = new FormData();

    formData.append('id',this.brandForm.value.id);
    formData.append('ministry_name',this.brandForm.value.ministry_name);
    formData.append('descriptions',this.brandForm.value.descriptions);
    formData.append('leader_name',this.brandForm.value.leader_name);
    
    if (this.fichier) {
      formData.append('image', this.fichier, this.fichier.name);
    }

    if (this.brandForm.value.id == '0') {
    
      this.min
        .ajouter(formData)
        .subscribe(
          (res: any) => {
            this.toastr.success(res.message);
            this.ngOnInit();
            this.closeModal();
            this.isAdding = false;
          },
          (err) => {
            console.log(err)
            this.errors = err.error.errors;
            this.isAdding = false;
          }
        );
    } else {
      this.min
        .editer(formData)
        .subscribe(
          (res: any) => {
            if (res.visibility == false) {
              this.toastr.error(res.message);
            } else {
              this.toastr.success(res.message);
            }

            this.ngOnInit();
            this.closeModal();
            this.isAdding = false;
          },
          (err) => {
            console.log(err)
            this.errors = err.error.errors;
            this.isAdding = false;
          }
        );
    }
  }

  show(id) {
    this.min.show(id).subscribe(
      (res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.data.id),
          ministry_name: new FormControl(res.data.libelle),
          descriptions: new FormControl(res.data.full_desc),
          leader_name: new FormControl(res.data.leader_name),
        });
        console.log(res.data)
        this.showModal();
      },
      (err) => {}
    );
  }

  loadCover(event){
    this.fichier = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fichier);
    reader.onload = (event) => {
      this.chemin = event.target.result;
    };
  }

  search() {
    if (this.word == '') {
      this.ngOnInit();
    } else {
      this.ministries = this.ministries.filter((res: any) => {
        return (
          res.libelle.toLocaleLowerCase().match(this.word.toLocaleLowerCase()) ||
          res.full_desc.toLocaleLowerCase().match(this.word.toLocaleLowerCase())
        );
      });
    }
  }

  delete(id) {
    this.min.delete(id).subscribe(
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

  Filter() {
    const filterInputs: any = document.querySelector(".filter-inputs");

    if (filterInputs.style.maxHeight) {
      filterInputs.style.maxHeight = null;
    } else {
      filterInputs.style.maxHeight = filterInputs.scrollHeight + "px";
    }
  }


}
