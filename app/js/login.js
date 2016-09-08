var loginModule = angular.module("loginModule", ["firebase"]);

loginModule.constant("FirebaseUrl", "https://planetf-clone.firebaseio.com/");
loginModule.constant("rootNode", "planetf-clone");
loginModule.service("rootRef", ["FirebaseUrl", Firebase]);

loginModule.service("newfbConnection", ["rootNode", "rootRef", "$firebaseArray", "$firebaseObject", "$firebaseAuth", function newfbConnection(rootNode, rootRef, $firebaseArray, $firebaseObject, $firebaseAuth){
    var rootURL = rootRef;

    this.authUser = function (userName, password, sucessCallback, errorCallback) {
      // Authenticate user here.
      //Return true or false
      console.log("authenticating user..");
      var routinesAuth = new $firebaseAuth(rootRef)
      routinesAuth.$authWithPassword({
        "email"    : userName,
        "password" : password
      }).then(function(authData){
        console.log("successfully logged in: " + authData);
        sucessCallback();
      }).catch(function(error){
          console.log("got error: " + error);
          errorCallback();
        });
    }

    // //return $firebaseArray(clubId.orderByValue());
    // this.getSpecificData = function(index){
    //     return $firebaseArray(clubId.limitToLast(index));
    // };
    // this.getFeedbacks = function(date){
    //     return $firebaseObject(clubId.child(date));
    // };
    // this.getFeedbackForReview = function(date,feedbackId){
    //     return $firebaseObject(clubId.child(date).child(feedbackId));
    // };
}]);



// var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com");
// ref.authWithPassword({
//   email    : "bobtony@firebase.com",
//   password : "correcthorsebatterystaple"
// }, function(error, authData) {
//   if (error) {
//     console.log("Login Failed!", error);
//   } else {
//     console.log("Authenticated successfully with payload:", authData);
//   }
// });

loginModule.controller("loginController", ["$scope", "newfbConnection", function($scope, newfbConnection){
  //Use $scope to get user

  var successCallback = function(){
      console.log("logged in successfully.");
      $scope.auth = true;
    }

    var errorCallback = function(){
      console.log("failed...");
      var modal = document.getElementById('myModal');
      modal.style.display = "block";
      $scope.auth = false;
    }


  $scope.submit = function(){

    console.log("submit before");
    newfbConnection.authUser($scope.userName, $scope.password, successCallback, errorCallback);
    console.log("submit after");
  }



  $scope.closeModal = function(){
    angular.element(".modal").css("display","none");
  }

}]);

