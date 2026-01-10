(function ($) {
    "use strict";

    //PRELOADER START
    
    $(document).ready(function() {
    
        setTimeout(function () {
            $('.preloader').addClass('loaded');
            // $('body').removeClass('no-scroll-y');

            if ($('.preloader').hasClass('loaded')) {
                $('.pl').delay(500).fadeOut('xslow').queue(function () {
                    $(this).remove();
                });
                $('.preloader').delay(1200).fadeOut('xslow').queue(function () {
                    $(this).remove();
                });
            }
        }, 3200);

    });

    //PRELOADER END

    //Page cursors hover-target
    // document.getElementsByTagName("body")[0].addEventListener("mousemove", function (n) {
    //     t.style.left = n.clientX + "px",
    //         t.style.top = n.clientY + "px",
    //         e.style.left = n.clientX + "px",
    //         e.style.top = n.clientY + "px",
    //         i.style.left = n.clientX + "px",
    //         i.style.top = n.clientY + "px";
    // });
    // var t = document.getElementById("cursor"),
    //     e = document.getElementById("cursor2"),
    //     i = document.getElementById("cursor3");
    // function n(t) {
    //     e.classList.add("hover"), i.classList.add("hover");
    // }
    // function s(t) {
    //     e.classList.remove("hover"), i.classList.remove("hover");
    // }
    // s();
    // for (var r = document.querySelectorAll(".hover-target"), a = r.length - 1; a >= 0; a--) {
    //     if (window.CP.shouldStopExecution(0)) break;
    //     o(r[a]);
    // } window.CP.exitedLoop(0);
    // function o(t) {
    //     t.addEventListener("mouseover", n), t.addEventListener("mouseout", s);
    // }


    //About page

    $(".about-text").on('click', function () {
        $("body").addClass("about-on");
    });
    $(".about-close").on('click', function () {
        $("body").removeClass("about-on");
    });


    //TBD

    $(".contact-text").on('click', function () {
        $("body").addClass("contact-on");
    });
    $(".contact-close").on('click', function () {
        $("body").removeClass("contact-on");
    });


    //video section

    $(".video").on('click', function () {
        $("body").addClass("video-on");
    });
    $(".video-close").on('click', function () {
        $("body").removeClass("video-on");
    });


    //TBD

    $(".services").on('click', function () {
        $("body").addClass("services-on");
    });
    $(".services-close").on('click', function () {
        $("body").removeClass("services-on");
    });


    //audio section

    $(".audio").on('click', function () {
        $("body").addClass("audio-on");
    });
    $(".audio-close").on('click', function () {
        $("body").removeClass("audio-on");
    });


})(jQuery);



// EXPAND MENU START
class expand {
    constructor() {
        this._el = document.querySelector('.js-expand');
        this._elInner = this._el.querySelector('.js-expand-inner');
        this._elInnerInverter = this._el.querySelector('.js-expand-inner-inverter');
        this._expandBtn = this._el.querySelector('.js-expand-expand-btn');
        this._collapseBtn = this._el.querySelector('.js-expand-collapse-btn');
        this._content = this._el.querySelector('.js-content');

        this.toggle = this.toggle.bind(this);
        this.expand = this.expand.bind(this);
        this.collapse = this.collapse.bind(this);

        this._calculate();
        this._createEaseAnimations();

        this._expandBtn.addEventListener('click', this.expand);
        this._collapseBtn.addEventListener('click', this.collapse);
    }

    expand() {
        if (this._isExpanded) {
            return;
        }
        this._isExpanded = true;
        this._applyAnimation({ expand: true });
    }

    collapse() {
        if (!this._isExpanded) {
            return;
        }
        this._isExpanded = false;
        this._applyAnimation({ expand: false });
    }

    toggle() {
        if (this._isExpanded) {
            return this.collapse();
        }

        this.expand();
    }

    _applyAnimation({ expand } = opts) {
        this._elInner.classList.remove('item--expanded');
        this._elInner.classList.remove('item--collapsed');
        this._elInnerInverter.classList.remove('item__contents--expanded');
        this._elInnerInverter.classList.remove('item__contents--collapsed');

        // Force a recalc styles here so the classes take hold.
        window.getComputedStyle(this._elInner).transform;

        if (expand) {
            this._elInner.classList.add('item--expanded');
            this._elInnerInverter.classList.add('item__contents--expanded');
            return;
        }

        this._elInner.classList.add('item--collapsed');
        this._elInnerInverter.classList.add('item__contents--collapsed');
    }

