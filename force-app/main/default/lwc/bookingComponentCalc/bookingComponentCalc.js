import { LightningElement, api } from 'lwc';

export default class BookingComponentCalc extends LightningElement {

    @api checkInDate;
    @api checkOutDate;
    @api guests;

    connectedCallback() {
        this.checkInDate = sessionStorage.getItem('customSearch--checkInDate');
        this.checkOutDate = sessionStorage.getItem('customSearch--checkOutDate');
        this.guests = 2;
    }

    handleDateChange() {
        this.checkInDate = this.template.querySelector('[name="checkInDate"]').value;
        this.checkOutDate = this.template.querySelector('[name="checkOutDate"]').value;
        this.guests = this.template.querySelector('[name="guests"]').value;

        const dateChangeEvent = new CustomEvent('datechange', {
            detail: {
                checkInDate: this.checkInDate,
                checkOutDate: this.checkOutDate,
                guests: this.guests
            }
        });
        this.dispatchEvent(dateChangeEvent);
    }
}