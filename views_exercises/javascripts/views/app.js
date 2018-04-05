var AppView = Backbone.View.extend({
  el: 'body',
  template: Handlebars.templates.app,
  modal: Handlebars.templates.modal,
  events: {
    'click #newPerson': "showModal",
    'submit': "addPerson",
    'click #cancelBtn' : "closeModal" 
  },
  showModal: function() {
    this.$el.append(this.modal());
  },
  addPerson: function() {
    app.trigger('savePerson');
    this.closeModal();
  },
  closeModal: function() {
    $('#modal-container').remove();
  },
  render: function() {
    this.$el.html(this.template());
  }
});