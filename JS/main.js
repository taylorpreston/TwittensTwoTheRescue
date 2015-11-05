
// *** Collections ***
var PublicCollection = Backbone.Collection.extend({
});

var FollowingCollection = Backbone.Collection.extend({
});



// *** VIEWS ***
var TimelineView = Backbone.View.extend({
});

var LoginView = Backbone.View.extend({
  className: 'page login',
  tagName: 'section',
  // initialize: function(options){
  //   console.log(options)
  //   this.className = options.className;
  //   this.template = options.template;
  // },
  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

var RegisterView = Backbone.View.extend({
});

var ProfileView = Backbone.View.extend({
});

// *** ROUTER ***

var TwitRouter = Backbone.Router.extend({
  routes:{
    "":"HomeRoute",
    "login":"LoginRoute",
    "register":"RegisterRoute",
    "dashboard":"DashboardRoute",
    "profile":"ProfileRoute",
    "users":"UsersRoute"
  },
  HomeRoute:  function(){
    $('main').html('');
  },
  LoginRoute: function(){
    $('main').html('');
    $('main').html(_.template($('#loginTemplate').html()));
  },
  RegisterRoute  : function(){
    $('main').html('');

  },
  DashboardRoute  : function(){
    $('main').html('');

  },
  ProfileRoute  : function(){
    $('main').html('');

  },
  UsersRoute  : function(){
    $('main').html('');

  },
  });

twiterRoute = new TwitRouter

Backbone.history.start();
