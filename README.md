# homepage

After cloning/downloading repository on your local machine, navigate to that directory in your terminal and do the

```
npm install
```

While you are positioned in the same directory run `gulp watch` and `npm run build` in second terminal, this commands will build the site
and run the server and enable live reloading of the project. Now you'll be able to access the homepage by opening
your browser and going to this address
[https://localhost:8080](https://localhost:8080)

## Building and deploying project

Site is hosted on Amazon, to be able to deploy you need to create `.aws.json` configuration file based on provided `.aws.json.example` with your own keys.

After that full build and deploy is done by simply running:

```
gulp publish
```

This takes care of building the metalsmith site, minimizing css and deploying changes to S3.
