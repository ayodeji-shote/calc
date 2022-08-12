// Constructor class for the calculator to store the data 
class Calculator {
    constructor(prevTextElement, currTextElement) {
        // This is a way to set the text elements in the calculator class 
        this.prevTextElement = prevTextElement
        this.currTextElement = currTextElement
        this.clear()

    }

    // These are the methods for the calculator to perform its functions 
    clear() {
        this.prevOperand = ""
        this.currOperand = ""
        this.operator = undefined

    }

    delete() {
            this.currOperand = ""
        

    }
    // Method to put number on screen every time a user clicks on a number 
    generateNumber(number) {
        // if (!equalb)
        // {
        if (number === "." && this.currOperand.includes(".")) return
        // Converting it to a string cause javascript tries to ad them as actual numbers
        if (this.currOperand != undefined) {

            this.currOperand += number.toString();
        }
        else {
            this.currOperand = number

        }
    // }
    // else {
    //     equalb = false
    //     this.clear();
    //     this.currOperand= number
    // }
    }

    selectOperator(operator, ops) {
        equalm = false;
        var prev = false
        // if (this.currOperand == "") return;
        if (this.prevOperand !== "") {
            this.calculate(this.prevOperand)
            prev = true
            
        }
        if (prev == true) 
        {
         var hold = this.prevOperand 
         this.currTextElement.innerHTML = ""
         this.prevOperand = hold

        }
        else {
            var curr = this.currOperand.slice(-1)
            this.prevOperand += this.currOperand
            this.currOperand = ""
        }
        
        var same = false
        for (var i = 0; i < ops.length; i++) {

            if (curr == ops[i].innerHTML && same == false) {
                same = true
            }
        }
        if (same === false) {
            this.prevOperand += operator.toString()
        }
        else {
            this.currOperand = this.currOperand.slice(0, -1) + operator.toString()
            
        }



    }

    // Does the calculation and returns a single value
    calculate(number) {
        number = number+this.currOperand
        var value = 0
        for (var i = 0; i < number.length; i++) {
            if (number[i]=== "+") {
                const [num1, num2] = this.split(number, i);
                value = parseFloat(num1) + parseFloat(num2)
                value = value.toPrecision(2)
                this.prevOperand = value
                return value
            }
            if (number[i]=== "*") {
                const [num1, num2] = this.split(number, i);
                value = parseFloat(num1) * parseFloat(num2)
                value = value.toPrecision(3)
                this.prevOperand = value
                return value
            }
            if (number[i]=== "÷") {
                const [num1, num2] = this.split(number, i);
                value = parseFloat(num1)/ parseFloat(num2)
                value = value.toPrecision(2)
                this.prevOperand = value
                return value
            }
            if (number[i]=== "-") {
                const [num1, num2] = this.split(number, i);
                value = parseFloat(num1)-parseFloat(num2)
                value = value.toPrecision(2)
                this.prevOperand = value
                return value
            }

        }
    }
    equal(){

        if (equalm == false)
        {
        op = this.prevOperand.slice(-1)
        saved = this.currOperand
        this.prevOperand += this.currOperand
        var equalvalue = this.prevOperand
        this.display()
        this.clear()
        var tester = this.calculate(equalvalue)
        this.equalDisplay(tester)

        equalm=true 
        }
        else{
            console.log("saved is "+ saved)
            var val = op.concat(saved)
            console.log("val is "+ val)
            var val1 = this.currTextElement.innerHTML.concat(val)
            this.prevOperand = val1
            this.display()
            this.currOperand =""
            this.equalDisplay(this.calculate(val1))
            
            
        }
        
    }

     split(str, index) {
        const result = [str.slice(0, index), str.slice(index+1)];
      
        return result;
      }
    // Function to update display with the answer 
    display() {
        this.currTextElement.innerHTML = this.currOperand;
        this.prevTextElement.innerHTML = this.prevOperand;
    }

    equalDisplay(val) {
        this.currTextElement.innerHTML = val
        
    }

}
// used to select the number buttons from the html document
const numberButtons = document.querySelectorAll('[data-number]');
const operatorbuttons = document.querySelectorAll('[data-operation]');
const equalButtons = document.querySelector('[data-equals]');
const clearbuttons = document.querySelector('[data-clear]');
const deleteButtons = document.querySelector('[data-delete]');
const prevTextElement = document.querySelector('[data-previousop]');
const currTextElement = document.querySelector('[data-currentop]');
var equalb = false;
var equalm = false;
var op =""
var saved = ""
const calc = new Calculator(prevTextElement, currTextElement)
numberButtons.forEach(button => {
    
    button.addEventListener('click', () => {
        calc.generateNumber(button.innerHTML)
        calc.display()
    })
})

operatorbuttons.forEach(button => {
   
    button.addEventListener('click', () => {
        calc.selectOperator(button.innerHTML, operatorbuttons)
        calc.display()

    })
})

equalButtons.addEventListener('click', () => {
    calc.equal()
    // equalb = false 
});

clearbuttons.addEventListener('click', () => {
    calc.clear()
    calc.display()
});

deleteButtons.addEventListener('click', () => {
    calc.delete()
    calc.display()
});