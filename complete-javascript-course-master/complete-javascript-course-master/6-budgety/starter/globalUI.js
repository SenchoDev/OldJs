//  UI CONTROLLER-
const UIController = (function () {

    let arr = [];

    const DOMStrings = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel: '.item__percentage',
        dateLabel: '.budget__title--month'
    };
    const formatNumber = function(num, type){
        let numSplit, int, dec;
        /*
        + or - before num
        exactly 2 decimal points
        comma separating the thousands
        2310.4567 -> 2,310.46
        200 -> +2,00.00
        */
       

        num = Math.abs(num);
        num = num.toFixed(2);
        numSplit = num.split('.');
        
        int = numSplit[0];

        dec = numSplit[1];

        if(int.length > 3) int = int.substr(0, int.length - 3) + ',' + int.substr(int.length - 3, 3);
        dec = numSplit[1];

        return (type === 'exp' ? sign = '-' : sign = '+') + ' ' + int + '.' + dec;
    };

    let nodeListForEeach = function(list, callback){
        for(let i = 0; i < list.length;i++){
            callback(list[i], i);
        }
    };

    return {
        getInput: function () {

            return {
                type: document.querySelector(DOMStrings.inputType).value,// will be either inc or exp
                description: document.querySelector(DOMStrings.inputDesc).value,
                value: parseFloat(document.querySelector(DOMStrings.inputValue).value),

            }
        },
        addListItem: function (obj, type) {
            let html, element;
            // Create HTML string with place holder text
            if (type === 'inc') {
                element = DOMStrings.incomeContainer; // this.formatNumber would work if we export the method(function)
                //but if we have private function we wont use this keyword
                html = `<div class="item clearfix" id="inc-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                    <div class="item__value">${formatNumber(obj.value, type)}</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`
            } else {
                element = DOMStrings.expensesContainer;
                html = `<div class="item clearfix" id="exp-${obj.id}">
                <div class="item__description">${obj.description}</div>
                <div class="right clearfix">
                    <div class="item__value">${formatNumber(obj.value, type)}</div>
                    <div class="item__percentage">21%</div>
                    <div class="item__delete">
                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                    </div>
                </div>
            </div>`
            }

            //Replace the placeholder text with some actual data
            //newHtml = html.replace('%id%', obj.id);
            //newHtml = newHtml.replace('%description%', obj.description);
            //newHtml = newHtml.replace('%value%', obj.value);

            //Insert the HTML into the dom
            
            

            
        },

        deleteListItem: function(selectorID){
            let el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);

        },

        clearFields: function () {
            let fieldsArr;

            fieldsArr = Array.from(document.querySelectorAll(`${DOMStrings.inputDesc}, ${DOMStrings.inputValue}`));

            fieldsArr.forEach((current) => current.value = "");

            fieldsArr[0].focus();
        },
        displayBudget: function (obj) {
            let type;
            obj.budget > 0 ? type = 'inc' : type = 'exp';


            document.querySelector(DOMStrings.budgetLabel).textContent = formatNumber(obj.budget, type);
            document.querySelector(DOMStrings.incomeLabel).textContent =  formatNumber(obj.totalInc, 'inc');
            document.querySelector(DOMStrings.expensesLabel).textContent =  formatNumber(obj.totalExp, 'exp');
            //document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage;

            if (obj.percentage > 0) document.querySelector(DOMStrings.percentageLabel).textContent = obj.percentage + '%';
            else document.querySelector(DOMStrings.percentageLabel).textContent = '---';
        },

        displayPercentages: function(percentages){
            let fields = document.querySelectorAll(DOMStrings.expensesPercLabel);

            nodeListForEeach(fields, function(current, index){

                if(percentages[index] > 0) current.textContent = percentages[index] + '%';
                else current.textContent = '---';
            });
        },

        displayMonth: function(){
            let now, months, month, year;

            now = new Date();

            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            month = now.getMonth();

            year = now.getFullYear();
            document.querySelector(DOMStrings.dateLabel).textContent = months[month] + ' ' + year;

        },
        changeType: function(){
            let fields = document.querySelectorAll(
                DOMStrings.inputType + ',' + DOMStrings.inputDesc + ',' + DOMStrings.inputValue
            );

            nodeListForEeach(fields, cur => cur.classList.toggle('red-focus'));

            document.querySelector(DOMStrings.inputBtn).classList.toggle('red');

        },
        getDOMStrings: function () {
            return DOMStrings; // exposing private obj to the public
        }
    }

    // Some code

})();

