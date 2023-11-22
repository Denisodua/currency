// Core
import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

// Services
import { CurrencyService } from '../../services/currency.service';

// Component
@Component({
    selector: 'app-currency',
    templateUrl: './currency.component.html',
    styleUrls: ['./currency.component.scss']
})

// Class
export class CurrencyComponent implements OnInit {
    testSumm: any;

    /**
     * Form of currencies
     */
    form = new FormGroup({
        firstCurrencySelect: new FormControl(),
        firstCurrencyInput: new FormControl<any | null>({value: '', disabled: true}),
        secondCurrencySelect: new FormControl(),
        secondCurrencyInput: new FormControl<any | null>({value: '', disabled: true}),
    });

    /**
     * Array of currencies
     */
    currencyArray: any = [];

    /**
     * Selected currency
     */
    selectedCurrency: any = ''

    /**
     * Input field name
     */
    inputName: string = ''

    /**
     * Exchange rates
     */
    rates: any = {
        one: null,
        second: null
    }

    /**
     * Currency exchange amount
     */
    total: any = {
        first: '',
        second: '',
        all: ''
    };

    /**
     * Constructor
     */
    constructor(
        private currencyService: CurrencyService
    ) {
    }

    /**
     * Initialization
     */
    ngOnInit(): void {
        this.currencyService.getCurrency().subscribe(
            (data: any) => {
                this.currencyArray = data;
                this.currencyArray.push(
                    {
                        "rate": 1,
                        "cc": "UAH",
                        "txt": "Українська гривня"
                    }
                )
            }
        );
    }

    /**
     * Selecting the currency for conversion
     */
    selectCurrency(e: any) {
        this.testSumm = this.form.controls.firstCurrencySelect.value
        this.rates.one = Number(this.form.controls.firstCurrencySelect.value)
        this.rates.two = Number(this.form.controls.secondCurrencySelect.value)

        if (e.target.name == 'firstCurrencySelect') {
            this.selectedCurrency = e.target.selectedOptions[0].text
        }

        if (this.rates.one && this.rates.two) {
            this.form.controls.firstCurrencyInput.enable()
            this.form.controls.secondCurrencyInput.enable()
        }

        if (this.inputName) {
            this.calculate(this.inputName)
        }
    }

    /**
     * Entering the conversion amount
     */
    inputCurrency(e: any) {
        this.inputName = e.target.name
        this.calculate(this.inputName)
    }

    /**
     * Currency conversion
     */
    calculate(name: string) {
        if (name == 'firstInput') {
            if (this.selectedCurrency != 'UAH') {
                this.total.second = (Number(this.rates.one) / Number(this.rates.two)) * this.form.controls.firstCurrencyInput.value
            } else {
                this.total.second = Number(this.form.controls.firstCurrencyInput.value) * Number(this.rates.two)
            }
        } else {
            if (this.selectedCurrency != 'UAH' && name != 'firstInput') {
                this.total.first = (Number(this.rates.two) / Number(this.rates.one)) * this.form.controls.secondCurrencyInput.value
            } else {
                this.total.first = Number(this.form.controls.secondCurrencyInput.value) * Number(this.rates.two)
            }
        }
    }
}
