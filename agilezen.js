// Minimal AgileZen mode to make the UI a little better

// DONE:
// Toggle details on stories (compressed view)
// add toggle backlog/archive (kbd C-c b/a)
// focus "jump to story" input (kbd "/")


// TODO:
// Add functions to hide/show blocked, ready stories
// Add story
// Add filter
// enhancements for pages other than "Board"?
// keyboard navigation?  Crazy?
// Home/Board/Work/Performance keybindings (h/b/w/p)
// Select project

define_keymap("agilezen_keymap", $display_name = "agilezen");

// When viewing story details, bold the current lane
register_user_stylesheet(
  "data:text/css,"+
    escape(
      "@-moz-document domain(agilezen.com) {"+
        "#progress a.current {"+
        "  font-weight: bold;" +
        "  text-decoration: underline;" +
        "}" +
        "}"));

// Remove all but story detail from the dashboard
az_minimize_css = "data:text/css,"+
  escape(
    "@-moz-document domain(agilezen.com) {"+
      ".story-section {display:none;}"+
      "body.board li.story.blocked div.story-blocked-marker {"+
      "  display:none!important;"+
      "}"+
      "body.board li.story.ready div.story-ready-marker {"+
      "  display:none!important;"+
      "}"+
      ".story-text {overflow:hidden; height:2em; text-overflow:ellipsis;}" +
      "}");

interactive(
  "agilezen-toggle-board-detail",
  "Toggles the size of the stories on the AZ dashboard. This will "+
    "hide all but one line of the description as well as everything "+
    "else.",
  function(I) {
    if( user_stylesheet_registered_p(az_minimize_css) ) {
      unregister_user_stylesheet(az_minimize_css);
    } else {
      register_user_stylesheet(az_minimize_css);
    }
  });

function agilezen_toggle_toggler(I, selector, err) {
  var buf = I.buffer;
  var elem = buf.document.querySelector(selector);
  if (elem) dom_node_click(elem, 1, 1);
}

interactive(
  "agilezen-toggle-board-backlog",
  "Toggles the visibility of the backlog on the Board page.",
  function(I) {
    agilezen_toggle_toggler(I, "div.ui-layout-toggler-west")
  });

interactive(
  "agilezen-toggle-board-archive",
  "Toggles the visibility of the archive on the Board page.",
  function(I) {
    agilezen_toggle_toggler(I, "div.ui-layout-toggler-east")
  });

interactive(
  "agilezen-focus-jump-box",
  "Put the browser focus on the 'Jump to Story #' box.",
  function(I) {
    var buf = I.buffer;
    var elem = buf.document.querySelector("#toolbar-right input");
    if (elem)
        browser_element_focus(buf, elem);
    else
        I.minibuffer.message("Jump to story box not found");
  });


define_key(agilezen_keymap, "C-c t", "agilezen-toggle-board-detail");
define_key(agilezen_keymap, "C-c b", "agilezen-toggle-board-backlog");
define_key(agilezen_keymap, "C-c a", "agilezen-toggle-board-archive");
define_key(agilezen_keymap, "/", "agilezen-focus-jump-box");

var agilezen_modality = {normal: agilezen_keymap};
define_page_mode(
  "agilezen_mode",
  $display_name = "AgileZen",
  $enable = function (buffer) {
    buffer.content_modalities.push(agilezen_modality);
  },
  $disable = function (buffer) {
    var i = buffer.content_modalities.indexOf(agilezen_modality);
    if (i > -1)
      buffer.content_modalities.splice(i, 1);
  });

auto_mode_list.push([
  build_url_regex($domain = /([a-zA-Z0-9\-]*\.)*agilezen/),
  agilezen_mode
]);

