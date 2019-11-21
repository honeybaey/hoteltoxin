import Chartist from 'chartist';
import { getNoun } from '../../utils';

$('.pie-chart').each(function() {
  const $ratingCircle = $(this);
  const $chartEl = $('.pie-chart__content', this);
  const $votes = $('.pie-chart__votes', this);

  const { greatVotes, goodVotes, okVotes, badVotes } = $ratingCircle.data();

  const chart = new Chartist.Pie($chartEl[0], {
    series: [greatVotes, goodVotes, okVotes, badVotes],
  }, {
    donut: true,
    donutWidth: 4,
    startAngle: 180,
    showLabel: false
  });

  chart.on('created', () => {
    let lastTarget; // debounce
    const $slices = $('.ct-slice-donut', $ratingCircle);
    const $labels = $('.pie-chart__item', $ratingCircle);

    const $greatSlice = $('.ct-series-a .ct-slice-donut', $ratingCircle);
    const $goodSlice = $('.ct-series-b .ct-slice-donut', $ratingCircle);
    const $okSlice = $('.ct-series-c .ct-slice-donut', $ratingCircle);
    const $badSlice = $('.ct-series-d .ct-slice-donut', $ratingCircle);

    // Save data for usage on hover
    $greatSlice.add('.pie-chart__item:nth-child(1)', $ratingCircle)
      .data('vote-type', 'great')
      .data('votes', greatVotes);
    $goodSlice.add('.pie-chart__item:nth-child(2)', $ratingCircle)
      .data('vote-type', 'good')
      .data('votes', goodVotes);
    $okSlice.add('.pie-chart__item:nth-child(3)', $ratingCircle)
      .data('vote-type', 'ok')
      .data('votes', okVotes);
    $badSlice.add('.pie-chart__item:nth-child(4)', $ratingCircle)
      .data('vote-type', 'bad')
      .data('votes', badVotes);

    const getTargetSlice = function(target) {
      const voteType = $(target).data('vote-type');

      return $slices.filter((idx, slice) => {
        return $(slice).data('voteType') === voteType;
      });
    };

    const colorVotes = function(target) {
      const $hoveredSlice = getTargetSlice(target);
      const color = $hoveredSlice.css('stroke');
      $votes.css('color', color);
    };

    const showVotesCount = function({ target }) {
      if (lastTarget === target) return;
      lastTarget = target;

      const votes = $(target).data('votes');

      $votes.find('.pie-chart__votes-count').text(votes);
      $votes.find('.pie-chart__votes-noun').text(getNoun(votes, 'голос', 'голоса', 'голосов'));

      colorVotes(target);
    };

    const hoveredMod = 'ct-slice-donut_hovered';

    const addHoveredMod = function({ target }) {
      const $hoveredSlice = getTargetSlice(target);
      $hoveredSlice.addClass(hoveredMod);
    };

    const removeHoveredMod = function({ target }) {
      const $hoveredSlice = getTargetSlice(target);
      $hoveredSlice.removeClass(hoveredMod);
    };

    $slices.mouseover(showVotesCount);
    $labels.mouseover(showVotesCount);
    $labels.hover(addHoveredMod, removeHoveredMod);
  });
});