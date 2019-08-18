$(document).ready(function(){
  $('input[name="date"]').mask('00.00.0000', {placeholder: "ДД.ММ.ГГГГ"});
  $('#time').mask('00:00:00');
  $('#date_time').mask('00/00/0000 00:00:00');
  $('#phone').mask('+ 7 (000) 000-0000');
});