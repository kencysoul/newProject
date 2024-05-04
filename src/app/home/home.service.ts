import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore';
import { ishoes, shoes } from '../shoes/shoes.model';
import { AuthenticationService } from '../authentication.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private authenticationService : AuthenticationService,
    private alertController : AlertController
  ) { 
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async getShoes(): Promise<ishoes[]> {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    const shoesList: shoes[] = [];  
    // Retrieve shoes
    const querySnapshot = await getDocs(collection(firestore, "shoes"));
    querySnapshot.forEach((doc) => {
      const Shoes = doc.data() as shoes;
      Shoes.id = doc.id;
      shoesList.push(Shoes);
    });
    return shoesList;
  }

  async tryAdd(Shoes: shoes) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRefM1 = await addDoc(collection(firestore, "shoes"), {
        name: Shoes.name,
        brand: Shoes.brand,
        size: Shoes.size,
        price: Shoes.price,
        quantity: Shoes.quantity,
      });
      console.log("Document written with ID: ", docRefM1.id);
    } catch (e : any) {
      console.error("Error adding document: ", e);
      await this.presentAlert('Error', 'Failed to add the document, error: ' +e.message );
    }
  }
  async tryUpdate(Shoes : shoes) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRef = doc(firestore, "shoes", Shoes.id);
      await updateDoc(docRef, {
        id: Shoes.id,
        name: Shoes.name,
        brand: Shoes.brand,
        size: Shoes.size,
        price: Shoes.price,});
    } catch (e : any) {
      console.error("Error adding document: ", e);
      await this.presentAlert('Error', 'Failed to add the document, error: ' +e.message );
    }
  }
  async tryDelete(Shoes : shoes) {
    try {
      const docRef = doc(this.authenticationService.firestore, "shoes", Shoes.id);
      await deleteDoc(docRef);
    } catch (e : any) {
      console.error("Error, adding document: ", e);
      await this.presentAlert('Error', 'Failed to add the document, error: ' +e.message );
    }
  }
}
