import { LightningElement, api, track } from 'lwc';
import findProperty from '@salesforce/apex/CustomSearchController.findProperty';

export default class BookingComponentContainer extends LightningElement {

    @api checkInDate;
    @api checkOutDate;
    @api guests;
    @api nightlyRate;
    @api cleaningFee;
    @api numberOfNights;
    @api taxes;
    @api total;
    @api property;
    @api selectedPropertyId;

    checkInDateRaw;
    checkOutDateRaw;

    dateFactor = 86400000;

    connectedCallback() {

        this.property = JSON.parse(sessionStorage.getItem('customSearch--recordIds'));
        this.property = this.property[0];

        console.log('PROPERTY PART 2: ', JSON.stringify(this.property));
        console.log('average nightly rate: ', this.property.averageNightlyRate);
        this.checkInDate = new Date(sessionStorage.getItem('customSearch--checkInDate')).toISOString().slice(0, 10);
        this.checkOutDate = new Date(sessionStorage.getItem('customSearch--checkOutDate')).toISOString().slice(0, 10);
        
        this.checkInDateRaw = new Date(this.checkInDate);
        this.checkOutDateRaw = new Date(this.checkOutDate);

        this.selectedPropertyId = JSON.parse(sessionStorage.getItem('customSearch--recordId'));
        
        this.guests = 2;
        this.nightlyRate = this.property.averageNightlyRate;
        
        this.cleaningFee = 70;

        this.numberOfNights = (this.checkOutDateRaw - this.checkInDateRaw) / this.dateFactor;  
        this.taxes = parseFloat(((this.nightlyRate * this.numberOfNights) + this.cleaningFee ) * 0.08).toFixed(2);
        this.total = parseFloat(this.nightlyRate * this.numberOfNights + this.cleaningFee + this.taxes).toFixed(2);
    }

    async handleCalculate() {

        console.log('clicked');
        try {
            this.property = await findProperty({ 
                checkInDate: this.checkInDate,
                checkOutDate: this.checkOutDate,
                recordId: this.selectedPropertyId
            });

            //get the property to get the average nightly rate.
            if(this.property) {
                this.nightlyRate = this.property.averageNightlyRate;
                this.cleaningFee = 70;

                this.numberOfNights = (this.checkOutDate - this.checkInDate) / this.dateFactor;  
                this.taxes = ((this.nightlyRate * this.numberOfNights) + this.cleaningFee ) * 0.08;

                this.taxes = parseFloat(this.taxes).toFixed(2);
                this.total = parseFloat(this.nightlyRate * this.numberOfNights + this.cleaningFee + this.taxes).toFixed(2);
            }
        } catch (error) {
            console.error('Error retrieving available properties', error);
        }
    }

    handleDateChange(event) {
        const fieldName = event.target.name;
        if (fieldName === 'checkInDate') {
            this.checkInDate = event.detail.checkInDate;
        } else if (fieldName === 'checkOutDate') {
            this.checkOutDate = event.detail.checkOutDate;
        } else if (fieldName === 'guests') {
            this.guests = event.detail.guests;
        }
    }

    handleBookingRequest() {
        alert('clicked');
       // this.dispatchEvent(new CustomEvent('requestToBook'));
    }
}