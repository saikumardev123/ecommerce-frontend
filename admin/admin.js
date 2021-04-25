function logout(){
    window.location.href="../login/login.html";
}

var allProductsMaster="";
document.getElementById("save").style.display="none";

getAllProducts();
function getAllProducts(){
  var xmlHttpRequest= new XMLHttpRequest();
xmlHttpRequest.open('get', "http://localhost:8095/admin/allProducts");
xmlHttpRequest.setRequestHeader('Content-type', 'application/json');
xmlHttpRequest.send();
   xmlHttpRequest.onreadystatechange= function(){
       if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
            console.log('responseText', this.responseText);
            var allProducts= JSON.parse(this.responseText);
            console.log('response',allProducts);
            allProductsMaster=allProducts;
               if(allProducts.length > 0){
            displayProducts(allProducts);
          }
}
}
}
function displayProducts(allProducts){

   var tbody=document.getElementById("tbody");

   var tablebodydata="";
    for(var i=0;i<allProducts.length;i++){
         var product=allProducts[i];
      tablebodydata+= "<tr><td>"+product.name+"</td>" + "<td>"+product.brand+"</td>"+ "<td>"+product.price+"</td>"+ "<td>"+product.quantity+"</td>"+"<td>"+product.seller+"</td>"+ "<td><button type='button' onclick=deleteProduct("+product.id+") class='btn btn-danger'>Delete</button> </td> " + "<td><button type='button' onclick=editProduct("+product.id+") class='btn btn-warning'>Edit</button> </td>" +"</tr>";
    }
tbody.innerHTML=tablebodydata;
}

 function editProduct(id){
  document.getElementById("save").style.display="block";
  document.getElementById("add").style.display="none";
  localStorage.setItem('editProductId',id);
   for(var i=0;i<allProductsMaster.length ; i++){
        if(allProductsMaster[i].id == id){
          document.getElementById("name").value=allProductsMaster[i].name;
          document.getElementById("brand").value=allProductsMaster[i].brand;
          document.getElementById("quantity").value=allProductsMaster[i].quantity;
          document.getElementById("price").value=allProductsMaster[i].price;
          document.getElementById("description").value=allProductsMaster[i].description;
          document.getElementById("imageurl").value=allProductsMaster[i].imageurl;
          document.getElementById("seller").value=allProductsMaster[i].seller;
          return;
        }
   }
 }

 function saveProduct(){
   event.preventDefault();
  var name=document.getElementById("name").value;
var brand=document.getElementById("brand").value;
var quantity=document.getElementById("quantity").value;
var price=document.getElementById("price").value;
var description=document.getElementById("description").value;
var imageurl=document.getElementById("imageurl").value;
var seller=document.getElementById("seller").value;

var product={
   id: parseInt(localStorage.getItem("editProductId")),
    name:name,
    brand:brand,
    quantity:parseInt(quantity),
    price:parseInt(price),
    description:description,
    imageurl:imageurl,
    seller:seller
}
console.log('product',product);
var xmlHttpRequest= new XMLHttpRequest();
xmlHttpRequest.open('put', "http://localhost:8095/admin/updateProduct");
xmlHttpRequest.setRequestHeader('Content-type', 'application/json');
xmlHttpRequest.send(JSON.stringify(product));
   xmlHttpRequest.onreadystatechange= function(){
       if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
            console.log('responseText', this.responseText);
            var response= JSON.parse(this.responseText);
 if(response.id){
       alert("Product updated Successfully!!");
       document.getElementById("form").reset();
       document.getElementById("save").style.display="none";
       document.getElementById("add").style.display="block";

       getAllProducts();
}
else
{
 alert("Something went wrong! try again");
}
  }
}


 }

function deleteProduct(id){
  event.preventDefault();
  var xmlHttpRequest= new XMLHttpRequest();
  xmlHttpRequest.open('delete', "http://localhost:8095/admin/deleteProductById/"+id);
  xmlHttpRequest.setRequestHeader('Content-type', 'application/json');
  xmlHttpRequest.send();
     xmlHttpRequest.onreadystatechange= function(){
         if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
                getAllProducts();
            }
}
}
function addProduct(){
event.preventDefault();

var name=document.getElementById("name").value;
var brand=document.getElementById("brand").value;
var quantity=document.getElementById("quantity").value;
var price=document.getElementById("price").value;
var description=document.getElementById("description").value;
var imageurl=document.getElementById("imageurl").value;
var seller=document.getElementById("seller").value;

var product={
    name:name,
    brand:brand,
    quantity:parseInt(quantity),
    price:parseInt(price),
    description:description,
    imageurl:imageurl,
    seller:seller
}
console.log(product);
var xmlHttpRequest= new XMLHttpRequest();
xmlHttpRequest.open('post', "http://localhost:8095/admin/addProduct");
xmlHttpRequest.setRequestHeader('Content-type', 'application/json');
xmlHttpRequest.send(JSON.stringify(product));
   xmlHttpRequest.onreadystatechange= function(){
       if(xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
            console.log('responseText', this.responseText);
            var response= JSON.parse(this.responseText);
 if(response.id){
       alert("Product Added Successfully!!");
       document.getElementById("form").reset();
       getAllProducts();
}
else
{
 alert("Something went wrong! try again");
}
  }
}


/*

 CREATE TABLE COUNTRY (    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
countryName varchar(100) NOT NULL,    population int NOT NULL );

*/
}