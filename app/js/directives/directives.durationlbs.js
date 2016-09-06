var durationlbs = angular.module("npRoutinesDirectives.durationlbs", []);

/*Contains all the directives to show Reps and Body Weight*/
durationlbs.directive("npdurationlbset", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="input-group">
                        <span class="input-group-addon">Set</span>
                        <input type="text" name="duration" id="duration" class="input-group" placeholder="MM:SS" pattern="[0-9]{2}[\:]{1}[0-9]{2}" required>
                        <span class="input-group-addon">X</span>
                        <input type="number" name="lbs" id="lbs" class="input-group" placeholder="Lbs" min="5" step="5" required>
                    </div>`
    }
}]);

durationlbs.directive("addnewdurationlbsetbtn", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="form-inline">
                        <div class="input-group">
                            <button type="button" id="addDurationLb" name="addDurationLb" class="input-group" data-ng-click="getHTMLForDurationLbs()" >Add New Set</button>
                        </div>
                    </div>`,
        link : function(scope, element){
            scope.getHTMLForDurationLbs =  function(){
                angular.element(element.parent().parent().parent().find("#durationLbsInputContainer")).append($compile("<br/><npdurationlbset></npdurationlbset>")(scope));
            }
        }
    }
}]);

durationlbs.directive("npdurationlbcontainer", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div id="durationLbsContainer">
                        <!--//Second line of form starts here-->
                        <div class="form-inline" id="durationLbsInputContainer">
                            <npdurationlbset></npdurationlbset>
                        </div>
                        <addnewdurationlbsetbtn></addnewdurationlbsetbtn>
                    </div>`
    }
}]);