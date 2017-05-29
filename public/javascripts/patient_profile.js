"use strict";
$(document).ready(function(){
  var patientID = window.location.pathname.split('/')[2];
  $('#csv').click(function() {
    $.post('/export', { patientID: patientID }).done(function(csv) {
      downloadCSV(csv);
    });
  });

  function downloadCSV(csv) {
    var csvContent = "data:text/csv;charset=utf-8,";
    csvContent += csv;
    var encodedUri = encodeURI(csvContent);
    window.open(encodedUri);
  }

});