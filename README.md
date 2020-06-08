# README

This app was created with Rails and Create React App as well as SASS to be responsive and allow a group of friends to be able to plan and organize their by-monthly get togethers.

# INSTALLATION

#Prerequisites to DEV Mode:
  * Ruby v2.7.1
  * Rails v6.0.3
  * Node v14.4.3
  * Nothing Running on specified ports

##To run this in Dev Mode:
 
 1) go to top level directory and run "yarn install"
 2) Make sure Postgres(^12.0) is Running
 3) run "yarn start" - this will start both the rails development server and the React frontend development server.
 
 
* Prerequisites to Production Mode
  * Docker installed. This can be linux native or Windows/MacOS Docker Desktop Community Edition
  * Docker Compose installed.
  * Nothing running on specified ports
 
 ##To run this in production Mode:
 1) go to top level .env_example, copy and rename to .env
 2) Enter in your own passwords for a production environment. Just leaving these as default will allow the server to run as a demo.
 3) Enter the ./api/.env and copy your username and password from the top level .env
 4) From the top level folder console run "docker-compose up --build" 
  * If you run into errors within this process run each service to trouble shoot errors. you can run each service with
    1) "docker-compose up db"
    2) "docker-compose up api"
    3 "docker-compose up web"
 5) to Shutdown service run "docker-compose down" or hit "control+c" from the running terminal window
 
 
##Running and static assets being served from Rails:
https://whiskey-night2020.herokuapp.com/

##Running from docker-compose on Google Cloud Compute:
whiskeynight.site


##MAJOR GOALS OF THE PROJECT
I wanted to build something that was designed to be fully web and mobile responsive. The focus was to allow a simple portal for friends to coordinate a get together.

I wanted to get to know the process of building and fully deploying a site using docker. Docker is a technology that is taking over or has taken over most sites already. The goal, and I think the success of using tools like docker-compose and nginx(frontend static assets and reverse proxy) has really allowed me to wrap my head around and build with some more complex technologies.


#Next Steps
-Convert the back end to an express or koa
-Add ssl certificates and full https support through Nginx
