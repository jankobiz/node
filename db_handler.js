var knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    user     : 'ivica',
    password : 'ivica',
    database : 'db_handler'
  }
});

var bookshelf = require('bookshelf')(knex);

var User = bookshelf.Model.extend({
  tableName: 'user'
});

User.where('id', 1).fetch().then(function(user) {
  console.log(user.toJSON());
  knex.destroy();  
}).catch(function(err) {
  console.error(err);
});

//knex.destroy();
//bookshelf.knex.destroy();

console.log('Database query completed successfully!');

//var knex = require('knex')({client: 'mysql', connection: process.env.MYSQL_DATABASE_CONNECTION });
//var bookshelf = require('bookshelf')(knex);
//
//var User = bookshelf.Model.extend({
//  tableName: 'users',
//  posts: function() {
//    return this.hasMany(Posts);
//  }
//});
//
//var Posts = bookshelf.Model.extend({
//  tableName: 'messages',
//  tags: function() {
//    return this.belongsToMany(Tag);
//  }
//});
//
//var Tag = bookshelf.Model.extend({
//  tableName: 'tags'
//})
//
//User.where('id', 1).fetch({withRelated: ['posts.tags']}).then(function(user) {
//
//  console.log(user.related('posts').toJSON());
//
//}).catch(function(err) {
//
//  console.error(err);
//
//});