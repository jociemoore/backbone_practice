var PostModel = Backbone.Model.extend({
  urlRoot: 'http://jsonplaceholder.typicode.com/posts',
  initialize: function() {
    if (!this.get('id')) {
      this.set('id', this.collection.nextID());
    }
  }
});
var User = Backbone.Model.extend({});

var Posts = Backbone.Collection.extend({
  model: PostModel,
  url: 'http://jsonplaceholder.typicode.com/posts',
  last_id: 0,
  setLastID: function() {
    if (this.isEmpty()) { return; }
    this.last_id = this.last().get('id');
  },
  nextID: function() {
    return ++this.last_id;
  },
  initialize: function() {
    this.on('sync', this.setLastID);
  }
});
var Users = Backbone.Collection.extend({
  model: User
});

var blog_roll = new Posts();
var blog_authors = new Users();

var users_data= [{
  id: 1,
  name: 'Leanne Graham'
}, {
  id: 2,
  name: 'Ervin Howell'
}, {
  id: 3,
  name: 'Clementine Bauch'
}];

blog_authors.reset(users_data);
blog_roll.fetch({
  reset: true,
  success: function(collection) {
    var first_post = blog_roll.get(1);

    // SET
    // blog_roll.set({
    //   id: 1,
    //   userId: 1,
    //   title: 'My First Pet',
    //   body: 'This is my first blog post! Yay!'
    // }, {remove:false});
    
    // ADD
    var new_post = blog_roll.add({
      title: 'My New Blog Post',
      body: 'This is my latest blog post. I hope you like it!',
      userId: 1
    });
    new_post.save();

    // CREATE
    // var new_post = blog_roll.create({
    //   title: 'My New Blog Post',
    //   body: 'This is my latest blog post. I hope you like it!',
    //   userId: 1
    // }, {
    //   wait: true,
    //   merge: true,
    //   success: function(model, response) {
    //     console.log(model.toJSON());
    //     console.log(blog_roll.toJSON());
    //   }
    // });

    var posts_by_author_1 = blog_roll.where({userId: 1});
    console.log(posts_by_author_1);

    console.log(blog_roll.toJSON());
    blog_roll.comparator = 'title';
    blog_roll.sort();
    console.log(blog_roll.toJSON());
  } 
});

