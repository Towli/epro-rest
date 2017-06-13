"use strict";
$(document).ready(function(){
  var toggled = false;

  $('.sidebar-overlay').on('click',function() {             
    $(".sidebar-overlay").hide(200);
  });

  $(window).resize(function(){
    $(".sidebar-overlay").hide();
  });

  $('.navbar-toggle').on('click',function(){   
      $(".sidebar-overlay").show(200);
  })

});