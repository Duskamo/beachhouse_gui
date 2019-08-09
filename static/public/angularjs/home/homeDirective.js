//INTERACTION DIRECTIVE
app.directive( 'homeCard', function ( $compile ) {
  return {

    //only usable as an element, and get external html
    restrict: 'E',
    scope: { text: '@' },
    template: "",
    templateUrl: 'static/views/home.html'

    
  };
});
