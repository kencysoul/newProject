import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {
  user: any;
  value = '';
  oldValue = '0';
  allValue = '';
  lastOperator = '/';
  newInput : boolean = true;
  numbers = [
    [7, 8, 9, '/'],
    [4, 5, 6, 'x'],
    [1, 2, 3, '-'],
    ['c', 0, '+', '=']
  ];
  constructor() { }

  ngOnInit() {
    this.user = localStorage.getItem('user');
  }
  
  pressEvent(symbol: any) {
  console.log(symbol)
  if (symbol !== '=') {
    this.allValue += '' + symbol;
  }
  
  if (Number(symbol)) {
    console.log('a number')
    if (this.newInput) {
      this.value = '' + symbol; //starts a number
      this.newInput = false;
    } else {
      this.value += '' + symbol; //adds more number
    }
  }
  else if (symbol === 'c') { //clear
    this.value = '';
    this.allValue = '';
    this.newInput = true;
  }
  else if (symbol === '=') {
    if (this.lastOperator === '/')
      this.value = '' + (parseInt(this.oldValue) / parseInt(this.value));
    else if (this.lastOperator === 'x')
      this.value = '' + (parseInt(this.oldValue) * parseInt(this.value));
    else if (this.lastOperator === '-')
      this.value = '' + (parseInt(this.oldValue) - parseInt(this.value));
    else if (this.lastOperator === '+')
      this.value = '' + (parseInt(this.oldValue) + parseInt(this.value));
    this.newInput = true;
  }
  else {
    this.newInput = true;
    this.oldValue = this.value;
    this.lastOperator = symbol;
  }
  }
}
