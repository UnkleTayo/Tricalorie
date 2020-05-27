// Item Controller
const ItemCtrl = (function () {
  // Item Constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data Structures / state
  const data = {
    items: [
      // { id: 0, name: 'Steak Dinner', calories: 1200 },
      // { id: 1, name: ' Dinner Eggs', calories: 600 },
      // { id: 2, name: 'Steak Meat', calories: 400 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // making it a public module
  // lets eturn something
  return {
    getItems: function () {
      return data.items;
    },

    // Add Item
    addItem: function (name, calories) {
      // console.log(name, calories);
      let ID;
      // create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Caloreisnto number
      calories = parseInt(calories);

      // Create new Item
      newItem = new Item(ID, name, calories);
      // Add to items Array
      data.items.push(newItem);

      return newItem;
    },

    getTotalCalories: function () {
      let total = 0;

      // loop through item to ge calories value
      data.items.forEach((item) => (total += item.calories));

      // set total calories in data structures
      data.totalCalories = total;

      return data.totalCalories;
    },

    logData: function () {
      return data;
    },
  };
})();

// UI Controller
const UICtrl = (function () {
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
    totalCalories: '.total-calories',
  };

  // Public Method
  return {
    populateItemList: function (items) {
      let html = '';
      items.forEach((item) => {
        html += `<li class="collection-item" id="item-${item.id}">
  <strong> ${item.name}: </strong> <em>${item.calories} Calories</em>
  <a href="#" class="secondary-content">
    <i class="edit-item fa fa-pencil"></i>
  </a>
</li>`;
      });

      // Insert List item
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    // Get Item Input
    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },

    // Add list to UI
    addListItem: function (item) {
      document.querySelector(
        UISelectors.itemList
      ).getElementsByClassName.display = 'block';
      // create li Element
      const li = document.createElement('li');
      // Add className
      li.className = 'collection-item';
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `
      <strong> ${item.name}: </strong> <em>${item.calories} Calories</em> 
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;

      // insert item
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },

    // clear Input Field
    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';

      document.querySelector(UISelectors.itemCaloriesInput).value = '';
    },
    hideList: function () {
      document.querySelector(
        UISelectors.itemList
      ).getElementsByClassName.display = 'none';
    },

    showTotalCalories: function (totalCalories) {
      document.querySelector(
        UISelectors.totalCalories
      ).textContent = totalCalories;
    },

    getSelectors: function () {
      return UISelectors;
    },
  };
})();

// App conrollerF
const App = (function (ItemCtrl, UICtrl) {
  // Load Event Listeners
  const LoadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add item events
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);
  };

  // Add item submit
  const itemAddSubmit = function (e) {
    // Get form Input from UI cONTROLLER
    const input = UICtrl.getItemInput();
    // check for Input values
    if (input.name !== '' && input.calories !== '') {
      //  Add Item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add item to UI lIST
      UICtrl.addListItem(newItem);

      // Get total calories
      const totalCalories = ItemCtrl.getTotalCalories();

      // Add totalCalories to the UI
      UICtrl.showTotalCalories(totalCalories);

      // clear input filds
      UICtrl.clearInput();
    }
    e.preventDefault();
  };

  // public Method
  return {
    init: function () {
      // Fetch Item from DATA Structure
      const items = ItemCtrl.getItems();
      // console.log(items);

      // check if any items
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate list with Item
        UICtrl.populateItemList(items);
      }

      const totalCalories = ItemCtrl.getTotalCalories();

      // Add totalCalories to the UI
      UICtrl.showTotalCalories(totalCalories);

      // Loade event listenrs
      LoadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

App.init();
