// start video
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(function() {
    const showreelvideo = document.getElementById('showreel__video');
    if(showreelvideo){
      showreelvideo.pause();
      showreelvideo.currentTime = 0;
      document.querySelector('.showreel__button').onclick = function(e) {
        e.preventDefault();
        document.querySelector('.showreel__modal').classList.add('showreel__modal_visible');
        document.querySelector('.spec__overlay').classList.add('is-playing');
        showreelvideo.play();
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
        var t;
        window.addEventListener('mousemove', () => {
          if (t) {
            document.querySelector('.showreel__modal').classList.remove('hide')
            clearTimeout(t)
            t = 0
          }
          t = setTimeout(() => document.querySelector('.showreel__modal').classList.add('hide'), 1500)
        });
        const progress = document.querySelector('.progress');
        const progressLine = document.querySelector('.progress__line');
        progress.addEventListener('mousemove', (e) => {
          progressLine.style.left = e.offsetX + 'px';
        });
      }
      document.querySelector('.showreel__modal_close').onclick = function() {
        document.querySelector('.spec__overlay').classList.remove('is-playing');
        document.querySelector('.showreel__modal').classList.remove('showreel__modal_visible');
        showreelvideo.pause();
        showreelvideo.currentTime = 0;
        document.body.style.overflow = null;
        document.body.style.height = null;
      }
    }
    (function () {
      // helpers
      var regExp = function regExp(name) {
          return new RegExp('(^| )' + name + '( |$)');
      };
      var forEach = function forEach(list, fn, scope) {
          for (var i = 0; i < list.length; i++) {
              fn.call(scope, list[i]);
          }
      };
      // class list object with basic methods
      function ClassList(element) {
          this.element = element;
      }
      ClassList.prototype = {
          add: function add() {
              forEach(arguments, function (name) {
                  if (!this.contains(name)) {
                      this.element.className += ' ' + name;
                  }
              }, this);
          },
          remove: function remove() {
              forEach(arguments, function (name) {
                  this.element.className = this.element.className.replace(regExp(name), '');
              }, this);
          },
          toggle: function toggle(name) {
              return this.contains(name) ? (this.remove(name), false) : (this.add(name), true);
          },
          contains: function contains(name) {
              return regExp(name).test(this.element.className);
          },
          // bonus..
          replace: function replace(oldName, newName) {
              this.remove(oldName), this.add(newName);
          }
      };
      // IE8/9, Safari
      if (!('classList' in Element.prototype)) {
          Object.defineProperty(Element.prototype, 'classList', {
              get: function get() {
                  return new ClassList(this);
              }
          });
      }
      // replace() support for others
      if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
          DOMTokenList.prototype.replace = ClassList.prototype.replace;
      }
    })();
    (function () {
      if (typeof NodeList.prototype.forEach === "function") return false;
      NodeList.prototype.forEach = Array.prototype.forEach;
    })();
    // Unfortunately, due to scattered support, browser sniffing is required
    function browserSniff() {
      var nVer = navigator.appVersion,
          nAgt = navigator.userAgent,
          browserName = navigator.appName,
          fullVersion = '' + parseFloat(navigator.appVersion),
          majorVersion = parseInt(navigator.appVersion, 10),
          nameOffset,
          verOffset,
          ix;
      // MSIE 11
      if (navigator.appVersion.indexOf("Windows NT") !== -1 && navigator.appVersion.indexOf("rv:11") !== -1) {
          browserName = "IE";
          fullVersion = "11;";
      }
      // MSIE
      else if ((verOffset = nAgt.indexOf("MSIE")) !== -1) {
              browserName = "IE";
              fullVersion = nAgt.substring(verOffset + 5);
          }
          // Chrome
          else if ((verOffset = nAgt.indexOf("Chrome")) !== -1) {
                  browserName = "Chrome";
                  fullVersion = nAgt.substring(verOffset + 7);
              }
              // Safari
              else if ((verOffset = nAgt.indexOf("Safari")) !== -1) {
                      browserName = "Safari";
                      fullVersion = nAgt.substring(verOffset + 7);
                      if ((verOffset = nAgt.indexOf("Version")) !== -1) {
                          fullVersion = nAgt.substring(verOffset + 8);
                      }
                  }
                  // Firefox
                  else if ((verOffset = nAgt.indexOf("Firefox")) !== -1) {
                          browserName = "Firefox";
                          fullVersion = nAgt.substring(verOffset + 8);
                      }
                      // In most other browsers, "name/version" is at the end of userAgent
                      else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
                              browserName = nAgt.substring(nameOffset, verOffset);
                              fullVersion = nAgt.substring(verOffset + 1);
                              if (browserName.toLowerCase() == browserName.toUpperCase()) {
                                  browserName = navigator.appName;
                              }
                          }
      // Trim the fullVersion string at semicolon/space if present
      if ((ix = fullVersion.indexOf(";")) !== -1) {
          fullVersion = fullVersion.substring(0, ix);
      }
      if ((ix = fullVersion.indexOf(" ")) !== -1) {
          fullVersion = fullVersion.substring(0, ix);
      }
      majorVersion = parseInt('' + fullVersion, 10);
      if (isNaN(majorVersion)) {
          fullVersion = '' + parseFloat(navigator.appVersion);
          majorVersion = parseInt(navigator.appVersion, 10);
      }
      return [browserName, majorVersion];
    }
    
    var obj = {};
    obj.browserInfo = browserSniff();
    obj.browserName = obj.browserInfo[0];
    obj.browserVersion = obj.browserInfo[1];
    
    wrapPlayers();
    var players = document.querySelectorAll('.spec__player');
    var iconPlay = '<i class="spec-play"></i>';
    var iconPause = '<i class="spec-pause"></i>';
    var iconVolumeMute = '<i class="spec-volume-mute"></i>';
    var iconVolumeMedium = '<i class="spec-volume-medium"></i>';
    var iconVolumeLow = '<i class="spec-volume-low"></i>';
    var iconExpand = '<i class="spec-expand"></i>';
    var iconCompress = '<i class="spec-compress"></i>';
    
    players.forEach(function (player) {
      var videos = player.querySelector('.showreel__video_responsive video');
      var skin = attachSkin(videos.dataset.spec);
      player.classList.add(skin);
      var overlay = videos.dataset.overlay;
      addOverlay(player, overlay);
      var title = showTitle(skin, videos.dataset.title);
      if (title) {
          player.insertAdjacentHTML('beforeend', title);
      }
      var html = buildControls(skin);
      player.insertAdjacentHTML('beforeend', html);
      var color = videos.dataset.color;
      addColor(player, color);
      var playerControls = player.querySelector('.' + skin + '__controls');
      var progress = player.querySelector('.progress');
      var progressBar = player.querySelector('.progress__filled');
      var toggle = player.querySelectorAll('.toggle');
      var volumeButton = player.querySelector('.volume');
      var fullScreenButton = player.querySelector('.fullscreen');
      if (obj.browserName === "IE" && (obj.browserVersion === 8 || obj.browserVersion === 9)) {
          showControls(videos);
          playerControls.style.display = "none";
      }
      videos.addEventListener('click', function () {
          togglePlay(this, player);
      });
      videos.addEventListener('play', function () {
          updateButton(this, toggle);
      });
      videos.addEventListener('pause', function () {
          updateButton(this, toggle);
      });
      videos.addEventListener('timeupdate', function () {
          handleProgress(this, progressBar);
      });
      toggle.forEach(function (button) {
          return button.addEventListener('click', function () {
              togglePlay(videos, player);
          });
      });
      volumeButton.addEventListener('click', function () {
          toggleVolume(videos, volumeButton);
      });
      var mousedown = false;
      progress.addEventListener('click', function (e) {
          scrub(e, videos, progress);
      });
      progress.addEventListener('mousemove', function (e) {
          return mousedown && scrub(e, videos, progress);
      });
      progress.addEventListener('mousedown', function () {
          return mousedown = true;
      });
      progress.addEventListener('mouseup', function () {
          return mousedown = false;
      });
      fullScreenButton.addEventListener('click', function (e) {
          return toggleFullScreen(player, fullScreenButton);
      });
      addListenerMulti(player, 'webkitfullscreenchange mozfullscreenchange fullscreenchange MSFullscreenChange', function (e) {
          return onFullScreen(e, player);
      });
    });
    function showControls(videon) {
      videon.setAttribute("controls", "controls");
    }
    function togglePlay(videon, player) {
      var method = videon.paused ? 'play' : 'pause';
      videon[method]();
      videon.paused ? player.classList.remove('is-playing') : player.classList.add('is-playing');
    }
    function updateButton(videon, toggle) {
      var icon = videon.paused ? iconPlay : iconPause;
      toggle.forEach(function (button) {
          return button.innerHTML = icon;
      });
      const progress = document.querySelector('.progress');
      const progress__time = document.getElementById("progress__time");
      progress.addEventListener('mousemove', (e) => {
        var thours = Math.floor((e.offsetX / progress.offsetWidth * videon.duration) / 60 / 60);
        var tminutes = Math.floor((e.offsetX / progress.offsetWidth * videon.duration) / 60) - (thours * 60);
        var tseconds = Math.floor((e.offsetX / progress.offsetWidth * videon.duration) % 60);
        progress__time.innerHTML = [tminutes,tseconds.toString().padStart(2, '0')].join(':');
      });
      var dhours = Math.floor(videon.duration / 60 / 60);
      var dminutes = Math.floor(videon.duration / 60) - (dhours * 60);
      var dseconds = Math.floor(videon.duration % 60);
      progress__duration.innerHTML = [dminutes,dseconds.toString().padStart(2, '0')].join(':');
    }
    function skip() {
      videon.currentTime += parseFloat(this.dataset.skip);
    }
    function toggleVolume(videon, volumeButton) {
      var level = videon.volume;
      var icon = iconVolumeMedium;
      if (level == 1) {
          level = 0;
          icon = iconVolumeMute;
      } else if (level == 0.5) {
          level = 1;
          icon = iconVolumeMedium;
      } else {
          level = 0.5;
          icon = iconVolumeLow;
      }
      videon['volume'] = level;
      volumeButton.innerHTML = icon;
    }
    function handleRangeUpdate() {
      videon[this.name] = this.value;
    }
    function handleProgress(videon, progressBar) {
      var percent = videon.currentTime / videon.duration * 100;
      progressBar.style.flexBasis = percent + '%';
      progress__duration = document.getElementById("progress__duration");
      progress__currenttime = document.getElementById("progress__currenttime");
      var chours = Math.floor(videon.currentTime / 60 / 60);
      var cminutes = Math.floor(videon.currentTime / 60) - (chours * 60);
      var cseconds = Math.floor(videon.currentTime % 60);
      progress__currenttime.innerHTML = [cminutes,cseconds.toString().padStart(2, '0')].join(':');
    }
    function scrub(e, videon, progress) {
      var scrubTime = e.offsetX / progress.offsetWidth * videon.duration;
      videon.currentTime = scrubTime;
    }
    function wrapPlayers() {
      var videol = document.querySelectorAll('.showreel__video_responsive video');
      videol.forEach(function (videon) {
          var wrapper = document.createElement('div');
          wrapper.classList.add('spec__player');
          videon.parentNode.insertBefore(wrapper, videon);
          wrapper.appendChild(videon);
      });
    }
    Number.prototype.lead0 = function(n) {
      var nz = "" + this;
      while (nz.length < n) {
          nz = "0" + nz;
      }
      return nz;
    };
    function buildControls(skin) {
      var html = [];
      html.push('<button class="' + skin + '__button--big toggle">' + iconPlay + '</button>');
      html.push('<div class="' + skin + '__border"></div>');
      html.push('<div class="' + skin + '__controls spec__controls">');
      html.push('<button class="' + skin + '__button toggle">' + iconPlay + '</button>', '<div class="progress">', '<div class="progress__filled"></div>', '<div class="progress__line"><p id="progress__time"></p></div>', '<p id="progress__duration"></p>', '<p id="progress__currenttime"></p>', '</div>', '<button class="' + skin + '__button volume">' + iconVolumeMedium + '</button>', '<button class="' + skin + '__button fullscreen" title="Full Screen">' + iconExpand + '</button>');
      html.push('</div>');
      return html.join('');
    }
    function attachSkin(skin) {
      if (typeof skin != 'undefined' && skin != '') {
          return skin;
      } else {
          return 'spec';
      }
    }
    function showTitle(skin, title) {
      if (typeof title != 'undefined' && title != '') {
          return '<div class="' + skin + '__title">' + title + '</div>';
      } else {
          return false;
      }
    }
    function addOverlay(player, overlay) {
      if (overlay == 1) {
          player.classList.add('spec__overlay');
      } else if (overlay == 2) {
          player.classList.add('spec__overlay--2');
      } else {
          return;
      }
    }
    function addColor(player, color) {
      if (typeof color != 'undefined' && color != '') {
          var buttons = player.querySelectorAll('button');
          var progress = player.querySelector('.progress__filled');
          progress.style.background = color;
          buttons.forEach(function (button) {
              return button.style.color = color;
          });
      }
    }
    function toggleFullScreen(player, fullScreenButton) {
      // let isFullscreen = false;
      if (!document.fullscreenElement && // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
          player.classList.add('spec__fullscreen');
    
          if (player.requestFullscreen) {
              player.requestFullscreen();
          } else if (player.mozRequestFullScreen) {
              player.mozRequestFullScreen(); // Firefox
          } else if (player.webkitRequestFullscreen) {
              player.webkitRequestFullscreen(); // Chrome and Safari
          } else if (player.msRequestFullscreen) {
              player.msRequestFullscreen();
          }
          isFullscreen = true;
    
          fullScreenButton.innerHTML = iconCompress;
      } else {
          player.classList.remove('spec__fullscreen');
    
          if (document.cancelFullScreen) {
              document.cancelFullScreen();
          } else if (document.mozCancelFullScreen) {
              document.mozCancelFullScreen();
          } else if (document.webkitCancelFullScreen) {
              document.webkitCancelFullScreen();
          } else if (document.msExitFullscreen) {
              document.msExitFullscreen();
          }
          isFullscreen = false;
          fullScreenButton.innerHTML = iconExpand;
      }
    }
    
    function onFullScreen(e, player) {
      var isFullscreenNow = document.webkitFullscreenElement !== null;
      if (!isFullscreenNow) {
          player.classList.remove('spec__fullscreen');
          player.querySelector('.fullscreen').innerHTML = iconExpand;
      } else {
          // player.querySelector('.fullscreen').innerHTML = iconExpand;
      }
    }
    
    function addListenerMulti(element, eventNames, listener) {
      var events = eventNames.split(' ');
      for (var i = 0, iLen = events.length; i < iLen; i++) {
          element.addEventListener(events[i], listener, false);
      }
    }
  }, 1);
});
// end video