//INTERACTION DIRECTIVE
app.directive( 'overlayCard', function ( $compile ) {
  return {

    //only usable as an element, and get external html
    restrict: 'E',
    scope: { imgName: '@' },
    template: "",
    templateUrl: 'static/views/overlay.html',

    controller: function ( $scope, $element ) {

      var menu = $('.menu');

      $scope.toggleMenu = function() {
           menu.toggleClass("active");
      };

    }
  };
});
