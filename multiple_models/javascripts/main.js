var App = {
  items: items_json,
  collection: [],
  remove: function (id) {
    var newCollection = _.reject(this.collection, function(elem) {
      return elem.id === id;
    });
    this.collection = newCollection;
    this.createTable();
  },
  sortItems: function() {
    this.collection = _.sortBy(this.collection, function(model) {
      return model.toJSON().name;
    });
  },
  deleteRow: function(e) {
    var $target = $(e.target);
    var id = $target.data('id');

    if (id) { this.remove(id); }
  },
  createTable: function() {
    var table = $('tbody');
    var html = this.template({items: this.collection});
    table.empty();
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
  createEvents: function() {
    $('tbody').on('click', this.deleteRow.bind(this));
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
    this.createEvents();
    this.createItemModels(this.items);
    this.sortItems();
    this.createTable();
  }
}

App.init();


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