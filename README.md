MERN STACK APPLICATION <br/>

It includes mongodb as database, express and node.js as backend, and react.js as <br/>front-end.<br/>
It was finished with the backend part and can be run on local server: localhost:5000. <br/>
For API testing, I used insomnia to test GET, POST, PUT AND DELETE. <br/>

## Deloyment <br/>
Website Link : https://cocky-goldberg-3b81e2.netlify.app/ <br/>
![alt text](https://github.com/lisa710junyi/foods_review_mern_stack/blob/master/Capture.PNG?raw=true)


`nodemon server` to start <br/>
`cd frontend`<br/>
`npm start`<br/>

For the security :<br/>
Check the blew link : https://www.mongodb.com/security-best-practices <br/>

I need to go to frontend file to npm start (start in its directory file)<br/>

Something I meet in this project : <br/>

Switch import changes to Routes for es6<br/>

If we wrote up code in one Route, it shows mistake<br/>

`<Route exact path="/" component={FoodsList} /><br/> <Route path="/foods" component={FoodsList}/>` <br/>
