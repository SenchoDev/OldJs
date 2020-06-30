//  GLOBAL APP CONTROLLER-
const controller = (function (budgetCtrl, UiCtrl) {

    const setupEventListeners = function () {
        const DOM = UiCtrl.getDOMStrings(); // accessible to the controller module

        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', function (e) {
            if (e.keyCode === 13) ctrlAddItem();
        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UiCtrl.changeType)
    };

    const updateBudget = function () {
        // 1. Calculate Budget 
        budgetCtrl.calculateBudget();
        // 2. Return the budget

        let budget = budgetCtrl.getBudget();
        //console.log(budget);

        // 3. Display the budget on the ui;
        UiCtrl.displayBudget(budget);

    };

    const updatePercentages = function(){
        //1. Calculate percentages
        budgetCtrl.calculatePercentages();

        //2. Read percentages from teh budget controller
        const percentages = budgetCtrl.getPercentages();

        //3 Update the UI witht hte new percentages
        UiCtrl.displayPercentages(percentages);
    };

    var ctrlAddItem = function () {

        let input, newItem;
        // 1. Get the field input dat
        input = UiCtrl.getInput();

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            // 2. Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            // 3. Add the item to the UI

            UiCtrl.addListItem(newItem, input.type);

            // 3.5 Clear the field

            UiCtrl.clearFields();

            // 4. update Budget

            updateBudget();

            // 5. calculate and update the percentages

            updatePercentages();

        }

    };

    var ctrlDeleteItem = function (e) {
        let itemID, splitID, type, ID;

        itemID = e.target.parentNode.parentNode.parentNode.parentNode.id;
        // we needed exacly 4 parentNodes bcoz that defines how up we want to go
        // 4 will be gtg  because there is the whole node when we click on <i> element 
        if (itemID) {
            //inc-1
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            // 1. Delete the item from the data structure

            budgetCtrl.deleteItem(type, ID);

            // 2. Delete the item fromthe UI
            UiCtrl.deleteListItem(itemID);

            // 3. Update and show the new budget

            updateBudget();
        }
    }

    return {
        init: function () {
            console.log('App is started');
            UiCtrl.displayMonth();
            UiCtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: 0,
            });
            setupEventListeners();
        }
    }

})(budgetController, UIController);

controller.init();