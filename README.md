# Climate Data Visualization Tool

This is a group project by OAMK second year software development students, the purpose of which was to build a web application that fetches data from a database via a RESTful API. We had nine weeks to complete this project.

The project's requirements were to build a visualization application for climate change related data. The web application must be able to fetch data from a database via an API, and render charts to visualize the changes in temperature and carbon dioxide levels. An user must also be able to register to the service and create collections of different visualisations. Collections have to be able to be saved and shared with an unique URL. User has to be able to delete collections and their account.


## Technical description of the development stack

The user interface was built with React, API connections were handled with Axios, data was visualized with CanvasJS charting library and the web app stylized with Bootstrap.
The database is a MongoDB NoSQL-database which runs on MongoDB's own Atlas platform.
Data was imported with mongoimport. REST API was made with Express and Mongoose.
The service is deployed in [Google Cloud](https://group11weatherdata.ew.r.appspot.com/), but also local backups of the service exist.

## User Functions

- User is able to register to the service with an username and a password. After a succesful registration, the user is able to login to the service
- User can create a new collection of the available visualizations and can sort them into one or two columns, add custom descriptions and enable custom amount of chart series
- User can inspect and delete their own collections from their account page. User can also delete their account from the service entirely, what also deletes their collections

## Testing

Mocha and Chai were used for testing the API's connection to the database. Jest was used for frontend component testing on signup, login and user account pages
