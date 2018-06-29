import { DateTime } from "ionic-angular/components/datetime/datetime";

export class Advert{

    // title           : { type: String, required: true },
    // img             : { type: String, required: true },
    // price           : { type: Number, required: true },
    // create_at       : { type: Date, default: Date.now },
    // update_at       : { type: Date, default: Date.now },
    // description     : { type: String, required: true },
    // localisation    : { type: Number, required: true },
    // id_user         : {type: Schema.Types.ObjectId, ref: 'users', required: true}
    public _id:string;
    public create_at :DateTime;
    public update_at:DateTime;

    constructor(public title:string = "", public img:string ="", public price:number = null, public description:string = "", public localisation:number = null, public id_user:string  = "" ){
    

    }
}