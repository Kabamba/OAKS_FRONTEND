import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import { TestimonialsService } from '../../../services/testimonials.service';
import { ToastrService } from 'ngx-toastr';
import { AdminAuthService } from 'src/app/services/admin-auth.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements OnInit {

  testimonials: any[] = [];

  brandForm: FormGroup;

  isAdding: boolean;
  isLoanding: boolean;
  AppearModal: boolean;
  addActive = false;

  imageUrl = environment.apiImage;

  errors = {
    title: '',
    descriptions: '',
    witness_name: '',
    date : '',
    images : '',
    cover : '',
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
  
  constructor(private testi: TestimonialsService,private admin:AdminAuthService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getTestimonials();
    this.resetForm();
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
      title: new FormControl(''),
      descriptions: new FormControl(''),
      witness_name: new FormControl(''),
      date: new FormControl(''),
    });
  }

  resetError() {
    this.errors.title = '';
    this.errors.descriptions = '';
    this.errors.date = '';
    this.errors.images = '';
    this.errors.cover = ''
  }

  getTestimonials() {
    this.isLoanding = true;
    this.testi.list().subscribe(
      (res: any) => {
        this.testimonials = res.data;
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
    formData.append('title',this.brandForm.value.title);
    formData.append('descriptions',this.brandForm.value.descriptions);
    formData.append('witness_name',this.brandForm.value.witness_name);
    formData.append('user_id',this.admin.getInfos().id);
    formData.append('date',this.brandForm.value.date);
    

    if (this.brandForm.value.id == '0') {
      for (let i = 0; i < this.myFiles.length; i++) {
        formData.append('images[]', this.myFiles[i], this.myFiles[i].name);
      }
  
      if (this.fichier) {
        formData.append('cover', this.fichier, this.fichier.name);
      }
  
      this.testi
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
      this.testi
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
    this.testi.show(id).subscribe(
      (res: any) => {
        this.brandForm = new FormGroup({
          id: new FormControl(res.data.id),
          title: new FormControl(res.data.titre),
          witness_name: new FormControl(res.data.witness_name),
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
      this.testimonials = this.testimonials.filter((res: any) => {
        return (
          res.titre.toLocaleLowerCase().match(this.word.toLocaleLowerCase()) ||
          res.full_desc.toLocaleLowerCase().match(this.word.toLocaleLowerCase())
        );
      });
    }
  }

  delete(id) {
    this.testi.delete(id).subscribe(
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
