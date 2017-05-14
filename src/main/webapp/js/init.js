(function($){
  $(function(){
    $('.modal').modal();
    $('.barralateral').sideNav('hide');
    $('.barralateral').sideNav({
       menuWidth: 300, // Default is 240
       edge: 'left', // Choose the horizontal origin
       closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
    $('.collapsible').collapsible();
    $('.carousel').carousel({
      full_width: true,
      dist: 60
    });
    window.setInterval(function(){
      $('.carousel').carousel('next')
    },5000)
  }); // end of document ready
})(jQuery); // end of jQuery name space