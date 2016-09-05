var replbs = angular.module("npRoutinesDirectives.replbs", []);

/* Contains all the directives needed to show Reps and Sets.*/
replbs.directive("npreplbset", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="input-group">
                        <span class="input-group-addon">Set</span>
                        <input type="number" name="reps" id="reps" class="input-group" placeholder="Reps" min="1" step="1" required>
                        <span class="input-group-addon">X</span>
                        <input type="number" name="lbs" id="lbs" class="input-group" placeholder="Lbs" min="5" step="5" required>
                    </div>`
    }
}]);

replbs.directive("addnewreplbsetbtn", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="form-inline">
                        <div class="input-group">
                            <button type="button" id="addRepsLbs" name="addRepsLbs" class="input-group" data-ng-click="getHTMLForSetLbs()" >Add New Set</button>
                        </div>
                    </div>`,
        link : function(scope, element){
            scope.getHTMLForSetLbs =  function(){
                angular.element(document.getElementById("repsNlbsInputContainer")).append($compile("<br/><npreplbset></npreplbset>")(scope));
            }
        }
    }
}]);

replbs.directive("npreplbscontainer", ["$compile", function($compile){
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

/* Contains all the directives needed to show Reps and Sets.*/

replbs.directive("npsettype", ["$compile", function($compile){
    return {
        restrict : "A",
        replace : false,
        link : function(scope, element, attrs){
            element.on("change",function(){
                angular.element(element.parent().parent().parent().find("#setsContainer *")).remove();
                if(attrs["npsettype"] == "Reps & Lbs"){
                    angular.element(element.parent().parent().parent().find("#setsContainer")).append($compile("<npreplbscontainer></npreplbscontainer>")(scope));
                }else if(attrs["npsettype"] == "Reps & Body Weight"){
                    angular.element(element.parent().parent().parent().find("#setsContainer")).append($compile("<nprepbwcontainer></nprepbwcontainer>")(scope));
                }else if(attrs["npsettype"] == "Duration & Lbs"){
                    angular.element(element.parent().parent().parent().find("#setsContainer")).append($compile("<npdurationlbcontainer></npdurationlbcontainer>")(scope));
                }else if(attrs["npsettype"] == "Duration & Body Weight"){
                    angular.element(element.parent().parent().parent().find("#setsContainer")).append($compile("<npdurationbwcontainer></npdurationbwcontainer>")(scope));
                }else if(attrs["npsettype"] == "Duration"){
                    angular.element(element.parent().parent().parent().find("#setsContainer")).append($compile("<npdurationcontainer></npdurationcontainer>")(scope));
                }else if(attrs["npsettype"] == "Reps"){
                    angular.element(element.parent().parent().parent().find("#setsContainer")).append($compile("<nprepcontainer></nprepcontainer>")(scope));
                }
            })

        }
    }
}]);