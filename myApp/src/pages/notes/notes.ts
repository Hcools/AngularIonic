import { Component, OnInit, Input } from '@angular/core';
import { NavController} from 'ionic-angular';

import { Category } from '../../app/category';
import { Note } from '../../app/note';

import { NoteService } from '../../app/note.service';
import { CategoryService } from '../../app/category.service';

@Component({
  selector: 'my-notes',
  templateUrl: './notes.html',
  providers:[CategoryService,NoteService]
})

export class NotesComponent implements OnInit {
  title = 'Liste des notes';

  //@Input() notes = NOTES;
  notes:Note[];
  categories:Category[];
  note_edited = -1;
  newNote: Note = null;

  constructor(public navCtrl: NavController,
    private note_service: NoteService,
    private category_service: CategoryService) {
      this.notes = this.note_service.sendSample();
      this.categories = this.category_service.sendCategories();
      this.getNotes();
      this.getCategories();

  }

    ngOnInit(): void {
      console.log("rechargement des infos");
    }

  getNotes(): void {
    this.note_service.getNotes().subscribe(
      // function that runs on success
      data => { this.notes = data},
      // function that runs on error
      err => console.error(err),
      // function that runs on completion
      //() => console.log(this.notes)
      null
    );
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

  validate(note: Note) {
    console.log(note);
    this.note_edited = -1;
  }

  updateNote(note: Note, index: number): void {
    this.note_service.updateNote(note).subscribe(
      data => { this.notes[index] = data},
      err => console.error(err),
      () => { this.note_edited = -1; }
    );
  }

  deleteNote(note: Note, index: number) {
    this.note_service.deleteNote(note).subscribe(
      data => { this.notes.splice(index, 1) },
      err => console.error(err),
      () => { }
    );
  }
}
