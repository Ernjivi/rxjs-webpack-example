import 'bootstrap';
import "./styles/main.scss";

import { map, switchMap } from "rxjs/Observable";

export default class SuperButton{
    constructor (selector){
        console.log(document.querySelector(selector));
    }
}

let foo = new SuperButton('#myButton');
