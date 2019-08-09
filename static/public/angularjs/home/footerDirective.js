//INTERACTION DIRECTIVE
app.directive( 'footerCard', function ( $compile ) {
  return {

    //only usable as an element, and get external html
    restrict: 'E',
    scope: { text: '@' },
    template: "",
    templateUrl: 'static/views/footer.html'

    
  };
});
