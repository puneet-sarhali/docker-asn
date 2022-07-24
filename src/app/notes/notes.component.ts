import {Component, EventEmitter, Inject, Input, Output} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {Note} from "./note";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent {
  @Input() notes!: Note[];
  @Output() deleteTask: EventEmitter<any> = new EventEmitter<any>()
  @Output() editTask: EventEmitter<any> = new EventEmitter<any>()
  constructor(private dialog: MatDialog) { }

  openDialog(note: Note){
    const dialogRef = this.dialog.open(Dialog, {
      width: '500px',
      height: '500px',
      data: note
    });
  }

  onDelete(id: number){
    this.deleteTask.emit(id);
  }

  onEdit(note: Note){
    this.editTask.emit(note);
  }

}

@Component({
  selector: 'app-dialog',
  template: `
  <h2>{{ data.title }}</h2>
  <p>{{data.last_modified | date: "short"}}</p>
  <p>{{data.note_body}}</p>
  `,
})
export class Dialog {
  constructor(
    public dialogRef: MatDialogRef<Dialog>,
    @Inject(MAT_DIALOG_DATA) public data: Note,
  ) {}


}
