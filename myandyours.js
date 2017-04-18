var express = require('express');
var app = express();
var resp = {};
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
var urlEncodedParser = bodyParser.urlencoded({ extended : false});
var jwt = require('jwt-simple');
app.set('jwtTokenSecret', 'Remind');
var moment = require('moment');
var ms = moment();
var expires = ms.add(7,'days').valueOf();
app.get('/',function(request,response){
 response.send("my and yours mobile application test  Server");
  });
app.post('/login',urlEncodedParser,function(request,response){
console.log('/login');
var token = jwt.encode({
  iss: request.body.userName,
  exp: expires
}, app.get('jwtTokenSecret'));
 resp.userName = request.body.userName;
 resp.password = request.body.password;
 resp.token = token;
console.log(request.body);
response.send(resp);
  });

var aryEmpDetails = [];
app.post('/req',urlEncodedParser,function(request,response){
console.log('/req');
  resp = {};
  console.log(request.body);
  // check object key
  console.log(request.body.hasOwnProperty("strUserName"),request.body.hasOwnProperty("strDesignation"));
  if(request.body.hasOwnProperty("strUserName") && request.body.hasOwnProperty("strDesignation")){
      if(request.body.strUserName !== "" && request.body.strDesignation !== ""){
    if(request.body.strUserName.length > 0 && request.body.strDesignation.length > 0){
      resp = {};
        aryEmpDetails.push(request.body);
       resp.userName = request.body.strUserName;
       resp.designation = request.body.strDesignation;
       resp.msg = "Correct Schema";
        resp.aryDeatails = aryEmpDetails;
    }

  }else if(request.body.strUserName == "" && request.body.strDesignation == ""){
       resp = {};
      resp.msg = "Please enter user name and designation";
    }else if(request.body.strUserName == ""){
      resp = {};
      resp.msg = "Please enter the user name";
    }else if(request.body.strDesignation == ""){
      resp = {};
      resp.msg = "Please enter the designation";
    }

  }else{
    resp.msg="Schema wrong";
  }


 response.send(resp);
  });

app.listen('5687',function(){
    var port = 5687;
    var host = "localhost"
    console.log("Redmind Application is running on  http://%s:%s",host,port);
});
