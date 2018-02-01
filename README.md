# ECP Marketing Site

This repo contains the ECP marketing site as a separate site from the blog, which is run on a different subdomain to match the old hosting locations, before we moved it to a static build under our control.

The CSS for both sites is in this repo. When published, this site's CSS file is linked to from the blog so that we aren't maintaining two duplicate sets of the same code.

You will need to run both projects locally at the same time to see how CSS changes affect the blog. They are configured to run local servers on different ports. The blog repo's README has more instructions on this.

## Setup

After cloning/downloading the repository on your local machine, navigate to that directory in your terminal and run `npm install` to install all the plugins and packages to run the site locally.

## Working

From the project directory run `gulp watch & nodemon build`. This will compile assets, build the site and run a local server. Now you'll be able to access the homepage by opening your browser and going to this address: [https://localhost:8080](https://localhost:8080)

## Editing Content

The files for page content are in the `/src` folder. They are HTML files that are pulled into templates by the build process, so they're missing any code for anything other than the main content. They also hold metadata in YAML front-matter at the beginning of the file to populate templates with unique information other than page content.

To add new top-level pages, you can duplicate a .html file in the top level of the `/src` folder, give it a new name, and add new information. You will also have to create a new template to match (covered in next section).

The `/jobs`, `/technologies`, and `/work` folders contain files are built into new pages that will end up in those same directories on the published site. You can duplicate files in those folders to create new ones. These are configured as collections (covered in next section).

The `/_mentions`, `/_person`, and `/_values` folders also contain files that are part of collections, but the underscore in the folder name indicates they aren't built to unique pages. Instead, the information in these files is generated onto a page or pages elsewhere in the site.

## Templates

The `/templates` folder contains unique page templates, and partial templates for components that get rendered onto multiple pages.

If you make a new content page type, you'll also need to a create a new template for it to use in this folder.

## Styles

CSS can be found in the `/src/styles` folder. Running the `gulp watch` command for development will make sure that SASS is compiled to CSS.

## Building and Deploying Changes

The site is built using [Metalsmith](http://www.metalsmith.io/). It is a basic static site generator that adds functionality through the use of plugins.

The `build.js` file in the root of this repo configures Metalsmith and its plugins. You can find further documentation on each plugin by Googling the name you see in this file.

To create collections of pages or page content, you must configure them in this file or they won't build. Refer to the documentation for the [Metalsmith Collections](https://github.com/segmentio/metalsmith-collections) plugin to learn more about how to do this.

The marketing site is hosted on Amazon S3. To deploy you will need to create an `.aws.json` configuration file to be saved locally. Use the provided `.aws.json.example` but with your own keys to do this.

The repo is set to ignore your local `.aws.json` file. DO NOT change this or you will accidentally publish your keys to the repo.

If you don't have your own keys set up, go to the [AWS console](https://console.aws.amazon.com) and go to `Services -> IAM -> Users` and click on the Security Credentials tab. There you'll see a "Create Access Key" button. After you have clicked on the button a box will pop out, click on the "Show User Security Credentials" button.

Copy "Access Key ID" and paste it into `.aws.json` in the "key" section, then copy "Secret Access Key" and paste it in the "secret" section. The "bucket" and "region" sections should be correct already in the example file.

To build and deploy the site, run `gulp publish`.

This builds the site and deploys changes to Amazon S3.

# Invalidating the Cache

We use Cloudfront through AWS to run the site with secure credentials, allowing https access. Cloudfront also caches assets on various servers. When deploying changes to the site you will have to manually invalidate the cache through Cloudfront if you want those changes to be immediately visible.

To do this, go to the [AWS console](https://console.aws.amazon.com) and go to `Services -> Cloudfront` and click on the eastcoastproduct.com distribution. Then go to the "Invalidations" tab. Click the "Create Invalidation" button.

If you only changed a couple of files, you should enter the paths to them in the box that comes up. If you made extensive changes, your best bet is to enter `/*`. This will invalidate the whole site and make all your changes accessible.

A new invalidation will be added to the top of the list when you click "Invalidate". This status will show the invalidation running until it's done and changes to "Completed".

## SVG Files

After adding new svg files to the project, run `gulp minify-svg` to generate minified svg files.
