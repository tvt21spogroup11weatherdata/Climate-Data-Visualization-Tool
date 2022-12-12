# Climate-Data-Visualization-Tool

This project is an OAMK second year bachelor of software development student´s group project, what had the meaning of learning to build a web-application what searches data from a database via a REST-api. All parts of the product must be self made, and the timeline for the project was nine weeks.

The project´s goal was to build a visualization application for data related to climate change. The web-application must be able to search data saved to a database via an api, and draw diffrent canvases to illustrate the changes in temperature and carbon dioxide levels. You also need to be able to register to the service and create collections of diffrent visualisations. Collections had to be able to be saved and shared via a unique URL. You also had to be able to delete collections and your own account.



## Technical description of the development stack

The user interface was built with React, Axios was used to connect the frontend to the API, data was visualized with CanvasJS and stylized with Bootstrap.
The database is a NoSQL-database made with MongoDB, that is running on MongoDB´s own Atlas platform.
Data was imported with mongoimport. REST API is made with Express and Mongoose.
The service is being ran in [Google Cloud](https://group11weatherdata.ew.r.appspot.com/), but also local backups of the service exist.

## User Functions

- User is able to register into the service with an username and a password. After a succesful registeration, user is able to login to the service.
- User can create a new collection of the available visualization and can sort them into one or two columns
- User can inspect and delete their own collections from their userpage. User can also delete their account from the service entirely, what also deletes their collections.
