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
    @api property;
    @api selectedPropertyId;
    @api isLoading;
    @api totalFormatted;
    @api taxesFormatted;
    @api nightlyRateFormatted;
    @api total;
    
    checkInDateRaw;
    checkOutDateRaw;
    dateFactor = 86400000;

    connectedCallback() {
        this.isLoading = false;
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

        this.taxes = parseFloat(((this.nightlyRate * this.numberOfNights) + this.cleaningFee ) * 0.08);
        this.total = parseFloat(this.nightlyRate * this.numberOfNights + this.cleaningFee + this.taxes);

        this.nightlyRateFormatted = this.nightlyRate.toFixed(2);
        this.taxesFormatted = this.taxes.toFixed(2);
        this.totalFormatted = this.total.toFixed(2);

        


    
    }

    async handleCalculate() {

        console.log('clicked');
        try {
            this.isLoading = true;
            this.property = await findProperty({ 
                checkInDate: this.checkInDate,
                checkOutDate: this.checkOutDate,
                recordId: this.selectedPropertyId
            });

            //get the property to get the average nightly rate.
            if(this.property) {
                
                this.nightlyRate = this.property.averageNightlyRate;
                this.cleaningFee = 70;
                
                console.log('CHECK IN DATE: ', this.checkInDate);
                console.log(typeof this.checkInDate);
                console.log('CHECK OUT DATE: ', this.checkOutDate);
                console.log(typeof this.checkOutDate);

                this.checkInDateRaw = new Date(this.checkInDate);
                this.checkOutDateRaw = new Date(this.checkOutDate);

                this.numberOfNights = (this.checkOutDateRaw - this.checkInDateRaw) / this.dateFactor;  
                this.taxes = ((this.nightlyRate * this.numberOfNights) + this.cleaningFee ) * 0.08;
                this.taxes = parseFloat(this.taxes);
                this.total = (parseFloat(this.nightlyRate) * parseFloat(this.numberOfNights)) + parseFloat(this.cleaningFee) + parseFloat(this.taxes);
                
                this.totalFormatted = this.total.toFixed(2);
                this.taxesFormatted = this.taxes.toFixed(2);
                this.nightlyRateFormatted = this.nightlyRate.toFixed(2);
                
               console.log('total formatted, handlecalculate: ', this.totalFormatted);
               console.log('taxes formatted, handlecalculate: ', this.taxesFormatted);

            }
        } catch (error) {
            console.error('Error retrieving available properties', error);
        } finally {
            this.isLoading = false;
        }
    }

    handleDateChange(event) {
        console.log('triggered');
        const { checkInDate, checkOutDate, guests } = event.detail; // Destructure details from the event
        if (checkInDate) {
            this.checkInDate = checkInDate;
        }
        if (checkOutDate) {
            this.checkOutDate = checkOutDate;
        }
        if (guests) {
            this.guests = guests;
        }
    
        console.log('Updated checkInDate:', this.checkInDate);
        console.log('Updated checkOutDate:', this.checkOutDate);
        console.log('Updated guests:', this.guests);
    }

    handleBookingRequest() {
        alert('clicked');
       // this.dispatchEvent(new CustomEvent('requestToBook'));
    }
}