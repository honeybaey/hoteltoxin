import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.js';
// import 'item-quantity-dropdown/lib/item-quantity-dropdown.min.css';
import { getNoun } from '../../utils';

const showInitialSelection = function($dropdown) {
  $dropdown.find('.dropdown__selection').val($dropdown.data('initialSelection'));
};

const setValue = function($dropdown, itemName, itemCount) {
  $dropdown.find(`.dropdown__input[name=${itemName}]`).first().val(itemCount);
};


// If there is fields with same nouns, combine them
// Plugin uses data-id for counter, so I can't repeat them
const showSelection = function($dropdown) {
  const $inputs = $dropdown.find('.dropdown__input');
  const selectionData = {}; // nounsArray: count

  // Collect all values in case there will be identical nouns
  $inputs.each(function() {
    const $currentInput = $(this);
    const nounsKey = $currentInput.attr('data-nouns');
    let count = Number($currentInput.val());

    if (nounsKey in selectionData) { // Check if object already contains a value
      count += selectionData[nounsKey];
    }
    selectionData[nounsKey] = count;
  });

  const selection = [];
  for (let nounsStr in selectionData) {
    const count = selectionData[nounsStr];
    if (!count) continue; // Don't show item in selection if 0

    const noun = getNoun(count, ...JSON.parse(nounsStr)); // Get noun
    selection.push(`${count} ${noun}`);
  }

  $dropdown.find('.dropdown__selection').val(selection.join(', ')); // Set selection text
};

const resetSelection = function($dropdown) {
  $dropdown.find('.dropdown__input').val(0);
  showInitialSelection($dropdown);
};

$('.dropdown').each(function() {
  const $dropdown = $(this);
  const $controls = $('.dropdown__controls', $dropdown);
  const $dropMenu = $('.iqdropdown');
  const $counter = $('.counter');

  $('.iqdropdown', $dropdown).iqDropdown({
    onChange(itemName, itemCount, total) {
      setValue($dropdown, itemName, itemCount);
      showSelection($dropdown);

      if (total) {
        $('.dropdown__reset-btn', $dropdown).removeClass('hidden');
      } else {
        showInitialSelection($dropdown);
        $('.dropdown__reset-btn', $dropdown).addClass('hidden');
      }

      $controls.find('.dropdown__apply-btn').click(() => $dropMenu.removeClass('menu-open'));
    },
  });

  // Prevent close if controls is clicked (click handler in item-quantity-dropdown)
  $controls.click((e) => e.stopPropagation());

  $controls.find('.dropdown__reset-btn').click(() => resetSelection($dropdown));

  showInitialSelection($dropdown);
});
