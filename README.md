# homepage

After cloning/downloading repository on your local machine, navigate to that directory in your terminal and do the

<code><b>npm install</b></code>

While you are positioned in the same directory run <code><b>sudo nodemon build</b></code>, this command will build the site
and run the server and enable live reloading of the project. Now you'll be able to access the homepage by opening
your browser and going to this address
<code><b>localhost:8080</b></code>.

## Generating minified css file

After running server, open new terminal and run <code><b>sudo gulp watch</b></code>.
This will automatically generate minifyed css on every change.
If you want just to generate minifyed css you need to run <code><b>sudo gulp generate-css</b></code>.


