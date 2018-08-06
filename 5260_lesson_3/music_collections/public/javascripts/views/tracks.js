var $overlay = $("#overlay");

var TracksView = Backbone.View.extend({
  attributes: {
    id: "tracksModal",
  },
  events: {
    "click a.close": "close",
  },
  template: Handlebars.compile($("[data-name='tracks']").html()),
  duration: 300,
  open: function() {
    this.$el.add($overlay).fadeIn(this.duration);
  },
  close: function(e) {
    e.preventDefault();
    this.fadeOut();
    history.back();
  },
  fadeOut: function() {
    $overlay.fadeOut(this.duration);
    this.$el.fadeOut(this.duration, function() {
      this.remove();
    }.bind(this));
  },
  render: function() {
    this.$el.html(this.template({
      tracks: this.collection.toJSON(),
      album: this.album
    }));
    this.open();
  },
  initialize: function(options) {
    this.album = options.album;
    this.$el.appendTo(document.body);
  }
});