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
    var exerciserNameList = {};
    var setDictionary = {
        "reps"      : "Reps",
        "duration"  : "Duration",
        "distance"  : "Distance",
        "calories"  : "Calories",
        "wtd"       : "Lbs",
        "bw"        : "Body Weight"
    };
    function createExerciseNameList(obj){
        if(!obj["cardio"]){
            return;
        }
        for(var i in obj){
            if(i.indexOf("$") < 0 && i.indexOf("_proto_") < 0 && !exerciserNameList[i]){
                exerciserNameList[i] = {};
            }
            if(i.indexOf("$") < 0 && i.indexOf("_proto_") < 0 && typeof obj[i] === "object"){
                for(var j in obj[i]){
                    if(typeof obj[i][j] === "object"){
                        //Shortcut for classes
                        if(i == "classes"){
                            exerciserNameList[i][obj[i][j]["name"]] = {
                                    "path" : [i,j],
                                    "setType" : {}
                            };

                            for(var m in obj[i][j]["attributes"]["groups"]){
                                    var tempArr = [];
                                    for(var n in obj[i][j]["attributes"]["groups"][m]){
                                        tempArr.push(setDictionary[obj[i][j]["attributes"]["groups"][m][n]]);
                                    }
                                    var str = tempArr.join(" & ");
                                    exerciserNameList[i][obj[i][j]["name"]]["setType"][str] = obj[i][j]["attributes"]["groups"][m];
                            }

                        }else{
                            for(var k in obj[i][j]){
                                exerciserNameList[i][obj[i][j][k]["name"]] = {
                                    "path" : [i,j,k],
                                    "setType" : {}
                                };

                                for(var l in obj[i][j][k]["attributes"]["groups"]){
                                    var tempArr = [];

                                    for(var o in obj[i][j][k]["attributes"]["groups"][l]){
                                        tempArr.push(setDictionary[obj[i][j][k]["attributes"]["groups"][l][o]]);
                                    }

                                    var str = tempArr.join(" & ");
                                    exerciserNameList[i][obj[i][j][k]["name"]]["setType"][str] = obj[i][j][k]["attributes"]["groups"][l];
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    this.getExerciserNameList = function(exerciseType, obj){
        if(JSON.stringify(exerciserNameList) == "{}"){
            createExerciseNameList(obj);
        }
        return exerciserNameList[exerciseType];
    };

    this.getSetType = function(exerciseType, exerciseName){
        if(typeof exerciseType != "undefined" && typeof exerciseName != "undefined"){
            if(typeof exerciserNameList[exerciseType] != "undefined" && typeof exerciserNameList[exerciseType][exerciseName] != "undefined"){
                return exerciserNameList[exerciseType][exerciseName]["setType"];
            }
        }

        return {};
    };

    function checkAttribute(obj, exerciseName, str){
        var arr = exerciserNameList[exerciseName];
        var attrGroups = obj[arr[0]][arr[1]][arr[2]]["attributes"]["groups"];
        var flag = false;
        for(var i in attrGroups){
            if(i.indexOf("group") >= 0){
                for(var j in attrGroups[i]){
                    if(attrGroups[i][j] == str){
                        flag = true;
                        return flag;
                    }
                }
            }
        }

        return flag;
    }

    this.isDurationAvailable = function(obj, exerciseName){
        return checkAttribute(obj, exerciseName, "duration");
    };

    this.isDistanceAvailable = function(obj, exerciseName){
        return checkAttribute(obj, exerciseName, "distance");
    };

}]);


routinesApp.controller("createNewRoutine", ["$scope", "fbConnection", "routinesHelper", function($scope, fbConnection, routinesHelper){
    //Initialize to get fbConnection
    var fbExerciseData = {
        "exerciseType" : fbConnection.getExercises(),
        "exerciseCategories" : fbConnection.getExerciseCategories()
    };

    $scope.getExerciserNameList = routinesHelper.getExerciserNameList;
    //$scope.isDurationAvailable = routinesHelper.isDurationAvailable;
    //$scope.isDistanceAvailable = routinesHelper.isDistanceAvailable;
    $scope.getSetType = routinesHelper.getSetType;

    $scope.fbExerciseData = fbExerciseData;

}]);

