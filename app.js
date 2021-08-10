const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)

const resetBtn = $('#reset-btn')
const billInput = $('#bill-input')
const peopleInput = $('#people-input')
const tipAmountShow = $('#tip-amount')
const dividedAmountShow = $('#divided-amount')
const tipSelections = $$('input[type="radio"]')
var tipPercent = 0


function render(target, data) {
    target.innerHTML = data
}

function calculate(bill = 0, tip = 0, people = 0){
    let tipAmount = (bill * (tip/100)) / people
    let totalAmount = (parseFloat(bill) + parseFloat(bill * (tip/100))) / people
    
    render(tipAmountShow, isNaN(tipAmount) ? "0.00" : tipAmount.toFixed(2))
    render(dividedAmountShow, isNaN(totalAmount) ? "0.00" : totalAmount.toFixed(2))
}


// Event Handle

resetBtn.onclick = function(){
    billInput.value = 0
    peopleInput.value = 0
    tipAmountShow.innerHTML = "0.00"
    dividedAmountShow.innerHTML = "0.00"
    tipPercent = 0;
    tipSelections.forEach(tipSelection => {
        tipSelection.checked = false
    })
}

tipSelections.forEach(tipSelection => {
    tipSelection.onchange = function(){
        tipPercent = this.value;
        handleChange();
    }
})
$('#custom-tip').onkeyup = function(){
    $('#custom').value = this.value;
    tipPercent = this.value;
    handleChange();
}
function handleChange(){
    calculate(billInput.value, tipPercent, peopleInput.value)
}

billInput.addEventListener("keyup", handleChange)
peopleInput.addEventListener("keyup", handleChange)
