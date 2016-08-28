var routinesApp = angular.module("routinesApp", ["firebase"]);

//Use following url to connect with test DB on Firebase
routinesApp.constant("FirebaseUrl", "https://planetf-clone.firebaseio.com/");
routinesApp.constant("rootNode", "planetf-clone");
routinesApp.service("rootRef", ["FirebaseUrl", Firebase]);

routinesApp.service("fbConnection", ["rootNode", "rootRef", "$firebaseArray", "$firebaseObject", "$firebaseAuth", function fbConnection(rootNode, rootRef, $firebaseArray, $firebaseObject, $firebaseAuth){
    var rootURL = rootRef;

    this.getExercises = function() {
        return $firebaseObject(rootURL.child("exercises"));
    };
    this.getExerciseCategories = function(){
        return $firebaseObject(rootURL.child("exercise_categories"));
    };

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

routinesApp.service("routinesHelper", [function routinesHelper(){

}]);


routinesApp.controller("createNewRoutine", ["$scope", "fbConnection", "routinesHelper", function($scope, fbConnection, routinesHelper){
    //Initialize to get fbConnection
    var fbExerciseData = {
        "exerciseType" : fbConnection.getExercises(),
        "exerciseCategories" : fbConnection.getExerciseCategories()
    };

    $scope.fbExerciseData = fbExerciseData;
    $scope.exerciseCategories = fbExerciseData.getExerciseCategories;

}]);

