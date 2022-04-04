import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { SermonsService } from '../../../services/sermons.service';
import { ToastrService } from 'ngx-toastr';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-sermon',
  templateUrl: './sermon.component.html',
  styleUrls: ['./sermon.component.css'],
})
export class SermonComponent implements OnInit {
  sermons: any[] = [];

  brandForm: FormGroup;

  isAdding: boolean;
  isLoanding: boolean;
  AppearModal: boolean;
  addActive = false;

  imageUrl = environment.apiImage;

  errors = {
    title: '',
    descriptions: '',
    date: '',
    image: '',
    url: '',
    preacher_name: '',
  };

  key = 'id';
  reverse: boolean = false;
  p: number = 1;
  word: string;

  fichier: any;
  chemin: any;

  showFileInputs: boolean;

  constructor(
    private serm: SermonsService,
    private user: AdminAuthService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getSermons();
    this.resetForm();
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
      titre: new FormControl(''),
      descriptions: new FormControl(''),
      url: new FormControl(''),
      preacher_name: new FormControl(''),
      date: new FormControl(''),
    });
  }

  resetError() {
    this.errors.title = '';
    this.errors.descriptions = '';
    this.errors.date = '';
    this.errors.image = '';
    this.errors.preacher_name = '';
    this.errors.url = '';

    this.chemin = ''
  }

  getSermons() {
    this.isLoanding = true;
    this.serm.list().subscribe(
      (res: any) => {
        this.sermons = res.data;
        this.isLoanding = false;
      },
      (err) => {
        console.log(err);
        this.isLoanding = false;
      }
    );
  }

  sauvegarder() {
    this.isAdding = true;
    const formData = new FormData();

    formData.append('sermon_id', this.brandForm.value.id);
    formData.append('title', this.brandForm.value.titre);
    formData.append('descriptions', this.brandForm.value.descriptions);
    formData.append('url', this.brandForm.value.url);
    formData.append('preacher_name', this.brandForm.value.preacher_name);
    formData.append('user_id', this.user.getInfos().id);
    formData.append('date', this.brandForm.value.date);
    if (this.fichier) {
      formData.append('image', this.fichier, this.fichier.name);
    }

    if (this.brandForm.value.id == '0') {
      this.serm.ajouter(formData).subscribe(
        (res: any) => {
          this.toastr.success(res.message);
          this.ngOnInit();
          this.closeModal();
          this.isAdding = false;
        },
        (err) => {
          console.log(err);
          this.errors = err.error.errors;
          this.isAdding = false;
        }
      );
    } else {
      this.serm.editer(formData).subscribe(
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
    this.serm.show(id).subscribe(
      (res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.data.id),
          titre: new FormControl(res.data.titre),
          descriptions: new FormControl(res.data.full_desc),
          url: new FormControl(res.data.url),
          preacher_name: new FormControl(res.data.preacher_name),
          date: new FormControl(''),
        });
        console.log(res.data);
        this.showModal();
      },
      (err) => {}
    );
  }

  loadCover(event) {
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
      this.sermons = this.sermons.filter((res: any) => {
        return (
          res.titre.toLocaleLowerCase().match(this.word.toLocaleLowerCase()) ||
          res.full_desc
            .toLocaleLowerCase()
            .match(this.word.toLocaleLowerCase()) ||
          res.preacher_name
            .toLocaleLowerCase()
            .match(this.word.toLocaleLowerCase())
        );
      });
    }
  }

  delete(id) {
    this.serm.delete(id).subscribe(
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
    const filterInputs: any = document.querySelector('.filter-inputs');

    if (filterInputs.style.maxHeight) {
      filterInputs.style.maxHeight = null;
    } else {
      filterInputs.style.maxHeight = filterInputs.scrollHeight + 'px';
    }
  }
}
