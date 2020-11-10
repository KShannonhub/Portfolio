var app = angular.module('app', ['ngAnimate'])

app.controller('mainCtrl', function($scope) {
    $scope.boxes = [{
        name: 'MVC',
        image: 'img/mvc.jpg',
        image2: 'img/mvc.gif',
        heading:'MVC Entity Framework',
        message:'Here I cloned a website and converted it into an MVC website using Code First migration with Entity Framework.'
    },{
        name: 'CSharp',
        image: 'img/csharp.png',
        image2: 'img/crackcode.gif',
        heading:'CSharp',
        message:'Here is an example of a C# ASP project using .Net Framework.'
    }, {
        name: 'Script',
        image: 'img/javascript.png',
        image2: 'img/keyboard.gif',
        heading:'Script',
        message:'Here is an example of using HTML, CSS, Javascript and JQuery to create a fully customized on screen keyboard.'
    }, {
        name: 'Thrill',
        image: 'img/adobe.png',
        image2: 'img/Slot.gif',
        heading:'This is Thrill',
        message:'Here is an example of implementing a wide array of Abobe Suite applications to achieve a Slot Machine like animation.'
    }, ];

    $scope.selected = [];
    $scope.selectBox = function(item, position) {
      
        $scope.selected = [{
            item: item,
            position: position
        }];
        $scope.$apply();
    }
    $scope.clearSelection = function() {
        $scope.selected = [];
    }
})

app.directive('box', function() {
    return {
        restrict: 'E',
        scope: {},
        bindToController: {
            onSelect: "=",
            item: "="
        },
        controllerAs: 'box',
        controller: function() {
            var box = this;
           
            box.goFullscreen = function(e) {
                box.onSelect(box.item, e.target.getBoundingClientRect())
                
            }
        },
        link: function(scope, element) {
         
            element.bind('click', scope.box.goFullscreen)
            element.css({
                'background-image': 'url(' + scope.box.item.image + ')'
            })
           
        }
    }
})

app.directive('bigBox', function($timeout) {
    return {
        restrict: 'AE',
        scope: {},
        bindToController: {
            position: "=",
            selected: "=",
            onSelect: "="
        },
        controllerAs: 'box',
        controller: function() {
            var box = this;
        },
        link: function(scope, element) {
            var css = {}
            for (var key in scope.box.position) {
                css[key] = scope.box.position[key] + 'px';
                
            }
           
            element.css(css);
           
            
            $timeout(function() {
                element.css({
                    top: '80%',
                    left: '10%'
                })
                element.addClass('image-out');
            }, 200)

            $timeout(function() {
                element.css({
                    width: '80%',
                    height: '5vw'
                })
            }, 500)
            
            $timeout(function(){
                element.addClass('show');
            }, 800)

          
            $timeout(function(){
                element.addClass('Unshow');
            }, 6000)
        }
    }
})