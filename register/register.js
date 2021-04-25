function register(){
    event.preventDefault();
  var username= document.getElementById("username").value;
  var password = document.getElementById("password").value;
  var emailId= document.getElementById("emailId").value;

   if(username == ""){
    alert("username required");
    return;
   }
   if(password == ""){
    alert("password required");
    return;
   }
   if(emailId == ""){
    alert("emailId required");
    return;
   }


  var userDetails= {
      username:username,
      password:password,
      emailIid:emailId,
      role:"role_user"
  }
  console.log(userDetails);
var xmlHttpRequest= new XMLHttpRequest();
xmlHttpRequest.open('post', "http://localhost:8095/api/register");
xmlHttpRequest.setRequestHeader('Content-type', 'application/json');
   xmlHttpRequest.onreadystatechange= function(){
   
       if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
            console.log('responseText', this.responseText);
            var response= JSON.parse(this.responseText);
 if(response.id){
       localStorage.setItem('currentUser', response.username);
       window.location.href="../dashboard/userdashboard.html";
}
else
{
 alert("Registration Failure, try again!");
}
  }
}
xmlHttpRequest.send(JSON.stringify(userDetails));
 }