$('#date-dropdown').datepicker();
$('#date-dropdown_start').datepicker();
$('#date-dropdown_end').datepicker();

var applyButton = '<span class="datepicker--button datepicker--button__apply" data-action="hide">Применить</span>'; 
$('.datepicker--button[data-action="clear"]').each(function( index ) { $(applyButton).insertBefore($(this)); });

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