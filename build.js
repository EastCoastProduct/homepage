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
    sitemap     = require('metalsmith-mapsite'),
    ignore      = require('metalsmith-ignore'),

templateConf = {
  engine: 'ejs',
  directory: './templates/'
};

Metalsmith(__dirname)
  .clean(true)
  .destination('./build')
  .use(excerpts())
  .use(collections({
    pages: {
        pattern: '*.md'
    },
    services: {
      pattern: 'services/*.md',
      sortBy: 'sortOrder'
    },
    person: {
      pattern: '_person/*.md',
      sortBy: 'numberId'
    },
    clients: {
      pattern: 'case_study/*.md'
    },
    values: {
      pattern: '_values/*.md'
    },
    subservices: {
      pattern: '_subservices/*.md',
      sortBy: 'sortOrder'
    },
    faq: {
      pattern: '_faq/*.md'
    },
  }))
  .use(markdown())
  .use(ignore([
    '**/_person/**',
    '**/_values/**',
    '**/services/**',
    '**/_subservices/**',
    '**/_faq/**'
  ]))
  .use(permalinks({
    pattern: './:directory',
    relative: false
  }))
  .use(sitemap({
    hostname:  'https://eastcoastproduct.com',
    omitIndex: true
  }))
  .use(layouts(templateConf))
  .use(sass({
    outputStyle: 'expanded',
  }))
  .use(serve())
  .build(function (err, files) {
    if(err) {
      console.log(err);
      process.exit(1);
    }
    console.log('Build success!');
    if (process.argv[2] && process.argv[2] === '--exit') process.exit(0);
  })
