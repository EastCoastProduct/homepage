var Metalsmith  = require('metalsmith'),
    serve       = require('metalsmith-serve'),
    metadata    = require('metalsmith-metadata'),
    excerpts    = require('metalsmith-excerpts'),
    branch      = require('metalsmith-branch'),
    markdown    = require('metalsmith-markdown'),
    layouts     = require('metalsmith-layouts'),
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
      pattern: '_services/*.md',
      sortBy: 'sortOrder'
    },
    person: {
      pattern: '_person/*.md',
      sortBy: 'numberId'
    },
    values: {
      pattern: '_values/*.md'
    },
    clients: {
      pattern: 'case_study/*.md'
    },
    jobs: {
      pattern: 'jobs/*.md'
    }
  }))
  .use(markdown())
  .use(ignore([
    '**/_person/**',
    '**/_values/**',
    '**/_services/**'
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
  .use(serve({
    http_error_files: {
      404: "/error.html"
    }
  }))
  .build(function (err, files) {
    if(err) {
      console.log(err);
      process.exit(1);
    }
    console.log('Build success!');
    if (process.argv[2] && process.argv[2] === '--exit') process.exit(0);
  })