    _calculate() {
        const elBCR = this._el.getBoundingClientRect();
        const collapsed = this._expandBtn.getBoundingClientRect();
        const expanded = this._content.getBoundingClientRect();

        const expandedWidth = Math.abs(expanded.right - elBCR.left);
        const expandedHeight = Math.abs(expanded.bottom - elBCR.top);

        const collapsedWidth = collapsed.width;
        const collapsedHeight = collapsed.height;

        const exRadius = Math.sqrt(expandedWidth * expandedWidth +
            expandedHeight * expandedHeight);
        const colRadius = collapsedWidth * 0.5;

        this._scale = (exRadius - colRadius) / colRadius;

        // Set initial sizes.
        this._el.style.width = `${expandedWidth}px`;
        this._el.style.height = `${expandedHeight}px`;

        this._elInner.style.width = `${collapsedWidth}px`;
        this._elInner.style.height = `${collapsedHeight}px`;

        this._elInner.style.transformOrigin =
            `${collapsedWidth * 0.5}px ${collapsedHeight * 0.5}px`;
        this._elInnerInverter.style.transformOrigin =
            `${collapsedWidth * 0.5}px ${collapsedHeight * 0.5}px`;

    }

    _createEaseAnimations() {
        let ease = document.querySelector('.ease');
        if (ease) {
            return ease;
        }

        ease = document.createElement('style');
        ease.classList.add('ease');

        const expandAnimation = [];
        const expandContentsAnimation = [];
        const expandCircleAnimation = [];
        const collapseAnimation = [];
        const collapseContentsAnimation = [];
        const collapseCircleAnimation = [];
        for (let i = 0; i <= 100; i++) {
            if (window.CP.shouldStopExecution(0)) break;
            const step = this._ease(i / 100);

            // Expand animation.
            this._append({
                i,
                step,
                start: 1,
                end: this._scale,
                outerAnimation: expandAnimation,
                innerAnimation: expandContentsAnimation
            });


            // Collapse animation.
            this._append({
                i,
                step,
                start: this._scale,
                end: 1,
                outerAnimation: collapseAnimation,
                innerAnimation: collapseContentsAnimation
            });

        } window.CP.exitedLoop(0);

        ease.textContent = `@keyframes expandAnimation {
                ${expandAnimation.join('')}
        }
        @keyframes expandContentsAnimation {
               ${expandContentsAnimation.join('')}
        }
        @keyframes collapseAnimation {
               ${collapseAnimation.join('')}
        }
        @keyframes collapseContentsAnimation {
               ${collapseContentsAnimation.join('')}
        }`;

        document.head.appendChild(ease);
        return ease;
    }

    _append({
        i,
        step,
        start,
        end,
        outerAnimation,
        innerAnimation } = opts) {

        const scale = start + (end - start) * step;
        const invScale = 1 / scale;

        outerAnimation.push(`
${i}% {
transform: scale(${scale});
}`);

        innerAnimation.push(`
${i}% {
transform: scale(${invScale});
}`);
    }

    _clamp(value, min, max) {
        return Math.max(min, Math.min(max, value));
    }

    _ease(v, pow = 4) {
        v = this._clamp(v, 0, 1);

        return 1 - Math.pow(1 - v, pow);
    }
}


new expand();
// EXPAND MENU END

// SIDE BAR START - INCLUDING DONATE, INSTAGRAM, AND YOUTUBE
// Get all menu from document
document.querySelectorAll(".buttonTrigger").forEach(OpenMenu);

// Menu Open and Close function
function OpenMenu(active) {
    if (active.classList.contains("buttonTrigger") === true) {
        active.addEventListener("click", function (e) {
            e.preventDefault();
            this.parentElement.classList.toggle("active");
            this.classList.toggle("active");
        });
    }
}
// SIDE BAR END - INCLUDING DONATE, INSTAGRAM, AND YOUTUBE

