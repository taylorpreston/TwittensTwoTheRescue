// *** Models ***
var TwitModel = Backbone.Model.extend({

   url: 'https://twitter-clone-api.herokuapp.com/tweets',

});

var UserModel = Backbone.Model.extend({
  url: 'https://twitter-clone-api.herokuapp.com/users/:id',
  // default:{ user:{
  //   email: this.email,
  //   password: this.password,
  //   }
  // }
})

var UserToken = Backbone.Model.extend({
  url: "https://twitterapii.herokuapp.com/users"
});

// *** Collections ***
var PublicCollection = Backbone.Collection.extend({
  url: 'https://twitter-clone-api.herokuapp.com/tweets',
});

var UsersCollection = Backbone.Collection.extend({
  url: 'https://twitter-clone-api.herokuapp.com/users',
  parse: function(data){
  return data
 }
});

var GetTokens = Backbone.Collection.extend({
  model: UserModel,
  url: 'https://twitter-clone-api.herokuapp.com/oauth/token',
  parse: function(data){
    return data
  }
})


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
    var data = this.model();
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
    this.$el.html(this.template(
      {tweets: this.collection.toJSON()})
  );
    return this;
  }
});

// <<<<<<< HEAD
var LoginView = Backbone.View.extend({
  className: 'page login',
  template: _.template($('#loginTemplate').html()),
  collection: new UsersCollection,


  events: {
    'click .loginButton': 'handleLoginClick'
  },


  send: function(){
    var login = this.$('.loginButton').val();
    var email = this.$(".email").val();
    var password = this.$(".password").val();
    // var confirmedPassword = this.$(".confPassword").val();
    var collection = new UsersCollection();
    var model = new UserModel();
    var tokenCollection = new GetTokens()

    // *** If Inputs Need To Be Filled ***
    if (email.trim() === '') {
      alert('Please insert an email.');
      return;
    }
    else if (password.trim() === '') {
      alert('Please enter password.');
      return;
    }
    else {
    // console.log(tokenCollection)
    tokenCollection.create({
      "grant_type": "password",
         "username": email,
         "password": password
    },

    console.log(tokenCollection.fetch()),
    // console.log(tokenCollection.fetch().then(function(users){
    //   console.log(users.forEach(function(user){
    //     console.log(user.email);
    //   }))
    // }))

    // console.log(tokenCollection.create()),
    // console.log(tokenCollection.model),
    {success: function() {
        return model
       }})
      }
    },

    // **** log user ***

    handleLoginClick: function(event){
      event.preventDefault();
      this.send();
      console.log("A User has clicked Join.");
    },

    render: function(){
      console.log("Login Page has rendered")
      this.$el.html(this.template());
      return this;
    }
});



// ^^^^^^^^ ********* LOG IN ********vvvvvvvvv


// =======
// >>>>>>> 39c936a9f0350fe907a2aa5e593115660abd89bf
//
/// CURRENTLY WORKING  LOGIN VIEW ///
// var LoginView = Backbone.View.extend({
//   className: 'page login',
//   template : _.template($('#loginTemplate').html()),
//
//   events: {
//     'click .loginButton': 'handlerLoginClick'
//   },
//
// //// API needs a post request to grant token, give that the credentials are correct//
//   send: function(){
//     var login = this.$('.loginButton').val();
//     var url = 'https://twitter-clone-api.herokuapp.com/oauth/token';
//       console.log('access')
//     var email = this.$(".email").val();
//     var password = this.$(".password").val();
//     var formValues = {
//       email: email,
//       password: password
//     };
//     var foo = $.ajax({
//         url     :url,
//         type    :'POST',
//         dataType:"json",
//         data    : formValues,
//         success :function (data) {
//             console.log(["added", data]);
//         }
//     });
//     console.log(formValues)
//     console.log(foo)
//
//     //
//     // GetTokens.fetch ({
//     //   "grant_type": "password",
//     //   "email": "email",
//     //   "password": "password"
//     // });
//  },
// /// GETTING 401 ERROR //
//   handlerLoginClick: function(event){
//    event.preventDefault();
//    this.send();
//    console.log("A User has clicked Join.");
//  },
//
//
//   render: function(){
//   console.log("Login Page has rendered")
//   this.$el.html(this.template());
//   return this;
//   },
// });
/// END CURRENTLY WORKING  LOGIN VIEW ///


// ALMOST FINISHED  REGISTER VIEW//
var RegisterView = Backbone.View.extend({
 className: 'page register',
 template: _.template($('#registerTemplate').html()),
 collection: new UsersCollection,

 events: {
   'click .registerButton': 'handlerRegisterClick'
 },

 send: function(){
   var register = this.$('.registerButton').val();
   var email = this.$(".email").val();
   var password = this.$(".password").val();
   var confirmedPassword = this.$(".confPassword").val();
   var collection = new UsersCollection()
   var newUser = new UserModel()

   if (email.trim() === '') {
     alert('Please insert an email.');
     return;
   }

   if (password.trim() === '') {
     alert('Please enter password.');
     return;
   }

   if (confirmedPassword.trim() === '' || confirmedPassword.trim() !== password.trim()) {
     alert('Please confirm your password.');
     return;
   }

// <<<<<<< HEAD

  collection.fetch(console.log("FETCHED USERS"))

  console.log(email)
  collection.create({"user":{"email": email,
                      "password": password
                    }})


   console.log(collection.fetch()),
   console.log(collection.fetch().then(function(users){
     console.log(users.forEach(function(user){
       console.log(user.email);
     }))
   }))
 },

  handlerRegisterClick: function(event){
    event.preventDefault();
    this.send();
    console.log("A User has clicked Join.");
  },


 render: function(){
   console.log("Register Page has rendered")
   this.$el.html(this.template());
   return this;
  }
 });
// END ALMOST FINISHED  REGISTER VIEW//


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
    // console.log(this.$el.html(this.template()))
    return this;
  },

});

var DashboardView = Backbone.View.extend({
  className: "dashboardPage",
  template: _.template($('#dashboardTemplate').html()),
  events: {
    'click input': 'handleClick'
  },
  handleClick: function(){
    console.log("clicked on Dashboard")
  },
  initialize: function() {
    this.timeline = new TimelineView({
      collection: new PublicCollection()
    });
    this.timeline.collection.fetch();
  },
  render: function(){
    this.$el.html(this.template());
    this.$('.timeline').html(this.timeline.el);
    // console.log(this.$el.html(this.template()))
    return this;
  }
});


var UsersView = Backbone.View.extend({
  className: "usersPage",
  template: _.template($('#usersTemplate').html()),
  events: {
    'click input': 'handleClick'
  },
  handleClick: function(){
    console.log("clicked on Users")
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
    // console.log(this.$el.html(this.template()))
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
    $('main').html(view.render().el);
  },
  RegisterRoute  : function(){
    var view = new RegisterView();
    $('main').html(view.render().el);
  },
  DashboardRoute  : function(){
    $('main').html('');
    var view = new DashboardView();
    $('main').append(view.render().el);
  },
  ProfileRoute  : function(){
    $('main').html('');
    var view = new ProfileView();
    $('main').append(view.render().el);
  },
  UsersRoute  : function(){
    $('main').html('');
    var view = new UsersView();
    $('main').append(view.render().el);
  }
});

var twitterRouter = new TwitRouter();
Backbone.history.start();
