//INTERACTION DIRECTIVE
app.directive( 'menuCard', function ( $compile ) {
  return {

    //only usable as an element, and get external html
    restrict: 'E',
    scope: { text: '@' },
    template: "",
    templateUrl: 'static/views/menu.html'

    
  };
});
