import { LightningElement, api } from 'lwc';

export default class BookingComponentCalc extends LightningElement {

    @api checkInDate;
    @api checkOutDate;
    @api guests;

    connectedCallback() {
        this.guests = 2;
    }

    handleDateChange(event) {
        const fieldName = event.target.name; // Get the name of the field that triggered the event
        const fieldValue = event.target.value; // Get the new value of the field
    
        console.log('Field name:', fieldName);
        console.log('Field value:', fieldValue);
    
        if (fieldName === 'checkInDate') {
            this.checkInDate = fieldValue;
        } else if (fieldName === 'checkOutDate') {
            this.checkOutDate = fieldValue;
        } else if (fieldName === 'guests') {
            this.guests = fieldValue;
        }
    
        console.log('Updated values:', {
            checkInDate: this.checkInDate,
            checkOutDate: this.checkOutDate,
            guests: this.guests
        });
    
        // Dispatch the custom event
        const dateChangeEvent = new CustomEvent('datechange', {
            detail: {
                checkInDate: this.checkInDate,
                checkOutDate: this.checkOutDate,
                guests: this.guests
            },
            bubbles: true,
            composed: true
        });
        this.dispatchEvent(dateChangeEvent);
    }
}