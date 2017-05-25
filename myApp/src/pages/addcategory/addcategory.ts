import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../app/category';
import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { LocationStrategy, HashLocationStrategy} from '@angular/common';
import {ModuleWithProviders} from '@angular/core';
import { NavController} from 'ionic-angular';
import {ToastController} from 'ionic-angular';

import { CategoriesComponent } from '../categories/categories';

import { NoteService } from '../../app/note.service';
import { CategoryService } from '../../app/category.service';

@Component({
  selector: 'addcategory',
  templateUrl: 'addcategory.html',
  providers:[CategoryService,NoteService]

})

export class AddCategoryComponent implements OnInit {

  title = 'Ajouter une catégorie';
  categories:Category[];
  newcategory: Category = null;

  constructor(public navCtrl: NavController, private category_service: CategoryService, private toastCtrl: ToastController) {}

  ngOnInit(): void {
    this.newcategory = new Category();
    console.log(this.newCategory);
    this.categories = this.category_service.sendCategories();
    this.getCategories();
    console.log("fdfvcfde")
  }

  getCategories(): void {
    this.category_service.getCategories().subscribe(
      //works
      data => { this.categories = data},
      //doesnt works
      err => console.error(err),
      //() => console.log(this.categories),
     null
    );
  }

  initNewCategory() {
    this.newcategory = new Category();
  }

  newCategory(category: Category) {
    console.log("ggggggg");
    this.category_service.newCategory(category).subscribe(
      data => { this.categories.unshift(data),
        this.presentToast("A category has been created");
        this.navCtrl.setRoot(CategoriesComponent); },

      err => console.error(err),
      //() => { this.newcategory = null }
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

  deleteNewCategory() {
    //this.newcategory = null;
    this.navCtrl.setRoot(CategoriesComponent);

  }

}
