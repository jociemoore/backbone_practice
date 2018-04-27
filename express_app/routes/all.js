var express = require('express');
var _ = require('underscore');
var router = express.Router();

module.exports = function(app) {
  var links = [{
      title: 'Home',
      href: '/'
    }, {
      title: 'About',
      href: '/about'
    }, {
      title: 'Contact',
      href: '/'
  }];

  function setActiveNavTo(title) {
    var active_item = _(links).findWhere({ active: true });
    if (active_item) { active_item.active = false; }
    _(links).findWhere({ title: title }).active = true;
  }

  /* GET home page. */
  router.get('/', function(req, res, next) {
    var title = 'Home';

    setActiveNavTo(title);

    res.render('index', { 
      title: title,
      links: links
    });
  });

  /* GET about page. */
  router.get('/about', function(req, res, next) {
    var title = 'About';

    setActiveNavTo(title);

    res.render('about', { 
      title: title,
      links: links
    });
  });

  return router;
};
