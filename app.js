// Module pattern of design
// Storage Controller

// Item Controller
const ItemCtrl = (function () {
  // creating Item constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };

  // Data structures / State
  const data = {
    items: [
      // { id: 0, name: 'Steak Dinner', calories: 1200 },
      // { id: 1, name: ' Dinner Eggs', calories: 100 },
      // { id: 2, name: 'Steak Meat', calories: 400 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  // Public Methods

  return {
    getItems: function () {
      return data.items;
    },

    addItem: function (name, calories) {
      let ID;
      // console.log(name, calories);
      // Create ID
      if (data.items.length > 0) {
        ID = data.items[data.items.length - 1].id + 1;
      } else {
        ID = 0;
      }

      // Covert calories to number
      calories = parseInt(calories);

      newItem = new Item(ID, name, calories);

      // Add to items array
      data.items.push(newItem);
      return newItem;
    },

    logData: function () {
      return data;
    },
  };
})();
// UI Controller
const UICtrl = (function () {
  // UI Selectors
  const UISelectors = {
    itemList: '#item-list',
    addBtn: '.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories',
  };

  // Public Methods
  return {
    populateItemList: function (items) {
      let html = '';

      items.forEach(function (item) {
        html += ` <li class="collection-item" id="item-${item.id}">
        <strong> ${item.name}: </strong> <em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class=" edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      // Insert list Items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput: function () {
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value,
      };
    },

    addListItem: function (item) {
      // show Item List
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create LI
      const li = document.createElement('li');
      // Add Class
      li.className = 'collection-item';
      // Add ID
      li.id = `item-${item.id}`;
      // Add HTML
      li.innerHTML = `<strong> ${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
      <i class="fa fa-pencil"></i>
      </a>`;

      // InsertItem
      document
        .querySelector(UISelectors.itemList)
        .insertAdjacentElement('beforeend', li);
    },

    clearInput: function () {
      document.querySelector(UISelectors.itemNameInput).value = '';
      document.querySelector(UISelectors.itemCaloriesInput).styledisplay =
        'none';
      console.log('a');
    },

    hideList: function () {
      document.querySelector(UISelectors.itemList).style.display = 'none';
    },

    getSelectors: function () {
      return UISelectors;
    },
  };
})();

// App Controller
const App = (function (ItemCtrl, UICtrl) {
  // Load event Listeners
  const loadEventListeners = function () {
    // Get UI Selectors
    const UISelectors = UICtrl.getSelectors();

    // Add Item event
    document
      .querySelector(UISelectors.addBtn)
      .addEventListener('click', itemAddSubmit);
  };

  // Add Items
  const itemAddSubmit = function (e) {
    const input = UICtrl.getItemInput();
    // console.log(input);
    // Check for name and calorie input
    if (input.name !== '' && input.calorie !== '') {
      // console.log(123);
      // Add Item
      const newItem = ItemCtrl.addItem(input.name, input.calories);

      // Add Item to UI
      UICtrl.addListItem(newItem);
    }
    e.preventDefault();
  };
  // Public Methods
  return {
    init: function () {
      // console.log('Initializing');

      // Fetch items from Data Structures
      const items = ItemCtrl.getItems();
      // console.log(items);

      // Check if any item
      if (items.length === 0) {
        UICtrl.hideList();
      } else {
        // Populate List with Item
        UICtrl.populateItemList(items);
      }

      // Clear Fields
      UICtrl.clearInput();

      // Load Event Listeners
      loadEventListeners();
    },
  };
})(ItemCtrl, UICtrl);

App.init();
