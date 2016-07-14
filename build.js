var Metalsmith  = require('metalsmith'),
    serve       = require('metalsmith-serve'),
    metadata    = require('metalsmith-metadata'),
    excerpts    = require('metalsmith-excerpts'),
    branch      = require('metalsmith-branch'),
    markdown    = require('metalsmith-markdown'),
    layouts     = require('metalsmith-layouts'),
    inplace     = require('metalsmith-in-place'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    sass        = require('metalsmith-sass'),

templateConf = {
  engine: 'ejs',
  directory: './templates/'
};

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
      sortBy: 'name',
      reverse: 'true',
      metadata: {
        layout: 'service.ejs'
      }
    },
    person: {
      pattern: '_person/*.md',
    },
    clients: {
      pattern: '_case/*.md'
    },
    values: {
      pattern: '_values/*.md'
    }
  }))
  .use(markdown())
  .use(permalinks({
    pattern: './:directory',
    relative: false
  }))
  .use(inplace(templateConf))
  .use(layouts(templateConf))
  .use(sass({
    outputStyle: 'expanded',
  }))
  .use(serve())
  .build(function (err, files) {
    if(err) console.log(err);
  })
