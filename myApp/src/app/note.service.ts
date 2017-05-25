
import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable} from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Note } from './note';


@Injectable()
export class NoteService {
  private notesUrl = 'http://localhost/API/SymfonyAngular2/SymfonyAngular/web/app_dev.php/notepad/api';

  constructor(private http: Http) {}

  getNotes() {
    console.log(`${this.notesUrl}/notes`);
  //  const url = `${this.notesUrl}/notes`;
    return this.http.get(`${this.notesUrl}/notes`)
      .map((res: Response) => res.json());
  }

  newNote(note: Note) {
    const idCat = note.category.id;
    console.log( `${this.notesUrl}/categories/${idCat}/notes`);

    return this.http.post( `${this.notesUrl}/categories/${idCat}/notes`, JSON.stringify(note), {})
      .map((res: Response) => res.json());
  }

  //`http://localhost/symfonyAngular/web/app_dev.php/notepad/api/notes/37`
  deleteNote(note: Note) {
    const note_id = note.id;
    console.log(`${this.notesUrl}/notes/${note_id}`);

    return this.http.delete(`${this.notesUrl}/notes/${note_id}`, {})
      .map((res: Response) => res.json());
  }

  updateNote(note: Note) {
    const note_id = note.id;
    console.log(`${this.notesUrl}/notes/${note_id}`);

    return this.http.post(`${this.notesUrl}/notes/${note_id}`, JSON.stringify(note), {})
      .map((res: Response) => res.json());
  }


  ///////////////////////////////////////////////////////////////////////////

  notes:Note[] = [
    {
      id: 1,
      title: 'Note de test',
      content: 'Le contenu de la note',
      date: new Date('2017-04-18'),
      category: null,
    },
    {
      id: 2,
      title: 'Note de test 2',
      content: 'Contenu de la note',
      date: new Date('2017-04-19'),
      category: null,
    },
  ];
  sendSample(){
    return this.notes;
  }
}
