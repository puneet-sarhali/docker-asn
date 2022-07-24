import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Note } from "./notes/note";

@Injectable({
  providedIn: 'root'
})
export class NotesStoreService {

  private base_url = "http://localhost:3001/notes";

  constructor(private http : HttpClient) {

  }

  getNotes(){
    return this.http.get<Note[]>(this.base_url);
  }

  saveNote(note: Note){
    return this.http.post<Note>(this.base_url, note);
  }

  updateNote(note: Note){
    return this.http.put<Note>(this.base_url + `/${note.id}`, note);
  }

  deleteNote(id: number){
    return this.http.delete(this.base_url + `/${id}`);
  }

}
