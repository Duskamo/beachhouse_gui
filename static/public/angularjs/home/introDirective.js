//INTERACTION DIRECTIVE
app.directive( 'introCard', function ( $compile ) {
  return {

    //only usable as an element, and get external html
    restrict: 'E',
    scope: { text: '@' },
    template: "",
    templateUrl: 'static/views/intro.html'

    
  };
});
