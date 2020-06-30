//  BUDGET CONTROLLER
const budgetController = (function () {
    const Expense = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
    }

    Expense.prototype.calcPercentage = function(totalIncome){
        if (totalIncome > 0) this.percentage = Math.round((this.value / totalIncome) *100);
        else this.percentage = -1;
    }

    Expense.prototype.getPercentage = function(){
        return this.percentage;
    }

    const Income = function (id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    const calculateTotal = function (type) {
        let sum = data.allItems[type].reduce((prev, cur) => { return prev += cur.value }, 0);
        data.totals[type] = sum;
    }

    let data = {
        allItems: {
            exp: [],
            inc: []

        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1, //something not existant,(no budget value no exp and inc, it should be -1);
    };

    return {
        addItem: function (type, des, val) {
            let newItem, ID;

            //[1 2 3 4 5], next ID = 6
            //[1 2 4 6 8], next ID = 9
            // ID = last ID + 1

            // Create new ID
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Create new item based on 'inc' or 'exp' type
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            // Push it into our data structure
            data.allItems[type].push(newItem);

            // Return the new element
            return newItem;
        },
        deleteItem: function (type, id) {

            let index;

            // id = 3;
            // data.allItems[type][id];
            // [1,2,3,4,5]
            // index = 3;

            let ids = data.allItems[type].map(current => current.id);
            index = ids.indexOf(id);

            if (index !== -1) data.allItems[type].splice(index, 1);
        },

        calculateBudget: function () {
            // 1. calculate total income and expenses

            calculateTotal('exp');
            calculateTotal('inc');
            //2. calculate the budget: income - expenses;

            data.budget = data.totals.inc - data.totals.exp;
            //3. calculate the percentage of income that we spent
            if (data.totals.inc > 0) data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            else data.percentage = -1;
        },

        calculatePercentages: function(){
            /*
            a = 20,
            b = 10,
            c = 40,
            income = 100
            a = 20/100 = 20%,
            b = 10/100 = 10%,
            ...
            */
            data.allItems.exp.forEach( cur => cur.calcPercentage(data.totals.inc));
        },

        getPercentages: function(){
            let allPerc = data.allItems.exp.map( cur => cur.getPercentage());
            return allPerc;
        },

        getBudget: function () {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage,
            }
        },
        testing: function () {
            console.log(data);
        }
    };


})();




