Reveal.addEventListener('ready', function(event){
  var print = window.location.search.match( /print-pdf/gi) ? true:false;
  var captions_aside = document.getElementsByClassName("slides")[0].hasAttribute("data-captions-aside");
  var remove_aside = document.getElementsByClassName("slides")[0].hasAttribute("data-remove-aside");
  var skip_types = document.getElementsByClassName("slides")[0].hasAttribute("data-skip-types");

  // Have types to skip?
  if (skip_types) {
    setAsideSkip(print);
  }

  // Not printing and want to hide captions?
  if (!print && captions_aside) {
    setAsideCaptions();
  }

  // Want to remove all aside tags?
  if (remove_aside) {
    setAsideRemoveAside();
  }

});

function setAsideSkip(is_print) {
  // Get the array of types to skip.
  skip_types = setAsideGetList(document.getElementsByClassName("slides")[0].getAttribute("data-skip-types"));

  if (is_print) {
    skip_types.push('print');
  }
  else {
    skip_types.push('present');
  }
  // Loop through each type.
  for (var type in skip_types) {
    setAsideFindAndRemove("[data-skip*='" + skip_types[type] + "']");
  }
}

function setAsideCaptions() {
  var caption = false;
  // Find all elements with class 'caption'
  while (caption = document.getElementsByClassName("caption")[0]) {
    // Turn into 'aside's.
    var text = document.createTextNode(caption.textContent);
    var aside = document.createElement('aside');
    aside.appendChild(text);
    aside.className += ' notes';
    caption.parentNode.replaceChild(aside, caption);
  }
}

function setAsideRemoveAside() {
  setAsideFindAndRemove("[class*='notes']");
}

function setAsideGetList(list_string) {
  var list = [];
  // Split on comma
  if (list_string.indexOf(',') > 0) {
    list = list_string.split(",");
  }
  else {
    // No seperator, assume it is just a single item.
    list = [list_string];
  }

  return list;
}

function setAsideFindAndRemove(query_pattern) {
  var matches = document.querySelectorAll(query_pattern);
  if (matches.length > 0) {
    var m = 0;
    for (m = 0; m < matches.length; m++) {
      matches[m].parentNode.removeChild(matches[m]);
    }
  }
}
