import { DateTime } from "ionic-angular/components/datetime/datetime";

export class User{
    public id:number;
//     @param {String} pseudo - pseudo de l'utilisateur (Requis)
//     @param {String} firstname - prénom de l'utilisateur (Requis)
//     @param {Number} lastname - nom de l'utilisateur (Requis)
//     @param {String} email - Adresse email de l'utilisateur
//     @param {String} password - Mot de passe de l'utilisateur
//     @param {Date} create_at - Date de création
//    * @param {Date} update_at - Date de mise à jour
    constructor( public pseudo:string = "", public firstname:string = "", public lastname:string = "", public email:string = "", public password:string =""){
    }
}