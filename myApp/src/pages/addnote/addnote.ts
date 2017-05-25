import { Component, OnInit, Input } from '@angular/core';
import { NavController} from 'ionic-angular';
import { NgModule }   from '@angular/core';
import {ToastController} from 'ionic-angular';

import { Category } from '../../app/category';
import { Note } from '../../app/note';

import { NoteService } from '../../app/note.service';
import { CategoryService } from '../../app/category.service';
import { NotesComponent } from '../notes/notes';

@Component({
  selector: 'addnote',
  templateUrl: 'addnote.html',
  providers:[CategoryService,NoteService]

})

export class AddNoteComponent implements OnInit {

  title = 'Ajouter une note';

  //@Input() notes = NOTES;
  notes:Note[];
  categories:Category[];
  note_edited = -1;
  newnote: Note = null;

  constructor(public navCtrl: NavController,
    private note_service: NoteService,
    private category_service: CategoryService,
    private toastCtrl: ToastController) {
      this.categories = this.category_service.sendCategories();
      this.getNotes();
      this.getCategories();
      this.newnote = new Note();
    }

  ngOnInit(): void {
    this.getNotes();
    this.getCategories();
    this.newnote = new Note();
  }

  getNotes(): void {
    this.note_service.getNotes().subscribe(
      // function that runs on success
      data => { this.notes = data},
      // function that runs on error
      err => console.error(err),
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

  newNote(note: Note) {
    this.note_service.newNote(note).subscribe(
      data => { this.notes.unshift(data);
        this.navCtrl.setRoot(NotesComponent);
      this.presentToast("A note has been created");
    },
      err => console.error(err),

    //  () => { this.newnote = null }
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

  initNewNote() {
    this.newnote = new Note();
  }

  cancelNewNote() {
      this.navCtrl.setRoot(NotesComponent)

  }
}
