var people = [
  {
    name: 'Joe',
    colors: ['blue', 'green', 'orange']
  },
  {
    name: 'Ruth',
    colors: ['pink', 'orange', 'yellow']
  },
  {
    name: 'Charlie',
    colors: ['purple', 'blue', 'green']
  }
];

var app = {
  init: function() {
    _.extend(this, Backbone.Events);
    this.on('savePerson', function() {
      this.list.add({
          name: $('input[name=name]').val(),
          colors: [$('input[name=color1]').val(), 
                   $('input[name=color2]').val(),
                   $('input[name=color3]').val()], 
      });
    });
    this.appView = new AppView();
    this.appView.render();
    this.list = new List(people);
    this.listView = new ListView({ collection: this.list });
    this.listView.render();
    this.listenTo(this.list, 'change', this.listView.renderNewPerson);
  }
};

app.init();