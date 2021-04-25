function login(){
    event.preventDefault();
  var username= document.getElementById("username").value;
  var password = document.getElementById("password").value;

   if(username == ""){
     alert("username cannot be empty");
     return;
   }
   if(password == ""){
     alert("password cannot be empty");
     return;
   }

  var userDetails= {
      username:username,
      password:password,
      
  }
  console.log(userDetails);
var xmlHttpRequest= new XMLHttpRequest();
xmlHttpRequest.open('post', "http://localhost:8095/api/login");
xmlHttpRequest.setRequestHeader('Content-type', 'application/json');
   xmlHttpRequest.onreadystatechange= function(){
       if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
            console.log('responseText', this.responseText);
            var response= this.responseText;
            
 if(response == "1"){
       localStorage.setItem('currentUser', username);
       window.location.href="../dashboard/userdashboard.html";
}
if(response  == "0"){
    alert("this user not available");
      return;
}
if(response == "2"){
    alert("password incorrect!");
}
  }
}
xmlHttpRequest.send(JSON.stringify(userDetails));
 }