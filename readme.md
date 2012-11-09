checkBrowser-JS
===============

An easy way to warn user about deprecated browser.


Usage
-----
* Insert checkbrowser.js (<code>&lt;script src="checkbrowser.js"&gt;&lt;/script&gt;</code>)
* Call checkBrowser.warning() after page load (<code>window.onload = function() { checkBrowser.warning(); }</code>)


Features
--------
* Unobtrusive (shows message once per visit)
* Browser detection (<code>checkBrowser.getBrowser()</code> returns an array with browser name and version)
* Multilanguage (with automatic user language detection)
* Customizable (modify css/checkbrowser.css)


Optional
--------
* Modify styles in checkbrowser.css
* Spicify config in checkBrowser.warning() (<code>window.onload = function() { checkBrowser.warning({language:'en', css:'css/checkbrowser.css'}); }</code>)
* Modify defaults in checkbrowser.js


Config options
--------------
* cookie — cookie name
* css — path to css file
* language — user language
* messages — warning messages array
* modern — modern browsers
* browsers — show this browsers in warning


License
-------
* Copyright (c) 2012 by Dmitry Elfimov
* Released under the MIT License.
* http://www.opensource.org/licenses/mit-license.php
