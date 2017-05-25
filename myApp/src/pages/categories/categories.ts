import { Component, OnInit, Input } from '@angular/core';
import { NavController} from 'ionic-angular';
import { Category } from '../../app/category';
import { AddCategoryComponent } from '../addcategory/addcategory';
import {ToastController } from 'ionic-angular';
import { CategoryService } from '../../app/category.service';

@Component({
  selector: 'my-categories',
  templateUrl: 'categories.html',
  providers:[CategoryService]
})

export class CategoriesComponent implements OnInit {

  title = 'Liste des catégories';

  categories:Category[];
  categoryEdited = -1;
  newcategory: Category = null;

  constructor(public navCtrl: NavController,
    private category_service: CategoryService, private toastCtrl: ToastController) {

  }

  ngOnInit(): void {
    this.categories = this.category_service.sendCategories();
    this.getCategories();
  }
  goToNewCategory(){
    this.navCtrl.setRoot(AddCategoryComponent);
  }
  getCategories(): void {
    this.category_service.getCategories().subscribe(
      // function that runs on success
      data => { this.categories = data},
      // function that runs on error
      err => console.error(err),
      // function that runs on completion
      //() => console.log(this.categories)
      null
    );
  }

  validate(category: Category) {
    console.log(category);
    this.categoryEdited = -1;
  }


  updateCategory(category: Category, index: number) {
    this.category_service.updateCategory(category).subscribe(
      data => { this.categories[index] = data},
      err => console.error(err),
      () => { this.categoryEdited = -1; }
    );
  }

  deleteCategory(category: Category, index: number) {
    this.category_service.deleteCategory(category).subscribe(
      data => { this.categories.splice(index, 1);this.presentToast("A category has been deleted"); },
      err => console.error(err),
      () => { }
    );
  }
  presentToast(message:string) {
	  let toast = this.toastCtrl.create({
		message: message,
		duration: 3000,
		position: 'top'
	  });

	  toast.onDidDismiss(() => {
		console.log('Dismissed toast');
	  });

	  toast.present();
}


}
