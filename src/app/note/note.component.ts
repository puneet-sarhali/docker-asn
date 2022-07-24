import {Component, Output, EventEmitter, Input} from '@angular/core';
import { NotesStoreService } from '../notes-store.service';
import {Note} from "../notes/note";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent{
  @Output() noteCreated = new EventEmitter();
  @Input() inputData: { enableDelete: boolean, titleVal: string, noteVal: string, id: number } = {
    enableDelete: false,
    titleVal: "",
    noteVal: "",
    id: 0
  }
  constructor(private store: NotesStoreService) { }


  onSaveNote(values: {notetxt: HTMLTextAreaElement, title: HTMLInputElement}, isUpdated: Boolean){

    const note: { note: Note, isUpdated: Boolean } = {
      note: {
        id: 1,
        title: values.title.value,
        note_body: values.notetxt.value,
        last_modified: new Date()
      },
      isUpdated: isUpdated
    }

    if(this.inputData.id != 0){
      note.note.id = this.inputData.id;
    }

    this.noteCreated.emit(note);
    values.notetxt.value = ""

    this.inputData.noteVal = "";
    this.inputData.enableDelete = false;
    this.inputData.titleVal = "";
    this.inputData.id = 0;
  }


}
