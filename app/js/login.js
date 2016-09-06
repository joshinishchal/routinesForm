// Below function Executes on click of login button.
// Get the modal
var sub = document.getElementById("close");
sub.onclick = function() {
      var modal = document.getElementById('myModal');
      modal.style.display = "none";
}

function validateForm()
{

  console.log("validating...");
  var user = document.getElementById("username").value;
  var pass = document.getElementById("password").value;
      
  if ( user == "test" && pass == "123"){  
    console.log("in if.."); 
    //window.location = "success.html"; // Redirecting to other page.
    window.alert("Login successfully");
    
  }else{
      //window.alert("Wrong login");
     //return true;
     console.log("in else..");
      // When the user clicks the button, open the modal
      var modal = document.getElementById('myModal');
      modal.style.display = "block";
      return false;
    //   sub.onclick = function() {
    //   modal.style.display = "none";
    // }
  }         

}