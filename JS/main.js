// *** Models *** //
var TwitModel = Backbone.Model.extend({
   url: 'https://tiny-starburst.herokuapp.com/collections/chat'
})

// *** Collections ***
var PublicCollection = Backbone.Collection.extend({
   url: 'https://tiny-starburst.herokuapp.com/collections/chat',
   model: TwitModel
});

var FollowingCollection = Backbone.Collection.extend({
});



// *** VIEWS ***
var TwitView = Backbone.View.extend({
  className: 'tweet',
  tagName: 'section',

   render: function(){
     console.log("twittins")
     var html = $('#TwitTemplate').html();
     this.$el.html(html);

     return this;
  }
});

var ItemView = Backbone.View.extend({
  className: "entry",
  tagName: 'article',

  template: _.template($('#timelineTemplate').html()),

  render: function(){
    var data = this.model.toJSON();
    this.$el.html(this.template(data));

    return this;
  }
});

var TwitContainer = Backbone.View.extend({
  tagName: 'div',

  initialize: function(){
    this.listenTo(this.collection, 'fetch sync', this.render);
  },

  render: function(){
    var view = this;

    this.collection.each(function(model){
      var item = new TwitView({
        model: model
      });
      item.render();
      view.$el.append(item.el);
    });
  }
});

var TimelineView = Backbone.View.extend({
  className: 'page timeline',
  tagName:   'section',

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
  tagName:   'section',

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
  className: 'page register',
  tagName:   'section',

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
  className: 'page profile',
  tagName:   'section',

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
    view = new TimelineView,
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
    view = new TimelineView,
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

twiterRoute = new TwitRouter;
Backbone.history.start();
