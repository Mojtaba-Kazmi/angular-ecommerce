import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject, SnapshotAction } from '@angular/fire/compat/database';
import { Product } from '../model/product';
import { Observable ,map} from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private db: AngularFireDatabase) { }

  create(product: any[]) {
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products').snapshotChanges().pipe(
      map((snapshotActions: SnapshotAction<unknown>[]) =>
        snapshotActions.map((snapshotAction: SnapshotAction<unknown>) => ({
          key: snapshotAction.key,
          ...(snapshotAction.payload.val() as Product)
        }))
      )
    );
  }
  

  getProduct(id: string | null) {
    return this.db.object<Product>('/products/' + id).valueChanges();
  }

  updateProduct(id: string | null, product: any) {
    return this.db.object<Product>('/products/' + id).update(product);
  }

  deleteProduct(id: string | null) {
    return this.db.object<Product>('/products/' + id).remove();
  }

}
