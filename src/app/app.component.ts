import { Component, OnInit } from '@angular/core';
import { NotesStoreService } from './notes-store.service';
import {Note} from "./notes/note";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'note-taker';
  allNotes: Note[] = [];
  noteToEdit: { enableDelete: boolean, titleVal: string, noteVal: string, id: number } = {
    enableDelete: false,
    titleVal: "",
    noteVal: "",
    id: 0
  };

  constructor(private store: NotesStoreService) {}
  ngOnInit(): void {
    this.getNotes()
  }

  getNotes(){
    this.store.getNotes().subscribe({
      next: notes => this.allNotes = notes,
      error: err => console.log(err)
    })
  }

  onNoteEmit(note: { note: Note, isUpdated: Boolean }){
    if(!note.isUpdated){
      this.store.saveNote(note.note).subscribe({
        next: (note) => {
          this.getNotes()
        },
        error: (err) => console.log(err)
      })
    }else{
      this.store.updateNote(note.note).subscribe({
        next: (note) => {
          this.getNotes()
        },
        error: (err) => console.log(err)
      })
    }

  }

  deleteTask(id: number){
    this.store.deleteNote(id).subscribe({
      next: (note) => {
        this.getNotes()
      },
      error: (err) => console.log(err)
    })
  }

  editTask(note: Note){
    this.noteToEdit = {
      enableDelete: true,
      titleVal: note.title,
      noteVal: note.note_body,
      id: note.id
    }
  }
}