// MAIN VIDEO CONTENT START
document.addEventListener('DOMContentLoaded', () => {
    const platformTabs = document.querySelectorAll('.hr-tab');
    platformTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            platformTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.hr-tab-content').forEach(c => c.classList.remove('active'));
            document.querySelector(`.hr-tab-content[data-tab-content="${tab.getAttribute('data-tab')}"]`).classList.add('active');
        });
    });

    document.addEventListener('click', e => {
        const item = e.target.closest('.hr-video-item');
        if (item) {
            const platform = item.closest('.hr-video-platform');
            platform.querySelectorAll('.hr-video-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const id = item.dataset.videoId;

            platform.querySelector('iframe').src = `https://www.youtube.com/embed/${id}&rel=0`;
            platform.querySelector('.hr-video-info-title').textContent = item.dataset.title;
            platform.querySelector('.hr-inner-tab-content[data-tab-content="talk"] .hr-video-description').textContent = item.dataset.description;
            platform.querySelector('.hr-inner-tab-content[data-tab-content="speakers"] .hr-video-speakers').innerHTML = item.dataset.speakers;
            platform.querySelectorAll('.hr-content-tab').forEach(t => t.classList.remove('active'));
            const talkTab = platform.querySelector('.hr-content-tab[data-tab="talk"]');
            talkTab.classList.add('active');
            platform.querySelectorAll('.hr-inner-tab-content').forEach(c => c.classList.remove('active'));
            platform.querySelector('.hr-inner-tab-content[data-tab-content="talk"]').classList.add('active');
            if (window.innerWidth < 992) platform.querySelector('.hr-video-main').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }

        const innerTab = e.target.closest('.hr-content-tab');
        if (innerTab) {
            const info = innerTab.closest('.hr-video-info');
            info.querySelectorAll('.hr-content-tab').forEach(t => t.classList.remove('active'));
            innerTab.classList.add('active');
            info.querySelectorAll('.hr-inner-tab-content').forEach(c => c.classList.remove('active'));
            info.querySelector(`.hr-inner-tab-content[data-tab-content="${innerTab.getAttribute('data-tab')}"]`).classList.add('active');
        }
    });
});

// MAIN VIDEO CONTENT END

// AUDIO PLAYLIST SECTION START
const defaults = {
    random: false,
    volume: 0.5,
    music: [
        {
            title: "Choir - Falling In Love With Jesus",
            url:
                "https://ia802307.us.archive.org/4/items/falling-in-love-with-jesus_202512/Falling%20In%20Love%20With%20Jesus.mp3"
        },

        {
            title: "Choir - Give Myself Away",
            url:
                "https://ia902308.us.archive.org/9/items/give-myself-away_202512/Give%20Myself%20Away.mp3"
        },

        {
            title: "Brother Milton - Jesus I'll Never Forget",
            url: "https://ia601805.us.archive.org/27/items/jesus-ill-never-forget/Jesus%20Ill%20Never%20Forget.mp3"
        },

        {
            title: "Choir - Jesus, We're Depending On You",
            url: "https://ia601203.us.archive.org/28/items/jesus-were-depending-on-you/Jesus%2C%20We%27re%20Depending%20On%20You.mp3"
        },

        {
            title: "Sister Michelle - One Day At A Time",
            url: "https://ia601702.us.archive.org/14/items/one-day-at-a-time_202512/One%20Day%20At%20A%20Time.mp3"
        },

        {
            title: "Sister Ingrid - Come A Long Way",
            url: "https://ia601706.us.archive.org/11/items/come-a-long-way_202512/Come%20A%20Long%20Way.mp3"
        },

        {
            title: "Brother Chris - You Get The Glory",
            url: "https://ia601707.us.archive.org/27/items/you-get-the-glory/You%20Get%20The%20Glory.mp3"
        },

        {
            title: "Choir - How Great Is Our God",
            url: "https://ia600603.us.archive.org/18/items/how-great-is-our-god_20251227/How%20Great%20Is%20Our%20God.mp3"
        },

        {
            title: "Sister Candice - Be Still And Know",
            url: "https://ia600804.us.archive.org/23/items/be-still-and-know_202512/Be%20Still%20And%20Know.mp3"
        },  

        {
            title: "Choir - Nothing From My Journey Now",
            url: "https://ia601709.us.archive.org/20/items/nothing-from-my-journey-now_202601/Nothing%20From%20My%20Journey%20Now.mp3"
        },

        {
            title: "Choir - Holding On Until My Journey Ends",
            url: "https://ia601608.us.archive.org/20/items/holding-on-until-my-journey-ends/Holding%20On%20Until%20My%20Journey%20Ends.mp3"
        },

        {
            title: "Sister & Brother Milton - All the Way My Savior Leads Me",
            url:
                "https://ia802307.us.archive.org/0/items/all-the-way-my-savior-leads-me/All%20the%20Way%20My%20Savior%20Leads%20Me.mp3"
        },

        {
            title: "Sister Takeia - To God Be The Glory",
            url:
                "https://ia601701.us.archive.org/27/items/to-god-be-the-glory_202601/To%20God%20Be%20The%20Glory.mp3"
        },

        {
            title: "Sister Michelle - He Will Roll You Over The Tide",
            url: "https://ia601703.us.archive.org/26/items/he-will-roll-you-over-the-tide/He%20Will%20Roll%20You%20Over%20The%20Tide.mp3"
        },

        {
            title: "Brother Milton - Burdens Are Lifted At Calvary",
            url: "https://ia800309.us.archive.org/15/items/burdens-are-lifted-at-calvary/Burdens%20Are%20Lifted%20At%20Calvary.mp3"
        },

        {
            title: "Sister Ingrid - I Was Hurting",
            url: "https://ia601605.us.archive.org/8/items/i-was-hurting/I%20Was%20Hurting.mp3"
        },

        {
            title: "Choir - Bless Your Name",
            url: "https://ia601405.us.archive.org/22/items/bless-your-name/Bless%20Your%20Name.mp3"
        },
    ]
};


