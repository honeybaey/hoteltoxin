$('#date-dropdown').datepicker();

var okButton = '<span class="datepicker--button" data-action="hide">ПРИМЕНИТЬ</span>'; 
$('.datepicker--button[data-action="clear"]').each(function( index ) { $(okButton).insertBefore($(this)); });
