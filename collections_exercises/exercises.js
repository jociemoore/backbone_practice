var User = Backbone.Model.extend({
  url: "http://jsonplaceholder.typicode.com/users"
});

var Users = Backbone.Collection.extend({
  model: User,
  url: "http://jsonplaceholder.typicode.com/users",
  parse: function(response) {
    var parsedData = [];

    response.forEach(function(user) {
      var newData = [user.company.name, user.company.catchPhrase, user.company.bs];

      delete user.company;
      user['company_name'] = newData[0];
      user['company_catchPhrase'] = newData[1];
      user['company_bs'] =newData[2];
      parsedData.push(user);
    });

    return parsedData;
  },
  initialize: function() {
    this.on('sync sort', render);
  }
});

var blog_writers = new Users();

function render() {
  var $template = $('#users');
  var template = Handlebars.compile($template.html());
  var html = template({users: this.toJSON()});

  $('article').remove();
  $('body').prepend(html);
}

blog_writers.fetch({
  success: function() {
    var emails = blog_writers.pluck('email');
    console.log(JSON.stringify(emails));

    blog_writers.comparator = 'name';
    blog_writers.sort();
    console.log(blog_writers.toJSON());
  }
});





// blog_writers.fetch({
//   success: function(collection) {
//     // OPTION 1: ADD
//     var jocie = new User({
//       name: 'Jocie',
//       email: 'hello@jociemoore.com'
//     });

//     blog_writers.add(jocie);
//     jocie.save(null, {
//       success: function() {
//         console.log(blog_writers.toJSON());
//          blog_writers.fetch({
//            reset: true,
//            success: function() {
//              console.log(blog_writers.toJSON());
//              var user1 = blog_writers.where({id: 1})[0];
//              user1.set({name: 'Jocie', email: 'hello@jociemoore.com'});
//              console.log(blog_writers.first().toJSON());
//            }
//          });
//       }
//     });
//   }
// });


// blog_writers.fetch({
//   success: function(collection) {
//     // OPTION 2: CREATE
//     blog_writers.create({
//       name: 'Jocie',
//       email: 'hello@jociemoore.com'
//     }, {
//       success: function() {
//         console.log(blog_writers.toJSON());
//         blog_writers.fetch({
//           reset: true,
//           success: function() {
//             console.log(blog_writers.toJSON());
//             var user1 = blog_writers.where({id: 1})[0];
//             user1.set({name: 'Jocie', email: 'hello@jociemoore.com'});
//             console.log(blog_writers.first().toJSON());
//           }
//         });
//       }
//     });
//   }
// });


