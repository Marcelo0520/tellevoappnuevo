import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore'; // Asegúrate de estar usando 'compat'
import { Observable } from 'rxjs';
import { WhereFilterOp } from '@firebase/firestore-types';  // Importa este tipo

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore){}

  creatDoc(data: any, path: string, id: string) {
    const collection = this.firestore.collection(path);
    return collection.doc(id).set(data);
  }

  getId() {
    return this.firestore.createId();
  }

  getCollection<tipo>(path: string) {
    const collection = this.firestore.collection<tipo>(path);
    return collection.valueChanges();
  }

  getDoc<tipo>(path: string, id: string) {
    return this.firestore.collection(path).doc<tipo>(id).valueChanges();
  }

  getCollectionByQuery<tipo>(path: string, field: string,operator: WhereFilterOp, value: any) { 
    const collection = this.firestore.collection<tipo>(path, ref => ref.where(field, operator, value));
    return collection.valueChanges();  
  }

  getCollectionByQueri<tipo>(path: string, field2: any, operator: WhereFilterOp, value: any) { 
    const collection = this.firestore.collection<tipo>(path, ref => ref.where(field2, operator, value));
    return collection.valueChanges();  
  }

}
