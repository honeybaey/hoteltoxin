import 'slick-carousel';

$('.room-card__carousel').slick({
  dots: true,
  infinite: false,
  arrows: false
});

$('.room-card__link').click((e) => {
  const clickOnDots = $('.slick-dots', e.currentTarget).find(e.target).length > 0;

  if (clickOnDots) {
    e.preventDefault();
  }
});