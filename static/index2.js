import {askForNotification} from './notification.js'

const Sessions = (() => {
    const log = {
        currentSession: "null",
        count: []
    }

    return {
        getLog: () => {
            return log;
        }
    }
})();

const TIME = (() => {
    let timer = {
        currentTime: null,
    }
    
    return {
        getCurrentTime: () => {
            return timer.currentTime;
        },
        create: (time) => {
            timer.currentTime = time;
        },
        convert: () => {
            let time = timer.currentTime;

            let minutes = ~~((time % 3600) / 60);
            if(minutes < 10) {
                minutes = `0${minutes}`
            }
            let seconds = ~~time % 60;
            if(!(time % 60)) {
                seconds = `0${seconds}`;
            }

            return `${minutes}:${seconds}`;
        },
        countDown: () => {
            timer.currentTime--;

            let minutes = ~~((timer.currentTime % 3600) / 60);
            if(minutes < 10) {
                minutes = `0${minutes}`
            }
            let seconds = ~~timer.currentTime % 60;

            if(seconds < 10) {
                seconds = `0${seconds}`;
            }

            return `${minutes}:${seconds}`;
        }
    }
})();

const UI = (() => {
    let selectors = {
        pomodoro: '#pomodoro',
        shortBreak: '#shortBreak',
        longBreak: '#longBreak',
        startBtn: '#start',
        stopBtn: '#stop',
        timer: '#timer',
        nav: "#nav",
        main: '#main'
    }
    let colors = {
        main: '#00bac4',
        sec: '#2ACA7F',
        tri: '#0EB567'
    }

    const getUI = {
        pomodoro: document.querySelector(selectors.pomodoro),
        shortBreak: document.querySelector(selectors.shortBreak),
        longBreak: document.querySelector(selectors.longBreak),
        startBtn: document.querySelector(selectors.startBtn),
        stopBtn: document.querySelector(selectors.stopBtn),
        main: document.querySelector(selectors.main),
        nav: document.querySelector(selectors.nav)
    }
    
    return {
        getElements: () => {
            return getUI;
        },
        getColors: () => {
            return colors
        },
        displayCountdown: (time) => {
            document.querySelector(selectors.timer).innerHTML = `
            <p id="time">${time}</p>
            `;
        },
        changeColors: (color) => {
            getUI.main.style.background = color;
            getUI.nav.style.background = color;
            getUI.stopBtn.style.color = color;
            getUI.startBtn.style.color = color;
        },
        addAndRemoveActive: (add, remove1, remove2) => {
            add.classList.add('active')
            remove1.classList.remove('active');
            remove2.classList.remove('active');
        }
    }
})();

const App = ((UI, TIME, Sessions) => {
    const 
    colors = UI.getColors(),
    log = Sessions.getLog(),
    getUI = UI.getElements();

    const loadEvents = () => {
        //pomodoro event
        getUI.pomodoro.addEventListener('click', pomodoroTimer);

        //short break event
        getUI.shortBreak.addEventListener('click', shortBreakTimer);

        //long break event
        getUI.longBreak.addEventListener('click', longBreakTimer);
        
        //start event
        getUI.startBtn.addEventListener('click', timer.start);

        //stop event
        getUI.stopBtn.addEventListener('click', timer.stop);
    }

    function pomodoroTimer() {
        log.currentSession = 'pomodoro';
        TIME.create(1500);
        UI.addAndRemoveActive(pomodoro, longBreak, shortBreak)
        UI.changeColors(colors.main)
        UI.displayCountdown(TIME.convert())
    }
    function shortBreakTimer() {
        log.currentSession = 'short break';
        TIME.create(10);
        UI.addAndRemoveActive(shortBreak, longBreak, pomodoro);
        UI.changeColors(colors.sec);
        UI.displayCountdown(TIME.convert());
    }
    function longBreakTimer() {
        log.currentSession = 'long break';
        TIME.create(900);
        UI.addAndRemoveActive(longBreak, shortBreak, pomodoro)
        UI.changeColors(colors.tri);
        UI.displayCountdown(TIME.convert())
    }
    // ----------------------------------------------------------------
    const timer = {
        set: null,
        play: (sound) => {
            let click = new Audio(sound);
            click.play()
        },
        start: () => {
            timer.play('click.mp3')
            console.log(log.currentSession)
            timer.set = setInterval(() => {
                const time = TIME.getCurrentTime();
                if(time === 0){
                    clearInterval(timer.set);
                    timer.play('alarm.mp3')
                    timer.displayNotification();
                } else {
                    UI.displayCountdown(TIME.countDown());
                }
            }, 1000)
            timer.startStopBtnPositionAndStye('none', 'inline', true)
            askForNotification();
        },

        stop: () => {
            timer.play('click.mp3')
            clearInterval(timer.set)
            timer.startStopBtnPositionAndStye('inline', 'none', false)
            
        },

        displayNotification: () => {
            if(log.currentSession === 'pomodoro') {
                new Notification(`${log.currentSession} is over!`, { body: "Take your break"});
            } else if(log.currentSession === 'short break') {
                new Notification(`${log.currentSession} is over!`, { body: "Get Back To Work!!!!"});
            } else {
                new Notification(`${log.currentSession} is over!`, { body: "That Was Relaxing, Now Get Back To Work!!!!"});
            }
        }, 
        startStopBtnPositionAndStye: (start, stop, x) => {
            if(x) {
                getUI.startBtn.style.borderBottom = "10px solid rgba(0,0,0,.1)";
            } else {
                getUI.stopBtn.style.borderBottom = "none";
            }
            getUI.startBtn.style.display = start;
            getUI.stopBtn.style.display = stop;
        }
    }

    
    
    return {
        init: () => {
            // Display Page Load Timer
            pomodoroTimer()
            timer.startStopBtnPositionAndStye('inline', 'none', true);
            loadEvents();
        }
    }
})(UI, TIME, Sessions);

App.init()