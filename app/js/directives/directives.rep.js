var rep = angular.module("npRoutinesDirectives.rep", []);

/*Contains all the directives to show Reps*/
rep.directive("nprepset", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="input-group">
                        <span class="input-group-addon">Set</span>
                        <input type="number" name="reps" id="reps" class="input-group" placeholder="Reps" min="1" step="1" required>
                    </div>`
    }
}]);

rep.directive("addnewrepsetbtn", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="form-inline">
                        <div class="input-group">
                            <button type="button" id="addRep" name="addRep" class="input-group" data-ng-click="getHTMLForRep()" >Add New Set</button>
                        </div>
                    </div>`,
        link : function(scope, element){
            scope.getHTMLForRep =  function(){
                angular.element(document.getElementById("repsInputContainer")).append($compile("<br/><nprepset></nprepset>")(scope));
            }
        }
    }
}]);

rep.directive("nprepcontainer", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div id="repsContainer">
                        <!--//Second line of form starts here-->
                        <div class="form-inline" id="repsInputContainer">
                            <nprepset></nprepset>
                        </div>
                        <addnewrepsetbtn></addnewrepsetbtn>
                    </div>`
    }
}]);