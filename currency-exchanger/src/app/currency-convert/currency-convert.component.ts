import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CURRENCIES } from '../mock-currency';
import { Currency } from '../currency';
import { CurencyService } from '../servicess/curency.service';
import { Router } from '@angular/router';
import { first, take } from 'rxjs';

@Component({
  selector: 'app-currency-convert',
  templateUrl: './currency-convert.component.html',
  styleUrls: ['./currency-convert.component.scss']
})
export class CurrencyConvertComponent {
  currencyForm : FormGroup;
  currencyList = CURRENCIES;
  result = '';
  sampleView ='';
  popularValues :Currency []= []
  @Input() detailPageFlag = false
  @Input() set  data (value: any) {
    
    if(value){
      this.currencyForm.patchValue(value)

    }
 
 }


  constructor( private fb:FormBuilder,private currencyServices: CurencyService , private router:Router ){

  }

  ngOnInit() {
   this.buildForm()
  }

  buildForm(){
    this.currencyForm = this.fb.group({
      amount:[1,[Validators.required ,Validators.min(1)]],
      from:['',[Validators.required]],
      to :['',[Validators.required]]
    })

  }


  onSubmit(){
    let rateBase = this.currencyForm.value.to.rate/this.currencyForm.value.from.rate;
    this.result = this.currencyForm.value.amount * rateBase + `${this.currencyForm.value.to.symbol} ${this.currencyForm.value.to.name}`;
    this.sampleView = `1 ${this.currencyForm.value.to.symbol} ` +`${this.currencyForm.value.to.name} =` +
    `${(1*this.currencyForm.value.from.rate )}` + `${this.currencyForm.value.from.symbol} ` +`${this.currencyForm.value.from.name}`
    this.getValueForCurreny()
   
  }

  switchCurrencies(){
    const temp = this.currencyForm.value.from;
    this.currencyForm.get('from')?.setValue(this.currencyForm.value.to)
    this.currencyForm.get('to')?.setValue(temp)
    if(this.result){
      this.onSubmit()
    }
  }


  getValueForCurreny(){
   this.popularValues =  this.currencyList.filter(item => (item.name !== this.currencyForm.value.to.name && item.name !== this.currencyForm.value.from.name  ))
  }

  getRate(currency:Currency){
    let rateBase = currency.rate/this.currencyForm.value.from.rate;
    return `${(this.currencyForm.value.amount )}` + `${this.currencyForm.value.from.symbol} ` +`${this.currencyForm.value.from.name} =` +
    `${this.currencyForm.value.amount *rateBase}`+` ${currency.symbol} ` +`${currency.name}` 
  }


  goToDetails(){
    this.currencyServices.setData(this.currencyForm.value);
    this.router.navigateByUrl('/details')
  }
  

}
