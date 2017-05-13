(function($){
  $(function(){
    Materialize.updateTextFields();
    $('.barralateral').sideNav('hide');
    $('.barralateral').sideNav({
       menuWidth: 300, // Default is 240
       edge: 'left', // Choose the horizontal origin
       closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    $('.collapsible').collapsible();
    $('.carousel').carousel();
    window.setInterval(function(){$('.carousel').carousel('next')},5000)
  }); // end of document ready
})(jQuery); // end of jQuery name space