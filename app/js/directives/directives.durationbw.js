var durationbw = angular.module("npRoutinesDirectives.durationbw", []);

/*Contains all the directives to show Reps and Body Weight*/
durationbw.directive("npdurationbwset", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="input-group">
                        <span class="input-group-addon">Set</span>
                        <input type="text" name="duration" id="duration" class="input-group" placeholder="MM:SS" pattern="[0-9]{1,2}[\:]{1}[0-9]{2}" required>
                        <span class="input-group-addon">X</span>
                        <span>-- Body Weight</span>
                    </div>`
    }
}]);

durationbw.directive("addnewdurationbwsetbtn", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="form-inline">
                        <div class="input-group">
                            <button type="button" id="addDurationBw" name="addDurationBw" class="input-group" data-ng-click="getHTMLForDurationBw()" >Add New Set</button>
                        </div>
                    </div>`,
        link : function(scope, element){
            scope.getHTMLForDurationBw =  function(){
                angular.element(element.parent().parent().parent().find("#durationLbsInputContainer")).append($compile("<br/><npdurationbwset></npdurationbwset>")(scope));
            }
        }
    }
}]);

durationbw.directive("npdurationbwcontainer", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div id="durationBwContainer">
                        <!--//Second line of form starts here-->
                        <div class="form-inline" id="durationLbsInputContainer">
                            <npdurationbwset></npdurationbwset>
                        </div>
                        <addnewdurationbwsetbtn></addnewdurationbwsetbtn>
                    </div>`
    }
}]);