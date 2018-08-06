var UserModel = Backbone.Model.extend({
  urlRoot: 'http://jsonplaceholder.typicode.com/users'
});

var PostModel = Backbone.Model.extend({
  urlRoot: 'http://jsonplaceholder.typicode.com/posts',
  setUser: function() {
    var self = this;
    var user = new UserModel({
      id: self.get('userId'), 
    });

    user.fetch({
      success: function(model) {
        self.set({
          user: model,
        });
        console.log(self.toJSON());
      },
    });
  },
  postHtml: $('#post').html(),
  renderPost: function(model) {
    var $template = $(this.postHtml);
    var $article = $template.find('article');
    var $title = $template.find('header h1');
    var $user = $template.find('header p'); 
    var $body = $template.find('article > p');

    $title.text(model.get('title'));
    $user.text('By ' + model.get('user').get('name'));
    $body.text(model.get('body'));

    $('body').html($template);
  },
  initialize: function() {
    var self = this;
    if (self.has('userId')) {
      self.setUser();
      self.on('change', function(model) {
        self.renderPost(model);
      });
    }
    self.on('change:userId', self.setUser);
  },
});



var post1 = new PostModel({
  id: 1,
});

post1.fetch();

var post2 = new PostModel({
  id: 2,
  title: 'Backbone.js',
  body: 'Backbone.js requires Underscore and jQuery.',
  userId: 2
});

