import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Category } from './category';


@Injectable()
export class CategoryService {

  private APIUrl = 'http://localhost/pjtsymfony/symfonyAngular/web/app_dev.php/notepad/api';

  constructor(private http: Http) {}

  getCategories() {
    console.log(`${this.APIUrl}/categories`);
    return this.http.get( `${this.APIUrl}/categories`)
      .map((res: Response) => res.json());
  }

  newCategory(category: Category) {
    console.log(`${this.APIUrl}/categories`);
    return this.http.post( `${this.APIUrl}/categories`, JSON.stringify(category), {})
      .map((res: Response) => res.json());
  }

  updateCategory(category: Category) {
    const idCat = category.id;
    console.log( `${this.APIUrl}/categories/${idCat}`);

    return this.http.put( `${this.APIUrl}/categories/${idCat}`, JSON.stringify(category), {})
      .map((res: Response) => res.json());
  }

  deleteCategory(category: Category) {
    const idCat = category.id;
    console.log(`${this.APIUrl}/categories/${idCat}`);

    return this.http.delete(`${this.APIUrl}/categories/${idCat}`, {})
      .map((res: Response) => res.json());
  }

  ////////////////////////////////////////////////////////////////////////////////////

  categories:Category[] = [
    {
      id: 1,
      name: 'testcategeory1',
    },
    {
      id: 2,
      name: 'testcategeory2',
    },
  ];

  sendCategories(){
    return this.categories;
  }
}
