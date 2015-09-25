$(document).ready(function() {
const API_ROOT = "https://api.github.com/users/neeshgee"
const API = "https://api.github.com/users/neeshgee/repos"

$(function (){
  $('.sidebar').ready(function (event) {
    $.ajax({
      type: 'GET',
      url: API_ROOT,
      data: $(this).serialize()
    }).done(function (data) {
      console.log(data)
      $('.sidebar h3').text(data.name);
      $('.sidebar h4').text(data.login);
      //$('.sidebar p').text(data.created_at);
      $('.followers').text(data.followers);
      $('.following').text(data.following);

    });
  })
})

});




var Router = Backbone.Router.extend({
  routes: {
    '': 'home',
    'repositories': 'repositories'
    //"public": "public"
  },
   home: function () {
    $.ajax('home.html').then(function (page) {
      $('.content').html(page)
      $('.home').addClass('active');
      $('.repos').removeClass('active');
      //console.log(page)
    })
  },
  repositories: function () {
    $.ajax('repositories.html').then(function (page) {
      $('.content ').html(page)
      $('.home').removeClass('active');
      $('.repos').addClass('active');
    var data = $.get('https://api.github.com/users/neeshgee/repos').then(function (data) {
      // $(this).serialize();
      console.log(data);
      $.each(data, function () {
        $('.content ul.repolist').append('<li>' + this.name + '</li>');
      })

    });
      //console.log(page)
    })
  },
   initialize: function() {
     Backbone.history.start();
   }
});

$(function(){
  var router = new Router();
})
