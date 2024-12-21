import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BookingComponentRequest extends NavigationMixin(LightningElement) {


    @api checkInDate;
    @api checkOutDate;
    @api guests;
    @api nightlyRate;
    @api numberOfNights;
    @api cleaningFee;
    @api taxes;
    @api total;

    connectedCallback(){
        
    }
    
    handlePriceRecalculation() {


    }

    handleRequestToBook() {


    }
}