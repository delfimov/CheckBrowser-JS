/*
 * checkBrowser-JS
 * Easy way to warn user about deprecated browser.
 *
 * https://github.com/Groozly/JS-Cookie
 *
 * Copyright (c) 2012 by Dmitry Elfimov
 * Released under the MIT License.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Date: 2012-11-09
 */
 
var checkBrowser = {
    
    config: {
        cookie: 'checkBrowser',
        
        css: 'css/checkbrowser.css',
        
        language: 'en',
        
        messages: {
            en: 'Your browser is out of date.<br /> It has known security flaws and may not display all features of this and and other sites. Please download and install a modern browser.', // english
            ru: 'Вы используете устаревший браузер.<br /> Чтобы обезопасить свой компьютер и использовать все возможности этого и других сайтов, установите современный браузер.' // russian
        },
        
        modern: {
            firefox: '10.0',
            chrome:  '12.0',
            opera:   '10.0',
            msie:    '9.0'
        },
        
        browsers: {
            firefox: {name: 'Mozilla Firefox',   link: 'http://www.mozilla.com/firefox'},
            chrome:  {name: 'Google Chrome',     link: 'http://www.google.com/chrome'},
            opera:   {name: 'Opera',             link: 'http://www.opera.com/browser/download/'},
            msie:    {name: 'Internet Explorer', link: 'http://www.microsoft.com/ie'}
        }
    },

    getText: function() {
        var out = ''; 
        out += '<div id="check-browser-warning">';
        out += '<div class="check-browser-message">' + this.config.messages[this.config.language] + '</div>'
        out += '<div class="check-browser-browsers">';
        for (var id in this.config.browsers) {
            out += '<a href="'+this.config.browsers[id].link+'" id="check-browser-'+id+'" class="check-browser-link">'+this.config.browsers[id].name+'</a>';
        }
        out += '</div>';
        out += '</div>';
        return out;
    },
    
    warning: function(config) {
        this.setLanguage();
        if (arguments.length > 0) {
            this.setConfig(config);
        }
        if (!this.isCookie()) {
            this.setCookie();
            if (this.isOld()) {
                this.addCSS();
                document.body.innerHTML = this.getText() + document.body.innerHTML;
            }
        }
    },
    
    setConfig: function(config) {
        for (var name in config) {
            if (typeof(this.config[name]) !== 'undefined') {
                this.config[name] = config[name];
            }
        }
    },
    
    setLanguage: function() {
        var language = window.navigator.userLanguage || window.navigator.language;
        if (typeof(language) !== 'undefined') {
            var pos = language.indexOf('-');
            if (pos < 0) {
                var pos = language.indexOf('_');
            }
            if (pos > 0) {
                language = language.slice(0, pos).toLowerCase();
                if (typeof(this.config.messages[language]) !== 'undefined') {
                    this.config.language = language;
                }
            }
        }
    },
    
    addCSS: function() {
        if (this.config.css) {
            var link  = document.createElement('link');
            link.rel  = 'stylesheet';
            link.type = 'text/css';
            link.media = 'all';
            link.href = this.config.css;
            document.getElementsByTagName('head')[0].appendChild(link);
        }
    },
    
    isOld: function() {
        var browser = this.getBrowser();
        if (typeof(this.config.modern[browser[0]]) !== 'undefined') {
            var thisVersion = browser[1].split('.'),
                modernVersion = this.config.modern[browser[0]].split('.');
            if (parseInt(thisVersion[0]) >= parseInt(modernVersion[0])) {
                if (typeof(thisVersion[1]) !== 'undefined' && parseInt(thisVersion[1]) >= parseInt(modernVersion[1])) {
                    return false;
                }
            }
            return true;
        } else {
            return false; // unknown browser, do not warn
        }
    },
    
    getBrowser: function() {
        var ua = navigator.userAgent;
        var browser = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
        if (browser != null) {
            var tmp = ua.match(/version\/([\.\d]+)/i);
            if (tmp != null) {
                browser[2] = tmp[1];
            }
        } else {
            browser = [navigator.appName, navigator.appVersion];
        }
        return [browser[1].toLowerCase(), browser[2]];
    },
    
    setCookie: function() {
        document.cookie = this.config.cookie + '=1;path=/;';
    },
    
    isCookie: function() {
        return document.cookie.indexOf(this.config.cookie + '=1') >= 0;
    }
    
    
}
