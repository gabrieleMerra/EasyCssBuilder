var express     = require( 'express' ),
    app         = express(),
    sass        = require('node-sass'),
    nunjucks    = require( 'nunjucks' ),
    path = require('path'),
    fs = require('fs'),
    nodeSass = require('node-sass'),
    favicon = require('serve-favicon'),
    sassMiddleware = require('node-sass-middleware');

// Define port to run server on
var port = process.env.PORT || 7000 ;

// Configure Nunjucks
var _templates = process.env.NODE_PATH ? process.env.NODE_PATH + '/templates' : 'templates' ;
nunjucks.configure( _templates, {
    autoescape: true,
    cache: false,
    express: app
} ) ;

// Set Nunjucks as rendering engine for pages with .html suffix
app.engine( 'html', nunjucks.render );
app.set( 'view engine', 'html' );

// adding the sass
nodeSass.render({
  file: __dirname + '/sass/index.scss',
  includePaths: [ 'sass/' ],
  outputStyle: 'compressed'
}, function(error, result) { // node-style callback from v3.0.0 onwards
  if (error) {
    console.log(error.status); // used to be "code" in v2x and below
  }
  else {
    fs.writeFile(__dirname + '/public/css/index.css', result.css, function(err){
      if(!err){
        //file written on disk
      }
    });
    // console.log(result);
  }
});


// settaggio route
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// Respond to all GET requests by rendering relevant page using Nunjucks
app.get( '/:page', function( req, res ) {
    res.render( req.params.page ) ;
} ) ;
app.get( '/', function( req, res ) {
    res.render( 'index' ) ;
} ) ;

// Start server
app.listen( port ) ;
console.log( 'Listening on port %s...', port ) ;