class MusicPlayer {
    constructor(config) {
        this.music = config.music || [];
        this.currentIndex = 0;
        this.barsCount = 44;

        this.playerBlock = document.querySelector(".player");
        this.musicList = document.querySelector(".playlist__list");
        this.audio = document.getElementById("audioPlayer");
        this.playlistBth = document.getElementById("musicPlaylist");
        this.settingsBth = document.getElementById("settingsPlayer");
        this.autoplayBtn = document.getElementById("autoplay");
        this.playBtn = document.getElementById("playBtn");
        this.replayBtn = document.getElementById("replayBtn");
        this.barsContainer = document.getElementById("bars");
        this.title = document.getElementById("musicTitle");
        this.artist = document.getElementById("musicArtist");
        this.durationDisplay = document.getElementById("musicDuration");
        this.playIcon = this.playBtn.querySelector(".player__play-icon");
        this.pauseIcon = this.playBtn.querySelector(".player__pause-icon");
        this.nextBtn = document.querySelector(".player__next-btn");
        this.prevBtn = document.querySelector(".player__prev-btn");
        this.closePlaylist = document.querySelector(".playlist__control");
        this.volumeInput = document.getElementById("volumeInput");
        this.randomBtn = document.getElementById("randomBtn");

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();

        const source = this.audioContext.createMediaElementSource(this.audio);
        source.connect(this.analyser);

        this.analyser.connect(this.audioContext.destination);
        this.analyser.fftSize = 512;
        this.bufferLength = this.analyser.frequencyBinCount;
        this.dataArray = new Uint8Array(this.bufferLength);

        this.audio.volume = config.volume ?? 0.5;

        if (this.volumeInput) {
            this.volumeInput.value = this.audio.volume * 100;
            this.volumeInput.style.setProperty("--range", this.volumeInput.value + "%");
        }

        this.random = config.random;
        this.autoplay = this.autoplayBtn.checked;

        this.createBars();
        this.setupControllers();
        this.playlistControl();
        this.setupPlaylist();
        this.playTrack(0);
        this.isMobile();
    }

    playTrack(index) {
        if (this.music[index]) {
            this.currentIndex = index;

            this.playlistItems?.forEach((el, i) => {
                el.classList.toggle("current", i === index);
            });

            const [artist, title] = this.music[index].title.split(" - ");

            this.audio.src = this.music[index].url;
            this.artist.textContent = artist || "Unknown Artist";
            this.title.textContent = title || "Unknown Name";

            this.updateControlButtons(false);
            this.createBars();
        }
    }

    // Player Actions

    next(isAuto = false) {
        if (isAuto && !this.autoplay) return;

        if (this.random) {
            let nextIndex;
            do {
                nextIndex = Math.floor(Math.random() * this.music.length);
            } while (nextIndex === this.currentIndex && this.music.length > 1);

            this.playTrack(nextIndex);
        } else {
            if (this.currentIndex < this.music.length - 1) {
                this.playTrack(this.currentIndex + 1);
            } else {
                return;
            }
        }

        this.audio.play();
        this.audioContext.resume();
        this.updateControlButtons(true);
    }

