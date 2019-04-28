class CalcController {

    constructor(){
        this._operation = [];
        this._locale = 'pt-BR';
        this._currentDate;
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#date");
        this._timeEl = document.querySelector("#time");
        this.initialize();
        this.initButtonsEvents();
    }

    initialize(){
        this.setDisplayDateAndTime();
        setInterval(()=>{
            this.setDisplayDateAndTime();
        }, 1000);
    }

    setDisplayDateAndTime(){
        this._dateEl.innerHTML = new Date().toLocaleDateString(this._locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this._timeEl.innerHTML = new Date().toLocaleTimeString(this._locale);
    }

    initButtonsEvents(){

        let buttons = document.querySelectorAll("#buttons > g, #parts > g"); // Find all buttons of classes #buttons and #parts

        buttons.forEach((btn, index)=>{ // Set events in each buttons
            this.addEventListenerAll(btn, 'click drag', e => { // Set event of click and drag

                let textBtn = btn.className.baseVal.replace("btn-","");
                console.log(textBtn);
                this.execBtn(textBtn);
    
            });

            this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e=>{ // Set event of mouseover, mouseup and mousedown

                btn.style.cursor = "pointer";

            });
        });
    }

    addEventListenerAll(element, events, fn){ // Function to set multiples events
        let eventsArray = events.split(' ');
        eventsArray.forEach(event => { // Set event and function in button  
            element.addEventListener(event, fn, false);
        });
    }

    execBtn(value){
        switch (value){
            case 'ac':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'soma':
                this.addOperation('+');
                break;
            case 'subtracao':
                this.addOperation('-');
                break;
            case 'divisao':
                this.addOperation('/');
                break;
            case 'multiplicacao':
                this.addOperation('*');
                break;
            case 'porcento':
                this.addOperation('%');
                break;
            case 'igual':
                this.addOperation('=');
                break;
            case 'ponto':
                this.addOperation('.');
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
            
        }
    }

    setLastOperation(value){
        this._operation[this._operation.length - 1] = value;
    }

    getLastOperation(){
        return this._operation[this._operation.length-1];
    }

    isOperator(value){
       return (['+', '-', '*', '%', '/'].indexOf(value) > -1);
    }

    pushOperation(value){
        this._operation.push(value);
        
        if(this._operation.length > 3) {
            this.calc();
        }
    }

    calc(){

        let lastValue = this._operation.pop;
        let result = eval(this._operation.join(""));
        this._operation = [result, lastValue];

    }

    addOperation(value){
        if(isNaN(this.getLastOperation())){

            if(this.isOperator(value)){
                this.setLastOperation(value);

            }else if(isNaN(value)) {

            } else {
                this.pushOperation(value);
            }

        } else if (this.isOperator(value)){
            this.pushOperation(value);
        } else {
            
            let newValue = this.getLastOperation().toString() + value.toString();
            this.setLastOperation(parseInt(newValue));

            this.setLastNumberToDisplay();
        }
    }
    
    setLastNumberToDisplay(){
        
    }

    setError(){
        this.displayCalc = "Error";
    }

    clearAll(){
        this.operation = [];
    }

    clearEntry(){
        this._operation.pop();
    }

    

    get displayCalc(){
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(displayCalc){
        this._displayCalcEl.innerHTML = displayCalc;
    }

    get displayTime(){
        return this._timeEl.innerHTML;
    }

    set displayTime(time){
        this._timeEl.innerHTML = time;
    }

    get displayDate(){
        return this._currentDate;
    }

    set displayDate(currentDate){
        this._currentDate = currentDate;
    }

} 