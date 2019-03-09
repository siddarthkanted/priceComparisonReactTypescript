import * as Firebase from 'firebase';
import { Dispatch } from 'react';
import { SetGrocery } from './Actions';

export function getGrocery(): (dispatch: Dispatch<any>) => void {
    return dispatch => {
        const config = {
            apiKey: "AIzaSyDzwmSykRFIMFBy5JZkQmIcu5QZswwveGw",
            authDomain: "pricecomparison-6d140.firebaseapp.com",
            databaseURL: "https://pricecomparison-6d140.firebaseio.com",
            messagingSenderId: "233265084251",
            projectId: "pricecomparison-6d140",
            storageBucket: "pricecomparison-6d140.appspot.com"
        };
        Firebase.initializeApp(config);
        Firebase.database().ref().once('value').then((returnedAjaxData: any) => {
            console.log("Grocery ajax success");
            dispatch(
                new SetGrocery({
                    groceryList: returnedAjaxData.val()
                })
            );
            dispatch(returnedAjaxData.val());
        },
            (error: any) => {
                console.log("Grocery ajax failure");
            });
    };
}