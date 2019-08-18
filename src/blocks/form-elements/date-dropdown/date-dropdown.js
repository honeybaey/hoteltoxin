$('#date-dropdown_start').datepicker();
$('#date-dropdown_end').datepicker();

var okButton = '<span class="datepicker--button" data-action="hide">ПРИМЕНИТЬ</span>'; 
$('.datepicker--button[data-action="clear"]').each(function( index ) { $(okButton).insertBefore($(this)); });

/* var $start = $('#start'),
    $end = $('#end');

$start.datepicker({
    onSelect: function (fd, date) {
        $end.data('datepicker')
                .update('minDate', date);

        $end.focus();
    }
})

$end.datepicker({
    onSelect: function (fd, date) {
        $start.data('datepicker')
                .update('maxDate', date)
    }
}) */