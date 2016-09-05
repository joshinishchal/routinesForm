var npRoutinesDirectives = angular.module("npRoutinesDirectives", []);

/* Contains all the directives needed to show Reps and Sets.*/
npRoutinesDirectives.directive("npreplbset", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="input-group">
                        <span class="input-group-addon">Set</span>
                        <input type="number" name="reps" id="reps" class="input-group" placeholder="Reps" min="1" step="1">
                        <span class="input-group-addon">X</span>
                        <input type="number" name="lbs" id="lbs" class="input-group" placeholder="Lbs" min="5" step="5">
                    </div>`
    }
}]);

npRoutinesDirectives.directive("addnewreplbsetbtn", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="form-inline">
                        <div class="input-group">
                            <button type="button" id="addRepsLbs" name="addRepsLbs" class="input-group" data-ng-click="getHTMLForSets()" >Add New Set</button>
                        </div>
                    </div>`,
        link : function(scope, element){
            scope.getHTMLForSets =  function(){
                angular.element(document.getElementById("repsNlbsInputContainer")).append($compile("<br/><npreplbset></npreplbset>")(scope));
            }
        }
    }
}]);

npRoutinesDirectives.directive("npreplbsontainer", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div id="repsLbsContainer">
                        <!--//Second line of form starts here-->
                        <div class="form-inline" id="repsNlbsInputContainer">
                            <npreplbset></npreplbset>
                        </div>
                        <addnewreplbsetbtn></addnewreplbsetbtn>
                    </div>`
    }
}]);

npRoutinesDirectives.directive("npsettype", ["$compile", function($compile){
    return {
        restrict : "A",
        replace : false,
        link : function(scope, element, attrs){
            element.on("change",function(){
                angular.element(element.parent().parent().parent().find("#setsContainer #repsLbsContainer")).remove();
                if(attrs["npsettype"] == "Reps & Lbs"){
                    angular.element(element.parent().parent().parent().find("#setsContainer")).append($compile("<npreplbsontainer></npreplbsontainer>")(scope));
                }
            })

        }
    }
}]);
