const Metalsmith =    require('metalsmith')
const cleanCSS =      require('metalsmith-clean-css')
const collections =   require('metalsmith-collections')
const drafts =        require('metalsmith-drafts')
const fingerprint =   require('metalsmith-fingerprint')
const ignore =        require('metalsmith-ignore')
const layouts =       require('metalsmith-layouts')
const metadata =      require('metalsmith-metadata')
const permalinks =    require('metalsmith-permalinks')
const postcss =       require('metalsmith-postcss')
const redirect =      require('metalsmith-redirect')
const sass =          require('metalsmith-sass')
const serve =         require('metalsmith-serve')
const mapsite =       require('metalsmith-mapsite')

Metalsmith(__dirname)
  .clean(true)
  .destination('./build')
  .use(redirect({
    '/levelupdev/next': 'https://www.meetup.com/Level-Up-Development/events/238408755/',
    '/jobs/javascript-developer': 'https://eastcoastproduct.com/jobs/senior-javascript-developer/'
  }))
  .use(drafts())
  .use(collections({
    pages: {
        pattern: '**.html'
    },
    person: {
      pattern: '_person/**.html',
      sortBy: 'sortOrder'
    },
    mentions: {
      pattern: '_mentions/**.html',
      sortBy: 'sortOrder'
    },
    values: {
      pattern: '_values/**.html',
      sortBy: 'sortOrder'
    },
    work: {
      pattern: 'work/**.html',
      sortBy: 'sortOrder'
    },
    jobs: {
      pattern: 'jobs/**.html'
    },
    technologies: {
      pattern: 'technologies/**.html'
    }
  }))
  .use(ignore([
    '**/_person/**',
    '**/_values/**',
    '**/_mentions/**'
  ]))
  .use(permalinks({
    pattern: './:directory',
    relative: false
  }))
  .use(mapsite({
    hostname:  'https://eastcoastproduct.com',
    omitIndex: true
  }))
  .use(sass({
    outputStyle: 'expanded',
  }))
  .use(postcss({
    plugins: {
      'postcss-unprefix': {},
      'autoprefixer': {
        browsers: [
          '> 1%',
          'last 2 versions',
          'Firefox ESR'
        ]
      }
    }
  }))
  .use(cleanCSS({
    files: 'styles/*.css',
    cleanCSS: {
      rebase: false
    }
  }))
  .use(fingerprint({
    pattern: 'styles/*.css'
  }))
  .use(layouts({
    engine: 'ejs',
    directory: './templates/'
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
