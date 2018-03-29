var App = {
  items: items_json,
  collection: [],
  remove: function () {

  },
  sortItems: function() {
    this.collection = _.sortBy(this.collection, function(model) {
      return model.toJSON().name;
    });
  },
  createTable: function() {
    var table = $('tbody');
    var html = this.template({items: this.collection});
    table.append(html);
  },
  createItemModels: function(items) {
    var self = this;
    var ItemModel = Backbone.Model.extend();

    items.forEach(function(item, index) {
      var newItem = new ItemModel({
        id: index + 1,
        name: item.name,
        quantity: item.quantity,
      });
      self.collection.push(newItem);
    });
  },
  registerHandlebars: function () {
    var $template = $('#items');
    var $partial = $('#item');

    Handlebars.registerPartial('item', $partial.html());
    Handlebars.compile($partial.html());

    this.template = Handlebars.compile($template.html());
  },
  init: function() {
    this.registerHandlebars();
    this.createItemModels(this.items);
    this.sortItems();
    this.createTable();
  }
}

App.init();



// create a click event for the delete link that calls remove()

// remove() --> deletes the item by ID
//              create new array w/o item using Underscore 
//              set to collections array
//              rerender items array

// create a submit event for form

// submit --> create new model
//            add model to collections array
//            render new table row
//            reset form

// create click event for the delete all link

// delete all --> empty collection array
//                re-render template


// create click event for the table headings --> sorts and re-renders

// create localStorage of collection array --> assign value to collection array on page load