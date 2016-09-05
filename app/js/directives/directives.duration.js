var duration = angular.module("npRoutinesDirectives.duration", []);

/*Contains all the directives to show Reps and Body Weight*/
duration.directive("npdurationset", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="input-group">
                        <span class="input-group-addon">Set</span>
                        <input type="text" name="duration" id="duration" class="input-group" placeholder="Duration" pattern="[0-9]{2}[\:]{1}[0-9]{2}" required>
                        <span class="input-group-addon">MM:SS</span>
                    </div>`
    }
}]);

duration.directive("addnewdurationsetbtn", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="form-inline">
                        <div class="input-group">
                            <button type="button" id="addDuration" name="addDuration" class="input-group" data-ng-click="getHTMLForDuration()" >Add New Set</button>
                        </div>
                    </div>`,
        link : function(scope, element){
            scope.getHTMLForDuration =  function(){
                angular.element(element.parent().parent().parent().find("#durationInputContainer")).append($compile("<br/><npdurationset></npdurationset>")(scope));
            }
        }
    }
}]);

duration.directive("npdurationcontainer", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div id="durationContainer">
                        <!--//Second line of form starts here-->
                        <div class="form-inline" id="durationInputContainer">
                            <npdurationset></npdurationset>
                        </div>
                        <addnewdurationsetbtn></addnewdurationsetbtn>
                    </div>`
    }
}]);