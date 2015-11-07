// *** Models ***
var TwitModel = Backbone.Model.extend({
   url: 'https://twitter-clone-api.herokuapp.com/tweets'

});

// *** Collections ***
var PublicCollection = Backbone.Collection.extend({
  url: 'https://twitter-clone-api.herokuapp.com/tweets'
});

var FollowingCollection = Backbone.Collection.extend({
});


// *** VIEWS ***

var TwitView = Backbone.View.extend({

  className: 'tweet',
  tagName: 'section',
  template:  _.template($('#TwitTemplate').html()),

  render: function(){
    console.log("twittins")
    this.$el.html(template);
    return this;
  }
})

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

var TimelineView = Backbone.View.extend({
  className: 'page timeline',
  tagName:   'section',

})

var HomeView = Backbone.View.extend({
    className: "homePage",
    template: _.template($('#homeTemplate').html()),
    initialize: function() {
      this.timeline = new TimelineView({
        collection: new PublicCollection()
      });
      this.timeline.collection.fetch();
    },
    render() {
      this.$el.html(this.template());
      this.$('.timeline').html(this.timeline.el);

      return this;
    }
});

var ProfileView = Backbone.View.extend({
  className: "profilePage",
  template: _.template($('#profileTemplate').html()),
  events: {
    'click input': 'handleClick'
  },
  handleClick: function(){
    console.log("clicked on Profile")
  },
  initialize: function() {
    this.timeline = new TimelineView({
      collection: new PublicCollection()
    });
    this.timeline.collection.fetch();
  },
  render() {
    this.$el.html(this.template());
    this.$('.timeline').html(this.timeline.el);

    return this;
  }
});

var TimelineView = Backbone.View.extend({
  template: _.template($('#timelineTemplate').html()),
  events: {
    'click input': 'handleClick'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },
  handleClick: function(){
    console.log("clicked on Timeline")
  },

  render: function() {
    console.log('called render');
    this.$el.html(this.template(
      {tweets: this.collection.toJSON()})
  );
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
    var view = new HomeView();
    $('main').html(view.render().el);
  },
  LoginRoute: function(){
    $('main').html('');
    view = new LoginView()
    $('main').append(view.render().el);
  },
  RegisterRoute  : function(){
    $('main').html('');
    view = new RegisterView()
    $('main').append(view.render().el);
  },
  DashboardRoute  : function(){
    $('main').html('');
    view = new DashboardView(),
    $('main').append(view.render().el);
  },
  ProfileRoute  : function(){
    $('main').html('');
    var view = new ProfileView()
    $('main').append(view.render().el);
  },
  UsersRoute  : function(){
    $('main').html('');
    view = new UserView()
    $('main').append(view.render().el);
  }
});

twiterRoute = new TwitRouter;

var twiterRouter = new TwitRouter();
Backbone.history.start();
