(function () {
'use strict';

var toBuyList = [
	{ name: "choclates", quantity: 20 },
	{ name: "cookies", quantity: 10 },
	{ name: "milks", quantity: 30 },
	{ name: "pizzas", quantity: 2 },
	{ name: "snacks", quantity: 5 }
];

var boughtList = [];


angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyCtrl = this;
  toBuyCtrl.items = ShoppingListCheckOffService.getItemsToBuy();
  toBuyCtrl.bought = function (index) {
    ShoppingListCheckOffService.buyItem(index);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtCtrl = this;  
  boughtCtrl.items = ShoppingListCheckOffService.getBougthItems();
}

function ShoppingListCheckOffService() {
  var service = this;
  
  // List of shopping items to buy
  var itemsToBuy = toBuyList;
  // List of shopping items bought
  var boughtItems = boughtList;
  
  //Move item to bougth list
  service.buyItem = function (itemIndex) {
	var item =  itemsToBuy[itemIndex];
	service.addBoughtItem(item);
    removeFromItemsToBuy(itemIndex);
  };

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };
  
  service.getBougthItems = function () {
    return boughtItems;
  };
  
  service.addBoughtItem = function (item) {
    boughtItems.push(item);
  };
  
  //private functions
  function removeFromItemsToBuy(itemIndex) {
	  itemsToBuy.splice(itemIndex, 1);
  };
}

})();
