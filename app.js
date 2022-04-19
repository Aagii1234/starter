// дэлгэцтэй ажиллах контроллер
var uiController = (function () {
  var DOMstrings = {
    inputtype: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };

  return {
    getinput: function () {
      return {
        type: document.querySelector(DOMstrings.inputtype).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// санхүүтэй ажиллах контроллер
var financeController = (function () {
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  
  var data = {
    items: {
      inc: [],
      exp: []
    }

    totals: {
      inc: 0,
      exp: 0
    }
  }
  return{
    addItems: function(type, disc, val){
      var item, id;
      if(data.items[type].length === 0) id = 1;
      else{
        id = data.items[type][data.items[type].length - 1].id+1;
      }
      if(type === 'inc'){
        item = new Income(id, desc, val);
      } else{
        item = new Expense(id, desc, val);
      }

      data.items[type].push(item);
    }
  }
})();

// Програмын холбогч контроллер
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    
    // 1. Оруулах өгөгдлийг дэлгэцээс олж авна.
    var input = uiController.getinput();
    // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэнд хадгална.
    financeController.addItems(input.type, input.description, input.value);
    // 3. Олж авсан өгөгдлүүдээ вэб дээрээ тохирох хэсэгт нь гаргана.
    // 4. Төсвийг тооцоолно.
    // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
  };

  var setupEventListners = function () {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });

    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("Application started...");
      setupEventListners();
    },
  };
})(uiController, financeController);

appController.init();
