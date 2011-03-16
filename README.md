# AgileZen Page Mode

AgileZen Page Mode is an add on to the Conkeror web browser that makes
using AgileZen a little less more keyboard friendly.  It also adds a
few extra tweaks that I've found useful.

There is not too much here at the moment, but it's at a point that is
worth sharing.

## Installation

Add the following to your .conkerorrc file, or to a file in your
.conkerorrc directory:

> require("path/to/agilezen.js");

## Usage

When on AgileZen.com the following keys become available:

* "C-c t" : Toggles the size of the stories on the AZ
  dashboard. This will hide all but one line of the description as
  well as everything else.
* "C-c b" : Toggles the visibility of the backlog on the Board page.
* "C-c a" : Toggles the visibility of the archive on the Board page.
* "/" : Put the browser focus on the 'Jump to Story #' box.

## TODO

Just a list of random ideas that could make this better.  Typically
items I run into more often will get implemented first.

* Add functions to hide/show blocked (C-c l), ready stories (C-c r)
* Enhancements for pages other than "Board"
* Keyboard navigation for stories? Crazy?
* Home/Board/Work/Performance keybindings (h/b/w/p)
* Select project
* Add story from kbd
* Add filter from kbd

## License

Distributed under the Mozilla Public License.  See the COPYING file
for details.
