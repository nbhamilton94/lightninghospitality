import { LightningElement, api } from 'lwc';

export default class PropertyReviews extends LightningElement {

    @api review;


    connectedCallback() {
        console.log(JSON.stringify(this.review));
    }
}