import { map, switchMap } from "rxjs/Observable";
import "./styles/main.scss";
export default class SuperButton{
    constructor (selector){
        console.log(document.querySelector(selector));
    }
}

let foo = new SuperButton('#myButton');
