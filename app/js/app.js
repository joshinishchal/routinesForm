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
    exerciserNameList = {};
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
                                    "setType" : {},
                                    "totalSet" : 0
                            };

                            for(var m in obj[i][j]["attributes"]["groups"]){
                                    var tempArr = [];
                                    for(var n in obj[i][j]["attributes"]["groups"][m]){
                                        tempArr.push(setDictionary[obj[i][j]["attributes"]["groups"][m][n]]);
                                    }
                                    var str = tempArr.join(" & ");
                                    exerciserNameList[i][obj[i][j]["name"]]["setType"][str] = obj[i][j]["attributes"]["groups"][m];
                                    exerciserNameList[i][obj[i][j]["name"]]["totalSet"]++;
                            }

                        }else{
                            for(var k in obj[i][j]){
                                exerciserNameList[i][obj[i][j][k]["name"]] = {
                                    "path" : [i,j,k],
                                    "setType" : {},
                                    "totalSet" : 0
                                };

                                for(var l in obj[i][j][k]["attributes"]["groups"]){
                                    var tempArr = [];

                                    for(var o in obj[i][j][k]["attributes"]["groups"][l]){
                                        tempArr.push(setDictionary[obj[i][j][k]["attributes"]["groups"][l][o]]);
                                    }

                                    var str = tempArr.join(" & ");
                                    exerciserNameList[i][obj[i][j][k]["name"]]["setType"][str] = obj[i][j][k]["attributes"]["groups"][l];
                                    exerciserNameList[i][obj[i][j][k]["name"]]["totalSet"]++;
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

    function checkAttribute(exerciseType, exerciseName, selectedSetType, str){
        var flag = false;
        if(typeof exerciseType != "undefined" && typeof exerciseName != "undefined" && typeof exerciserNameList[exerciseType] != "undefined" && typeof exerciserNameList[exerciseType][exerciseName] != "undefined"){
            if(exerciserNameList[exerciseType][exerciseName]["totalSet"] == 1){
                for(var i in exerciserNameList[exerciseType][exerciseName]["setType"]){
                    if(i.indexOf(" & ") >= 0){
                        for(var j in exerciserNameList[exerciseType][exerciseName]["setType"][i]){
                            if(exerciserNameList[exerciseType][exerciseName]["setType"][i][j] == str){
                                flag = true;
                                return flag;
                            }
                        }
                    }
                }
            }else if(typeof selectedSetType != "undefined"){
                console.log("in else if, str: " + str);
                for(var j in exerciserNameList[exerciseType][exerciseName]["setType"][selectedSetType]){
                    if(exerciserNameList[exerciseType][exerciseName]["setType"][selectedSetType][j] == str){
                        flag = true;
                        return flag;
                    }
                }
            }
        }
        return flag;
    }

    this.isDurationAvailable = function(exerciseType, exerciseName, selectedSetType){
        var str = "duration";
        return checkAttribute(exerciseType, exerciseName, selectedSetType, str);

    };

    this.isDurationRequired = function(exerciseType, exerciseName, selectedSetType){
        console.log("in duration required");
        var str = "duration";
        if(checkAttribute(exerciseType, exerciseName, selectedSetType, str)){
            return "required";
        }else{
            return "";
        }
    };

    this.isDistanceAvailable = function(exerciseType, exerciseName, selectedSetType){
        var str = "distance";
        return checkAttribute(exerciseType, exerciseName, selectedSetType, str);
    };

    this.isDistanceRequired = function(exerciseType, exerciseName, selectedSetType){
        console.log("in distance required");
        var str = "distance";
        if(checkAttribute(exerciseType, exerciseName, selectedSetType, str)){
            return "required";
        }else{
            return "";
        }
    };

    this.isSetTypeVisible = function(exerciseType, exerciseName){
        var flag = false;
        if(typeof exerciseType != "undefined" && typeof exerciseName != "undefined" && typeof exerciserNameList[exerciseType] != "undefined" && typeof exerciserNameList[exerciseType][exerciseName] != "undefined" && exerciserNameList[exerciseType][exerciseName]["totalSet"] > 1){
            flag = true;
        }
        return flag;
    };

}]);


routinesApp.controller("createNewRoutine", ["$scope", "fbConnection", "routinesHelper", function($scope, fbConnection, routinesHelper){
    //Initialize to get fbConnection
    var fbExerciseData = {
        "exerciseType" : fbConnection.getExercises(),
        "exerciseCategories" : fbConnection.getExerciseCategories()
    };

    $scope.getExerciserNameList = routinesHelper.getExerciserNameList;
    $scope.isDurationAvailable = routinesHelper.isDurationAvailable;
    $scope.isDurationRequired = routinesHelper.isDurationRequired;

    $scope.isDistanceAvailable = routinesHelper.isDistanceAvailable;
    $scope.isDistanceRequired = routinesHelper.isDistanceRequired;

    $scope.getSetType = routinesHelper.getSetType;
    $scope.isSetTypeVisible = routinesHelper.isSetTypeVisible;

    $scope.fbExerciseData = fbExerciseData;

}]);

