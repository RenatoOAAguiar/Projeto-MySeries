(function($) {
    $(function() {
        $('.modal').modal();
        $('.barralateral').sideNav('hide');
        $('.barralateral').sideNav({
            menuWidth: 300, // Default is 240
            edge: 'left', // Choose the horizontal origin
            closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
        });
        $('.collapsible').collapsible();
        $('#comentario').trigger('autoresize');
    }); // end of document ready
})(jQuery); // end of jQuery name space