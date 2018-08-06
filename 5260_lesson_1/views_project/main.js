var ItemModel = Backbone.Model.extend({
  idAttribute: "id",
  initialize: function() {
    this.collection.incrementId();
    this.set('id', this.collection.lastId);
  }
});

var ItemsCollection = Backbone.Collection.extend({
  model: ItemModel,
  lastId: 0,
  incrementId: function() {
    this.lastId++;
  },
  sortItems: function(prop) {
    this.comparator = prop;
    this.sort();
    this.trigger('rerender');
  },
  calculateTotalItems: function() {
    var quantities = this.map(function(model) {
      return model.toJSON().quantity;
    });

    if (quantities.length > 0) {
      return quantities.reduce(function(sum = 0, quantity) {
        return sum + quantity;
      }); 
    }
      
    return 0;
  },
});

var ItemsView = Backbone.View.extend({
  el: 'tbody',
  itemsTemplate: Handlebars.compile($('#items').html()),
  events: {
    'click a': 'deleteItem',
  },
  deleteItem: function(e) {
    var $target = $(e.target);
    var id = $target.data('id');
    this.collection.remove(id);
  },
  render: function() {
    var html = this.itemsTemplate({items: this.collection.models});
    this.$el.empty();
    this.$el.append(html);
  },
  resetTotalItems: function() {
    this.collection.trigger('newTotal');
  },
  initialize: function() {
    this.listenTo(this.collection, 'add remove rerender reset', this.render);
    this.listenTo(this.collection, 'add remove reset', this.resetTotalItems);
    this.render();
  }
});

var TotalItemsView = Backbone.View.extend({
  el: 'tfoot',
  totalItemsTemplate: Handlebars.compile($('#totalItems').html()),
  render: function() {
    this.totalItems = this.collection.calculateTotalItems(); 
    var html = this.totalItemsTemplate({ total: this.totalItems });
    this.$el.empty();
    this.$el.append(html);
  },
  initialize: function() {
    this.listenTo(this.collection, 'newTotal', this.render);
    this.render();
  }
});

var app = {
  init: function() {
    _.extend(this, Backbone.Events);
    this.items = new ItemsCollection(items_json);
    this.itemsView = new ItemsView({ collection: this.items });
    this.items.sortItems('name');
    this.totalItemsView = new TotalItemsView({ collection: this.items });
  }
}

Handlebars.registerPartial('item', $('#item').html());

$('th').on('click', function() {
  var newSortProperty = $(this).data('prop');
  app.items.sortItems(newSortProperty);
});

$('table + p').find('a').on('click', function(e) {
  e.preventDefault();
  app.items.reset();
});

$('form').on('submit', function(e) {
  e.preventDefault();
  var $form = $('form');
  var newItem = {
    name: $form.find('input[name=name]').val(),
    quantity: Number($form.find('input[name=quantity]').val()),
  };
  app.items.add(newItem);
  this.reset();
});

app.init();





