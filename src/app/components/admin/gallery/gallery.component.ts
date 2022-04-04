import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { GalerieService } from '../../../services/galerie.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  images: any[] = [];

  isAdding: boolean;
  isLoanding: boolean;
  AppearModal :boolean;
  addActive = false;

  imageUrl = environment.apiImage;

  brandForm: FormGroup;

  errors = {
    images : ''
  };

  myFiles:any[] = [];
  file:any;

  urls:any[] = [];
  
  constructor(private galerie: GalerieService,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getImages();
    this.resetForm();
  }

  resetError() {
    this.errors.images = '';
    this.urls = [];
  }

  resetForm() {
    this.brandForm = new FormGroup({
      id: new FormControl('0'),
    });
  }

  getImages() {
    this.isLoanding = true;

    this.galerie.list().subscribe(
      (res: any) => {
        this.images = res;
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

    for (let i = 0; i < this.myFiles.length; i++) {
      formData.append('images[]', this.myFiles[i], this.myFiles[i].name);
    }

    this.galerie.ajouter(formData)
      .subscribe(
        (res: any) => {
          if (res.visibility == true) {
            this.toastr.success(res.message);
          }else{
            this.toastr.error(res.message);
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

  delete(id) {
    this.galerie.delete(id).subscribe(
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

  editer(id){
    this.brandForm.value.id = id;
    const file = document.getElementById("file");
    file.click()
  }

  loadImage(event) {
    this.file = event.target.files[0];
    const formData = new FormData();
    formData.append('id', this.brandForm.value.id);
    formData.append('image', this.file, this.file.name);

    this.galerie.editer(formData).subscribe((res:any)=>{
      this.ngOnInit();
      this.toastr.success(res.message);
      console.log(res)
    },(err)=>{
      console.log(err)
    })
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
