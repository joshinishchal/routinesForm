var exerciseDir = angular.module("npRoutinesDirectives.exercise", []);

exerciseDir.directive("npexercise", function(){
    return{
        restrict : "E",
        replace : true,
        scope : true,
        template : `<div class="exercise">
                        <!--//Exercise Starts-->
                        <!--//First line of form starts here-->
                        <div class="form-inline">
                            <div class="input-group exerciseSelector">
                                <input type="text" class="input-group" name="exerciseType" id="exerciseType" list="exerciseTypes" placeholder="Select Type" data-ng-model="selectedExerciseType" required>
                                <input type="text" class="input-group" name="exerciseName" id="exerciseName" list="exerciseNames" placeholder="Exercise Name" data-ng-model="selectedExerciseName" npcardioset={{getDurationDistanceVisibility(selectedExerciseType.toLowerCase(),selectedExerciseName,selectedSetType)}} exerciseType>
                                <input type="text" class="input-group" name="setType" id="setType" list="setTypes" placeholder="Select Set Type" data-ng-model="selectedSetType" data-ng-show="isSetTypeVisible(selectedExerciseType.toLowerCase(), selectedExerciseName)" npsettype={{selectedSetType}} npcardioset={{getDurationDistanceVisibility(selectedExerciseType.toLowerCase(),selectedExerciseName,selectedSetType)}}>
                            </div>
                            <div class="input-group cardioContainer">
                            </div>
                            <div class="input-group">
                                <label for="restTime" class="sr-only">Rest Time (Optional)</label>
                                <input type="text" class="input-group" name="restTime" id="restTime" placeholder="Rest Time(Optional)" pattern="[0-9]{1,2}[\:]{1}[0-9]{2}">
                                <span class="input-group-addon">mm:ss</span>
                            </div>
                            <div class="input-group delete-div">
                                <button class="input-group delete-btn" type="button" id="deleteExercise" name="deleteExercise" deleteexercise>Delete</button>
                            </div>
                            <datalist id="exerciseTypes">
                                <option data-ng-repeat="(exerciseType, exercise) in fbExerciseData['exerciseType']" data-value="{{fbExerciseData['exerciseCategories'][exerciseType]['name']}}">{{fbExerciseData['exerciseCategories'][exerciseType]['name']}}</option>
                            </datalist>
                            <datalist id="exerciseNames">
                                <option data-ng-repeat="(exerciseName, subName) in getExerciserNameList(selectedExerciseType.toLowerCase(), fbExerciseData['exerciseType'])" data-value="{{exerciseName}}">{{exerciseName}}</option>
                            </datalist>
                            <datalist id="setTypes">
                                <option data-ng-repeat="(setType, attrs) in getSetType(selectedExerciseType.toLowerCase(), selectedExerciseName)" data-value="{{setType}}">{{setType}}</option>
                            </datalist>
                        </div>
                        <!--//First line ends here-->
                        <div id="setsContainer" class="setsContainer">
                            <!--<npreplbscontainer></npreplbscontainer>-->
                        </div>
                        <!--//Exercise Ends-->
                    </div>`
    }
});


exerciseDir.directive("deleteexercise", [function(){
    return {
        restrict : "A",
        replace : false,
        link : function(scope, element){
            element.on("click", function(){
                angular.element(element.parent().parent().parent()).remove();
            })
        }
    }
}]);

exerciseDir.directive("addnewexercise", ["$compile", function($compile){
    return {
        restrict : "A",
        replace : false,
        link : function(scope, element, attrs){
            element.on("click", function(){
                console.log("onclick happened..");
                angular.element(element.parent().parent().find("#exerciseContainer")).append($compile("<br/><npexercise></npexercise>")(scope));
            });
        }
    }
}]);