import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor( private db: AngularFireDatabase) { }
  
  getCategories(): Observable<any[]> {
    return this.db.list<any>('/categories').snapshotChanges();
  }
}
