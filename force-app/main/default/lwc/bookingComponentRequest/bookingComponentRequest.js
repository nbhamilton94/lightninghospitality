import { LightningElement, api, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class BookingComponentRequest extends NavigationMixin(LightningElement) {


    @api checkInDate;
    @api checkOutDate;
    @api guests;
    @api numberOfNights;
    @api cleaningFee;

    @api totalFormatted;
    @api taxesFormatted;
    @api nightlyRateFormatted;
    @api isLoading;


    connectedCallback(){

    }
    
    handlePriceRecalculation() {


    }

    handleRequestToBook() {


    }
}