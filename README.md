# Delicious Node - A CRUD-y Store Project

My knowledge of Node, like a lot of people's, has been pieced together by just being set to work on an existing project, or by having to just figure things out in creating my own projects. I wanted a more schematic, robust overview, covering all the kinds of stuff I know already in Rails - e.g. separating concerns properly between middleware and controller, efficient templating, proper authentication, efficient database lookups, etc.

My knowledge of Mongo was a bit sketchy too, so I really wanted to clean up some confusion there. 

Basically: I wanted a nice exemplar to study and build, in order to learn the real best practices when it comes to Node-ing. Ostensibly it's a place for business owners to upload a pre-templated page about their shops/bars/cafes/etc, so people can find them online. Functionally it's a CRUD exemplar with user authentication, where anyone can Read (and filter through object attributes), and logged-in users can Create/Edit/Destroy stores, working off a Mongo database, with Pug templating, and Express routing (with middleware handling the waterfall movement of requests through to the final response).

## Getting Started

This is a fairly standard Node app, so you just need to `npm install` and `npm start` it to get it going. However, you'll also need to setup a variables.env file, however, in the root directory. You can see an example [here](https://github.com/wesbos/Learn-Node/blob/master/starter-files/variables.env.sample). You'll need a mongoDB URI for the DATABASE variable, Mailtrap credentials for the MAIL_ variables, and a Google Maps Places API key for the MAP_KEY.

### Prerequisites

- A hosted MongoDB to connect to
- Google Maps API key
- Mailtrap creds (or alternative if you're happy tweaking the variables.env file and helpers/mail.js to set it up to use your preferred mail server (this isn't intended for real mail sending, just dev-style catching, but it's flexible enough to allow you to set it up with a real server if you want)


## Built With
* Node / NPM / Express for server itself and routing
* Pug for Templating
* Mongoose / Mongo for data storage
* Passport for Authentication
* Multer for image uploads
* Nodemailer / Juice / Mailtrap for emails


## Acknowledgments

* [Wes Bos](http://github.com/wesbos/) - Of course
* [Jay Koontz](https://github.com/jaykoontz) - Who gave me the idea to do this, and just offered a lot of encouragement when I needed it
