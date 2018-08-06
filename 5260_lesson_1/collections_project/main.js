var ItemModel = Backbone.Model.extend({
  idAttribute: "id",
  initialize: function() {
    this.collection.incrementId()
    this.set('id', this.collection.lastId);
  }
});

var ItemsCollection = Backbone.Collection.extend({
  model: ItemModel,
  sortProperty: 'name',
  lastId: 0,
  incrementId: function() {
    this.lastId++;
  },
  changeSortProperty: function(e) {
    var $target = $(e.target);
    var newSortProperty = $target.data('prop');
    this.render();
  },
  sortItems: function(prop) {
    this.comparator = prop || this.sortProperty;
    this.sort();
  }
});

var App = {
  items: new ItemsCollection(),
  addItem: function(e) {
    e.preventDefault();
    var $form = $('form');
    var newItem = {
      name: $form.find('input[name=name]').val(),
      quantity: $form.find('input[name=quantity]').val(),
    };
    this.items.add(newItem);
    $('form').get(0).reset();
    this.render();
  },
  deleteItem: function(e) {
    e.preventDefault();
    var $target = $(e.target);
    var id = $target.data('id');
    this.items.remove(id);
    this.render();
  },
  deleteAll: function(e) {
    this.items.reset();
    this.render();
  },
  render: function() {
    var table = $('tbody');
    var html;
    this.items.sortItems();
    html = this.template({items: this.items.models});
    table.empty();
    table.append(html);
  },
  bindEvents: function() {
    $('tbody').on('click', 'a', this.deleteItem.bind(this));
    $('form').on('submit', this.addItem.bind(this));
    $('th').on('click', this.items.changeSortProperty.bind(this));
    $('table + p').find('a').on('click', this.deleteAll.bind(this));
  },
  registerHandlebars: function () {
    var $template = $('#items');
    var $partial = $('#item');

    Handlebars.registerPartial('item', $partial.html());

    this.template = Handlebars.compile($template.html());
  },
  init: function() {
    this.registerHandlebars();
    this.bindEvents();
    this.items = new ItemsCollection(items_json);
    this.render();
  }
}

App.init();




