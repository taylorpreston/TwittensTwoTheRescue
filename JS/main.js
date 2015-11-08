// *** Models ***
var TwitModel = Backbone.Model.extend({
   url: 'https://twitter-clone-api.herokuapp.com/tweets',
});

var UserModel = Backbone.Model.extend({
   url: 'https://twitter-clone-api.herokuapp.com/users',
});


// *** Collections ***
var UsersCollection = Backbone.Collection.extend({
  model: UserModel,
  url: 'https://twitter-clone-api.herokuapp.com/users',
});

var PublicCollection = Backbone.Collection.extend({
  url: 'https://twitter-clone-api.herokuapp.com/tweets'
});

var FollowingCollection = Backbone.Collection.extend({
});


// *** VIEWS ***
var TwitView = Backbone.View.extend({
  className: 'tweet',
  tagName: 'section',

   render: function(){
     console.log("twittins")
    //  var time = moment(tweets.updated_at).format('ll');
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

var TimelineView = Backbone.View.extend({
  template: _.template($('#timelineTemplate').html()),
  events: {
    'click input'   : 'handleClick',
    'click textarea': 'handleClick',
    'click a'       : 'handleClick',
    'click button'       : 'handleClick'
  },

  initialize: function() {
    this.listenTo(this.collection, 'sync', this.render);
  },
  handleClick: function(){
    console.log("clicked on Timeline")
  },

  render: function() {
    console.log('called render');
    this.$el.html(this.template({tweets: this.collection.toJSON()}));
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
  template: _.template($('#registerTemplate').html()),

  events: {
    'click .registerButton': 'handleRegisterClick'
  },

  send: function(){
    var register = this.$('.registerButton').val();
    var email = this.$(".email").val();
    var password = this.$(".password").val();
    var confirmedPassword = this.$(".confPassword").val();


    if (email.trim() === '') {
      alert('Please insert an email.');
      return;
    }

    if (password.trim() === '') {
      alert('Please enter password.');
      return;
    }

    if (confirmedPassword.trim() === '') {
      alert('Please confirm your password.');
      return;
    }

    var newUser = new UserModel({
        email: email,
        password: password,
    })
    newUser.create({email:'' ,password : ''});
  },

  render: function(){
    console.log("Register Page has rendered")
    this.$el.html(this.template());
  },

  handleRegisterClick: function(event){
    event.preventDefault();
    this.send();
    console.log("A User has clicked Join.");
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
    var view = new LoginView();
    view.render();
    $('main').html(view.$el);
    },
  RegisterRoute  : function(){
    var view = new RegisterView();
    view.render();
    $('main').html(view.$el);
    },
  DashboardRoute  : function(){
    $('main').html('');
    view = new TimelineView(),
    $('main').append(view.render().el);
  },
  ProfileRoute  : function(){
    $('main').html('');
    view = new TimelineView()
    $('main').append(view.render().el);
  },
  UsersRoute  : function(){
    $('main').html('');
    view = new TimelineView()
    $('main').append(view.render().el);
  }
});

twiterRoute = new TwitRouter;

var twiterRouter = new TwitRouter();
Backbone.history.start();
