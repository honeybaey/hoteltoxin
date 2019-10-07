let slider = document.getElementById('rangeSlider');

noUiSlider.create(slider, {
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

let nonLinearStepSliderValueElement = document.getElementById('rangeSliderValues');

slider.noUiSlider.on('update', function (values) {
    nonLinearStepSliderValueElement.innerHTML = values.join(' - ');
});