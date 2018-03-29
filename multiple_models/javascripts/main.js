var App = {
  items: items_json,
  collection: [],
  remove: function (id) {
    var newCollection = _.reject(this.collection, function(elem) {
      return elem.id === id;
    });
    this.collection = newCollection;
    this.renderTable();
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
  deleteAll: function(e) {
    this.collection = [];
    this.renderTable();
  },
  addRow: function(e) {
    e.preventDefault();
    var $form = $('form');
    var newItem = {
      name: $form.find('input[name=name]').val(),
      quantity: $form.find('input[name=quantity]').val(),
    };
    this.collection.push(this.createModel(newItem, this.collection.length));
    this.renderTable();
    $('form').get(0).reset();
  },
  renderTable: function() {
    var table = $('tbody');
    var html;

    this.sortItems();
    html = this.template({items: this.collection});
    table.empty();
    table.append(html);
  },
  createModel: function(item, index) {
    var ItemModel = Backbone.Model.extend();
    return new ItemModel({
      id: index + 1,
      name: item.name,
      quantity: item.quantity,
    });
  },
  createInitialModels: function(items) {
    var self = this;
    
    items.forEach(function(item, index) {
      var newItem = self.createModel(item, index);
      self.collection.push(newItem);
    });
  },
  bindEvents: function() {
    $('tbody').on('click', this.deleteRow.bind(this));
    $('form').on('submit', this.addRow.bind(this));
    $('table + p').find('a').on('click', this.deleteAll.bind(this));
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
    this.bindEvents();
    this.createInitialModels(this.items);
    this.renderTable();
  }
}

App.init();




// create click event for the table headings --> sorts and re-renders

// create localStorage of collection array --> assign value to collection array on page load