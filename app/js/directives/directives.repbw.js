var repbw = angular.module("npRoutinesDirectives.repbw", []);

/*Contains all the directives to show Reps and Body Weight*/
repbw.directive("nprepbwset", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="input-group">
                        <span class="input-group-addon">Set</span>
                        <input type="number" name="reps" id="reps" class="input-group" placeholder="Reps" min="1" step="1" required>
                        <span class="input-group-addon">X</span>
                        <span>-- Body Weight</span>
                    </div>`
    }
}]);

repbw.directive("addnewrepbwsetbtn", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="form-inline">
                        <div class="input-group">
                            <button type="button" id="addRepsBw" name="addRepsBw" class="input-group" data-ng-click="getHTMLForSetBw()" >Add New Set</button>
                        </div>
                    </div>`,
        link : function(scope, element){
            scope.getHTMLForSetBw =  function(){

                angular.element(element.parent().parent().parent().find("#repsNBwInputContainer")).append($compile("<br/><nprepbwset></nprepbwset>")(scope));
            }
        }
    }
}]);

replbs.directive("nprepbwcontainer", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div id="repsBwContainer">
                        <!--//Second line of form starts here-->
                        <div class="form-inline" id="repsNBwInputContainer">
                            <nprepbwset></nprepbwset>
                        </div>
                        <addnewrepbwsetbtn></addnewrepbwsetbtn>
                    </div>`
    }
}]);