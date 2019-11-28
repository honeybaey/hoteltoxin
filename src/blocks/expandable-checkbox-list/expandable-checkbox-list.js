$(".expandable-checkbox_wrapper").each(function() {
  let expanded = false;
  let selectBox = document.querySelector(".select-box");

  function showCheckboxes() {
    let checkboxes = document.querySelector(".expandable-checkbox__items");
    if (!expanded) {
      checkboxes.style.display = "block";
      expanded = true;
    } else {
      checkboxes.style.display = "none";
      expanded = false;
    }
  }

  selectBox.onclick = showCheckboxes;
});
