const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");

app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
//app.use(__dirname+"/index.html");

app.get("/", function(req, res){
  //res.write();
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  // console.log(firstName);
  const data = {
    members : [
      {
      email_address : email,
      status : "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};
  const jsonData = JSON.stringify(data);
  const url = "https://us20.api.mailchimp.com/3.0/lists/8b65937f30";
  const options = {
    method : "POST",
    auth: "harish:f780a1409743153595c6768e88e86424-us20"
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      // console.log(JSON.parse(data));
      if( response.statusCode === 200){
        res.sendFile(__dirname+"/sucess.html");
      }
      else{
        res.sendFile(__dirname+"/failure.html");
      }
  })
})
    request.write(jsonData);
    request.end();

});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server running on port 3000");
});





//api key : f780a1409743153595c6768e88e86424-us20
//list id : 8b65937f30