    prev() {
        if (this.currentIndex > 0) {
            if (this.autoplay) {
                this.playTrack(this.currentIndex - 1);
                this.audio.play();
                this.audioContext.resume();
                this.updateControlButtons(true);
            } else {
                this.playTrack(this.currentIndex - 1);
                this.updateControlButtons(false);
            }
        }
    }

    updateControlButtons(isPlaying, ended = false) {
        this.prevBtn.classList.toggle("disabled", this.currentIndex < 1);
        this.nextBtn.classList.toggle(
            "disabled",
            this.currentIndex === this.music.length - 1 && !this.random);


        if (!this.autoplay && ended) {
            this.replayBtn.classList.remove("hidden");
            this.playBtn.classList.add("hidden");

            return;
        } else {
            this.replayBtn.classList.add("hidden");
            this.playBtn.classList.remove("hidden");
        }

        if (isPlaying) {
            this.playIcon.classList.add("hidden");
            this.pauseIcon.classList.remove("hidden");
        } else {
            this.playIcon.classList.remove("hidden");
            this.pauseIcon.classList.add("hidden");
        }
    }

    // Audio Wave

    createBars() {
        this.barsContainer.innerHTML = "";

        for (let i = 0; i < this.barsCount; i++) {
            const bar = document.createElement("div");

            bar.classList.add("player__bar");
            this.barsContainer.appendChild(bar);
        }
    }



    updateBars() {
        this.analyser.getByteFrequencyData(this.dataArray);

        const bars = [...document.querySelectorAll(".player__bar")];
        const step = Math.floor(this.bufferLength / this.barsCount);

        bars.forEach((bar, index) => {
            let sum = 0;
            for (let i = 0; i < step; i++) {
                sum += this.dataArray[index * step + i];
            }

            const average = sum / step;
            const fillHeight = average / 2;

            bar.style.height = `${fillHeight}%`;

            const barDuration = this.audio.duration / this.barsCount;
            const currentIndex = Math.floor(this.audio.currentTime / barDuration);

            if (index <= currentIndex) {
                bar.classList.add("color");
            } else {
                bar.classList.remove("color");
            }
        });
    }

    // Playlist

    setupPlaylist() {
        this.playlistItems = [];

        for (let i = 0; i < this.music.length; i++) {
            const [artist, title] = this.music[i].title.split(" - ");
            const newMusicItem = document.createElement("div");

            newMusicItem.tabIndex = 0;
            newMusicItem.classList.add("playlist__item");

            if (i === 0) newMusicItem.classList.add("current");
            newMusicItem.setAttribute("data-song-id", i);

            newMusicItem.innerHTML = `
                <span class="playlist__song">${artist} - <span class="playlist__song-name">${title}</span></span>
                <p class="playlist__duration">00:00</p>
            `;

            this.musicList.appendChild(newMusicItem);
            this.playlistItems.push(newMusicItem);

            const durationElement = newMusicItem.querySelector(".playlist__duration");
            const audio = document.createElement("audio");

            audio.src = this.music[i].url;

            audio.addEventListener("loadedmetadata", () => {
                const duration = audio.duration;
                const mins = Math.floor(duration / 60).
                    toString().
                    padStart(2, "0");
                const secs = Math.floor(duration % 60).
                    toString().
                    padStart(2, "0");

                durationElement.textContent = `${mins}:${secs}`;
            });

            newMusicItem.addEventListener("click", () => {
                this.playlistItems.forEach(el => el.classList.remove("current"));
                newMusicItem.classList.add("current");
                this.playTrack(i);

                if (this.autoplay) {
                    this.audio.play();
                    this.audioContext.resume();
                    this.updateControlButtons(true);
                } else {
                    this.updateControlButtons(false);
                }
            });
        }
    }

    playlistControl() {
        this.playlistBth.addEventListener("click", () => {
            this.playerBlock.classList.toggle("open-playlist");
            this.playlistBth.classList.toggle("active");
        });

        this.closePlaylist.addEventListener("click", () => {
            this.playerBlock.classList.remove("open-playlist");
            this.playlistBth.classList.remove("active");
        });
    }

    // Player Controllers

