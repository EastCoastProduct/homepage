var Metalsmith  = require('metalsmith'),
    serve       = require('metalsmith-serve'),
    metadata    = require('metalsmith-metadata'),
    excerpts    = require('metalsmith-excerpts'),
    branch      = require('metalsmith-branch'),
    markdown    = require('metalsmith-markdown'),
    templates   = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    sass        = require('metalsmith-sass'),
    watch       = require('metalsmith-watch');

Metalsmith(__dirname)
  .clean(false)
  .destination('./build')
  .use(excerpts())
  .use(collections({
    pages: {
        pattern: '*.md'
    },
    services: {
      pattern: 'services/*.md',
      metadata: {
        layout: 'service.ejs'
      }
    },
    person: {
      pattern: '_person/*.md',
    }
  }))
  .use(markdown())
  .use(permalinks({
    pattern: './:directory',
    relative: false
  }))
  .use(templates('ejs'))
  .use(sass({
    outputStyle: 'expanded',
  }))
  .use(serve())
  .use(watch({
    paths: {
      '${source}/**/*' : true,
      "${source}/styles/**/*.scss": "styles/main.scss",
      "templates/**/*": "**/*",
    },
    livereload: true,
  }))
  .build(function (err) { if(err) console.log(err) })
