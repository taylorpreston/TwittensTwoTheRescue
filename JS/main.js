
// *** Collections ***
var PublicCollection = Backbone.Collection.extend({
});

var FollowingCollection = Backbone.Collection.extend({
});



// *** VIEWS ***
var TimelineView = Backbone.View.extend({

  events: {
    'click input': 'handleClick'
  },

  handleClick: function(){
    console.log("clicked on Timeline")
  },

  render: function(){
    console.log("rendered")
    var template = _.template($('#timelineTemplate').html());
    this.$el.html(template);
    return this;
  }
});

var LoginView = Backbone.View.extend({
  className: 'page login',
  tagName: 'section',

  events: {
    'click input': 'handleClick'
  },

  handleClick: function(){
    console.log("clicked on Timeline")
  },

  render: function(){
    console.log("rendered")
    var template = _.template($('#loginTemplate').html());
    this.$el.html(template);
    return this;
  }
});

var RegisterView = Backbone.View.extend({

  events: {
    'click input': 'handleClick'
  },

  handleClick: function(){
    console.log("clicked on Register")
  },

  render: function(){
    console.log("rendered")
    var template = _.template($('#registerTemplate').html());
    this.$el.html(template);
    return this;
  }
});

var ProfileView = Backbone.View.extend({

  events: {
    'click input': 'handleClick'
  },

  handleClick: function(){
    console.log("clicked on Profile")
  },

  render: function(){
    console.log("rendered")
    var template = _.template($('#profileTemplate').html());
    this.$el.html(template);
    return this;
  }
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
    view = new TimelineView
    $('main').append(view.render().el);
  },
  LoginRoute: function(){
    $('main').html('');
    view = new LoginView
    $('main').append(view.render().el);
  },
  RegisterRoute  : function(){
    $('main').html('');
    view = new RegisterView
    $('main').append(view.render().el);
  },
  DashboardRoute  : function(){
    $('main').html('');
    view = new TimelineView
    $('main').append(view.render().el);
  },
  ProfileRoute  : function(){
    $('main').html('');
    view = new TimelineView
    $('main').append(view.render().el);
  },
  UsersRoute  : function(){
    $('main').html('');
    view = new TimelineView
    $('main').append(view.render().el);
  },
  });

twiterRoute = new TwitRouter

Backbone.history.start();
