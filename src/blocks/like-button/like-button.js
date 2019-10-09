let elem = document.querySelector('.like-button__item');

elem.onclick = likeCounter;

function likeCounter() {
  document.querySelector('.like-button__count').classList.toggle('like-button__count_liked');
  this.classList.toggle('like-button__item_liked');
}

$(document).ready(function() {
  $('.like-button__item').on('click', function() {
      $('.like-button__count').html(function() {
        if (this.clicked == 'true') {
          this.clicked = 'false';
          this.innerHTML = parseInt(this.innerHTML) - 1;
        }
        else {
          this.clicked = 'true'
          this.innerHTML = parseInt(this.innerHTML) + 1;
        }
      });
  });
});