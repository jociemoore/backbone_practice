var ListView = Backbone.View.extend({
  el: '#favorites',
  render: function() {
    var self = this;
    var listItemView;

    this.collection.forEach(function(model, index) {
      self.renderNewPerson(model);
    });
  },
  renderNewPerson: function(model) {
    var listItemView;
    listItemView = new ListItemView({ model: model });

    this.$el.append(listItemView.render());
  },
  initialize: function() {
    this.listenTo(this.collection, 'add', this.renderNewPerson);
  }
});