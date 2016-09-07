var cardioset = angular.module("npRoutinesDirectives.cardioset", []);

/* Contains all the directives needed to show Reps and Sets.*/
cardioset.directive("npcardioduration", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="input-group">
                        <input type="text" class="input-group" name="duration" id="duration" placeholder="Duration" required="">
                        <span class="input-group-addon">HH:MM</span>
                    </div>`
    }
}]);

cardioset.directive("npcardiodistance", ["$compile", function($compile){
    return {
        restrict : "E",
        replace : true,
        template : `<div class="input-group">
                        <input type="text" class="input-group" name="distance" id="distance" placeholder="Distance" required="">
                        <span class="input-group-addon">Mi</span>
                    </div>`
    }
}]);

/* Contains all the directives needed to show Reps and Sets.*/

cardioset.directive("npcardioset", ["$compile", function($compile){
    return {
        restrict : "A",
        replace : false,
        link : function(scope, element, attrs){
            element.on("change",function(){

                var myObj = JSON.parse(attrs["npcardioset"]);

                angular.element(element.parent().parent().find(".cardioContainer *")).remove();

                if(myObj["duration"]){
                    angular.element(element.parent().parent().parent().find("#setsContainer *")).remove();
                    angular.element(element.parent().parent().find(".cardioContainer")).append($compile("<npcardioduration></npcardioduration>")(scope));
                }

                if(myObj["distance"]){
                    angular.element(element.parent().parent().parent().find("#setsContainer *")).remove();
                    angular.element(element.parent().parent().find(".cardioContainer")).append($compile("<npcardiodistance></npcardiodistance>")(scope));
                }

            })

        }
    }
}]);