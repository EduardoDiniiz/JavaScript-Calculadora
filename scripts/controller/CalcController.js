class CalcController {

    constructor(){
        this.locale = 'pt-BR';
        this._currentDate;
        this._displayCalcEl = document.querySelector("#display");
        this._dateEl = document.querySelector("#date");
        this._timeEl = document.querySelector("#time");
        this.initialize();
    }

    initialize(){
        this.setDisplayDateAndTime();
        setInterval(()=>{
            this.setDisplayDateAndTime();
        }, 1000);
    }

    setDisplayDateAndTime(){
        this._dateEl.innerHTML = new Date().toLocaleDateString(this.locale, {
            day: "2-digit",
            month: "long",
            year: "numeric"
        });
        this._timeEl.innerHTML = new Date().toLocaleTimeString(this.locale);
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