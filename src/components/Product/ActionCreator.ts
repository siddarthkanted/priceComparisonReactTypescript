import * as Firebase from 'firebase';
import { Status } from 'src/model/Model';
import { SetGrocery, SetStatus } from './Actions';

export function getGroceryAction(dispatch: any): void {
    dispatch(
        new SetStatus({
            status: Status.Loading
        })
    );
    const config = {
        apiKey: "AIzaSyDzwmSykRFIMFBy5JZkQmIcu5QZswwveGw",
        authDomain: "pricecomparison-6d140.firebaseapp.com",
        databaseURL: "https://pricecomparison-6d140.firebaseio.com",
        messagingSenderId: "233265084251",
        projectId: "pricecomparison-6d140",
        storageBucket: "pricecomparison-6d140.appspot.com"
    };
    if (!Firebase.apps.length) {
        Firebase.initializeApp(config);
    }
    Firebase.database().ref().once('value').then((returnedAjaxData: any) => {
        dispatch(
            new SetGrocery({
                groceryList: returnedAjaxData.val()
            })
        );
    },
        (error: any) => {
            console.log("Grocery ajax failure");
        });
}