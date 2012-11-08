/*
 * checkBrowser 
 * Easy way to warn user about deprecated browser.
 *
 * https://github.com/Groozly/JS-Cookie
 *
 * Copyright (c) 2012 by Dmitry Elfimov
 * Released under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 2012-11-08
 */
 
var checkBrowser = {
    
    cookieName: 'checkBrowser',
    
    cssFile: 'css/checkbrowser.css',
    
    // message: 'Вы используете устаревший браузер.<br /> Для того, чтобы использовать все возможности сайта, загрузите и установите один из современных браузеров: ', // russian
    message: 'Your browser is out of date.<br /> It has known security flaws and may not display all features of this and and other sites. Please download and install a modern browser.', // english
    
    browsers: {
        firefox: {name: 'Mozilla Firefox',   link: 'http://www.mozilla.com/firefox'},
        chrome:  {name: 'Google Chrome',     link: 'http://www.google.com/chrome'},
        opera:   {name: 'Opera',             link: 'http://www.opera.com/browser/download/'},
        msie:    {name: 'Internet Explorer', link: 'http://www.microsoft.com/ie'}
    },
    
    modernBrowsers: {
        firefox: '10.0',
        chrome:  '12.0',
        opera:   '10.0',
        msie:    '9.0',
    },
        
    warning: function() {
        if (!this.isCookie()) {
            this.setCookie();
            if (this.isOld()) {
                this.addCSS();
                document.body.innerHTML = this.getText() + document.body.innerHTML;
            } else {
                return '';
            }
        }
    },
    
    addCSS: function() {
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.media = 'all';
        link.href = this.cssFile;
        document.getElementsByTagName('head')[0].appendChild(link);
    },
    
    isOld: function() {
        var browser = this.getBrowser();
        if (this.modernBrowsers[browser[0]] != null) {
            var thisVersion = browser[1].split('.'),
                modernVersion = this.modernBrowsers[browser[0]].split('.');
            if (thisVersion[0] >= modernVersion[0]) {
                if (thisVersion[1] != null && thisVersion[1] >= modernVersion[1]) {
                    return false;
                }
            }
            return true;
        } else {
            return false; // unknown browser, do not warn
        }
    },
    
    getBrowser: function() {
        var tmp;
        var browser = navigator.userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (browser && (tmp = navigator.userAgent.match(/version\/([\.\d]+)/i)) != null) browser[2] = tmp[1];
        browser = browser ? [browser[1].toLowerCase(), browser[2]] : [navigator.appName.toLowerCase(), navigator.appVersion];
        return browser;
    },
    
    getText: function() {
        var out = ''; 
        out += '<div id="check-browser-warning">';
        out += '<div class="check-browser-message">' + this.message + '</div>'
        out += '<div class="check-browser-browsers">';
        for (var id in this.browsers) {
            out += '<a href="'+this.browsers[id].link+'" id="check-browser-'+id+'" class="check-browser-link">'+this.browsers[id].name+'</a>';
        }
        out += '</div>';
        out += '</div>';
        return out;
    },
    
    setCookie: function() {
        document.cookie = this.cookieName + '=1;path=/;';
    },
    
    isCookie: function() {
        var k = this.cookieName + '=';
        var c = document.cookie.split(';');
		for (var i = 0, l = c.length; i < l; i++) {
            c[i] = c[i].replace(/^\s+/,'');
			if (c[i].indexOf(k) === 0) {
				return c[i].substring(k.length) == '1';
			}
		}
        return false;
    }
    
    
}
