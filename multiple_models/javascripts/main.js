var App = {
  items: items_json,
  collection: [],
  defaultSortProperty: 'name',
  remove: function (id) {
    var newCollection = _.reject(this.collection, function(elem) {
      return elem.id === id;
    });
    this.collection = newCollection;
    this.renderTable(this.defaultSortProperty);
  },
  sortItems: function(prop) {
    this.collection = _.sortBy(this.collection, function(model) {
      return model.toJSON()[prop];
    });
  },
  sortByColumn: function(e) {
    var $target = $(e.target);
    var newSortProperty = $target.data('prop');
    this.renderTable(newSortProperty);
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
    this.renderTable(this.defaultSortProperty);
    $('form').get(0).reset();
  },
  renderTable: function(sortProperty) {
    var table = $('tbody');
    var html;

    this.sortItems(sortProperty);
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
    $('th').on('click', this.sortByColumn.bind(this));
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
    this.renderTable(this.defaultSortProperty);
  }
}

App.init();



// create localStorage of collection array --> assign value to collection array on page load

