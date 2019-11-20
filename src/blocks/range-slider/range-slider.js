$(document).ready(function() {
  let rangeSlider = document.getElementById('rangeSlider');
  let nonLinearStepSliderValueElement = document.getElementById('rangeSliderValues');

  noUiSlider.create(rangeSlider, {
    start: [0, 15],
    connect: true,
    range: {
        'min': 0,
        'max': 15
    },
    format: wNumb({
      decimals: 3,
      mark: ' ',
      suffix: '₽'
    })
  });

  rangeSlider.noUiSlider.on('update', function (values) {
    nonLinearStepSliderValueElement.innerHTML = values.join(' - ');
  });
})