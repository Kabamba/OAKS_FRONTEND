import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { EventsService } from '../../../services/events.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment.prod';
import { AdminAuthService } from '../../../services/admin-auth.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})

export class EventComponent implements OnInit {

  events: any[] = [];

  brandForm: FormGroup;

  isAdding: boolean;
  isLoanding: boolean;
  AppearModal: boolean;
  addActive = false;

  imageUrl = environment.apiImage;

  errors = {
    titre: '',
    descriptions: '',
    user_id: '',
    date : '',
    cover : '',
    images : ''
  };

  key = 'id';
  reverse: boolean = false;
  p: number = 1;
  word: string;

  myFiles:any[] = [];
  urls:any[] = [];
  fichier : any;
  chemin : any;

  showFileInputs:boolean;
  
  constructor(private evt: EventsService,private user: AdminAuthService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getEvents();
    this.resetForm();
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
      titre: new FormControl(''),
      descriptions: new FormControl(''),
      date: new FormControl(''),
    });
  }

  resetError() {
    this.errors.titre = '';
    this.errors.descriptions = '';
    this.errors.date = '';
    this.errors.user_id = '';
    this.errors.cover = '';
    this.errors.images = '';
  }

  getEvents() {
    this.isLoanding = true;
    this.evt.list().subscribe(
      (res: any) => {
        this.events = res.data;
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
    formData.append('title',this.brandForm.value.titre);
    formData.append('descriptions',this.brandForm.value.descriptions);
    formData.append('user_id',this.user.getInfos().id);
    formData.append('date',this.brandForm.value.date);
    

    if (this.brandForm.value.id == '0') {
      for (let i = 0; i < this.myFiles.length; i++) {
        formData.append('images[]', this.myFiles[i], this.myFiles[i].name);
      }
  
      formData.append('cover', this.fichier, this.fichier.name);
  
      this.evt
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
      this.evt
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
            this.errors = err.error.errors;
            this.isAdding = false;
          }
        );
    }
  }

  show(id) {
    this.evt.show(id).subscribe(
      (res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.data.id),
          titre: new FormControl(res.data.titre),
          date: new FormControl(''),
          descriptions: new FormControl(res.data.full_desc),
        });
        console.log(res.data)
        this.showModal(2);
      },
      (err) => {}
    );
  }

  onSelectedFile(event) {
    this.myFiles = event.target.files;
    for (let i = 0; i < this.myFiles.length; i++) {
      var reader = new FileReader();
      reader.readAsDataURL(this.myFiles[i]);
      reader.onload = (event) => {
        this.urls.push(event.target.result);
      };
    }
  }

  loadCover(event){
    this.fichier = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(this.fichier);
    reader.onload = (event) => {
      this.chemin = event.target.result;
    };
  }

  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  search() {
    if (this.word == '') {
      this.ngOnInit();
    } else {
      this.events = this.events.filter((res: any) => {
        return (
          res.titre.toLocaleLowerCase().match(this.word.toLocaleLowerCase()) ||
          res.full_desc.toLocaleLowerCase().match(this.word.toLocaleLowerCase())
        );
      });
    }
  }

  delete(id) {
    this.evt.delete(id).subscribe(
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

  showModal(id) {
    if (id == 1) {
      this.showFileInputs = true;
    }else{
      this.showFileInputs = false;
    }

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
