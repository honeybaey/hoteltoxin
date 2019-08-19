$(document).ready(() => {
  $('.iqdropdown').iqDropdown({});
});

/* function num2str(n, text_forms) {  
  n = Math.abs(n) % 100; var n1 = n % 10;
  if (n > 10 && n < 20) { return text_forms[2]; }
  if (n1 > 1 && n1 < 5) { return text_forms[1]; }
  if (n1 == 1) { return text_forms[0]; }
  return text_forms[2];
}

$('#item1').html('1 '+num2str(1, ['минута', 'минуты', 'минут']));
$('#item2').html('2 '+num2str(2, ['минута', 'минуты', 'минут']));
$('#item3').html('5 '+num2str(5, ['минута', 'минуты', 'минут']));

$('.iqdropdown').on('change',function(){
  val = num2str($(this).val(), ['гость', 'гостя', 'гостей']);
  $('.item1').text(val);
}); */  // склонение счетчика