    setupControllers() {
        // Audio Controllers

        this.audio.addEventListener("ended", () => {
            this.updateControlButtons(false, true);
            this.next(true);
        });

        this.audio.addEventListener("timeupdate", () => {
            if (this.audio.duration && !isNaN(this.audio.duration)) {
                const remainingTime = this.audio.duration - this.audio.currentTime;
                const mins = Math.floor(remainingTime / 60).
                    toString().
                    padStart(2, "0");
                const secs = Math.floor(remainingTime % 60).
                    toString().
                    padStart(2, "0");

                this.durationDisplay.textContent = `${mins}:${secs}`;
            } else {
                this.durationDisplay.textContent = "00:00";
            }
        });

        this.audio.addEventListener("loadedmetadata", () => {
            if (this.audio.duration && !isNaN(this.audio.duration)) {
                const mins = Math.floor(this.audio.duration / 60).
                    toString().
                    padStart(2, "0");
                const secs = Math.floor(this.audio.duration % 60).
                    toString().
                    padStart(2, "0");

                this.durationDisplay.textContent = `${mins}:${secs}`;
            } else {
                this.durationDisplay.textContent = "00:00";
            }
        });

        this.audio.addEventListener("play", () => {
            const update = () => {
                this.updateBars();

                if (!this.audio.paused) {
                    requestAnimationFrame(update);
                }
            };

            update();
        });

        // Control Buttons

        this.playBtn.addEventListener("click", () => {
            if (this.audio.paused) {
                this.audio.play();
                this.audioContext.resume();
                this.updateControlButtons(true);
            } else {
                this.audio.pause();
                this.updateControlButtons(false);
            }
        });

        this.nextBtn.addEventListener("click", () => {
            this.next(false);
        });

        this.prevBtn.addEventListener("click", () => {
            this.prev();
        });

        this.replayBtn.addEventListener("click", () => {
            this.audio.currentTime = 0;
            this.audio.play();
            this.audioContext.resume();
            this.updateControlButtons(true);
        });

        this.randomBtn.addEventListener("click", () => {
            this.randomBtn.classList.toggle("active");

            this.random = !this.random;
        });

        // Audio Wave Controller

        this.barsContainer.addEventListener("click", event => {
            const rect = this.barsContainer.getBoundingClientRect();
            const clickX = event.clientX - rect.left;

            const barWidth = rect.width / this.barsCount;
            const index = Math.min(
                this.barsCount - 1,
                Math.max(0, Math.floor(clickX / barWidth)));


            const timePerBar = this.audio.duration / this.barsCount;
            const newTime = index * timePerBar;

            this.audio.currentTime = newTime;

            if (this.audio.paused) {
                const bars = [...document.querySelectorAll(".player__bar")];

                bars.forEach((bar, i) => {
                    if (i <= index) {
                        bar.classList.add("color");
                    } else {
                        bar.classList.remove("color");
                    }
                });
            } else {
                this.updateBars();
            }
        });

        // Settings Controllers

        this.volumeInput.addEventListener("input", () => {
            const volumeMute = document.querySelector(".player__volume-mute");
            const volumeHigh = document.querySelector(".player__volume-high");
            const volumeDefault = document.querySelector(".player__volume-default");

            this.audio.volume = this.volumeInput.value / 100;

            if (this.volumeInput.value <= 0) {
                volumeDefault.classList.add("hidden");
                volumeHigh.classList.add("hidden");
                volumeMute.classList.remove("hidden");
            } else if (this.volumeInput.value >= 60) {
                volumeDefault.classList.add("hidden");
                volumeMute.classList.add("hidden");
                volumeHigh.classList.remove("hidden");
            } else {
                volumeMute.classList.add("hidden");
                volumeHigh.classList.add("hidden");
                volumeDefault.classList.remove("hidden");
            }

            let range = this.volumeInput.value + "%";

            this.volumeInput.style.setProperty("--range", range);
        });

        this.settingsBth.addEventListener("click", () => {
            this.settingsBth.classList.toggle("active");
        });

        this.autoplayBtn.addEventListener("change", () => {
            this.autoplay = this.autoplayBtn.checked;
        });
    }

    isMobile() {
        const updateBarsCount = () => {
            this.barsCount = window.innerWidth < 620 ? 25 : 50;

            this.createBars();
        };

        updateBarsCount();

        window.addEventListener("resize", () => {
            updateBarsCount();
        });
    }
}


document.addEventListener("DOMContentLoaded", () => {
    new MusicPlayer(defaults);
});

// SERVICES AND ABOUT US START


// SERVICES AND ABOUT US END

// GALLERY SECTION START

// GALLERY SECTION END

// AUDIO PLAYLIST END

// STOP EXECUTION ON TIMEOUT
