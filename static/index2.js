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
            let seconds = ~~time % 60;
            if(!(time % 60)) {
                seconds = `0${seconds}`;
            }

            return `${minutes}:${seconds}`;
        },
        countDown: () => {
            timer.currentTime--;

            let minutes = ~~((timer.currentTime % 3600) / 60);
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

    const
    pomodoro = document.querySelector(selectors.pomodoro),
    shortBreak = document.querySelector(selectors.shortBreak),
    longBreak = document.querySelector(selectors.longBreak),
    startBtn = document.querySelector(selectors.startBtn),
    stopBtn = document.querySelector(selectors.stopBtn),
    main = document.querySelector(selectors.main),
    nav = document.querySelector(selectors.nav);

    
    return {
        getSelectors: () => {
            return selectors;
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
            main.style.background = color;
            nav.style.background = color;
            stopBtn.style.color = color;
            startBtn.style.color = color;
        },
        addAndRemoveActive: (add, remove1, remove2) => {
            add.classList.add('active')
            remove1.classList.remove('active');
            remove2.classList.remove('active');
        },
        timer: {
            set: null,
    
            start: () => {
                console.log(log.currentSession)
                timer.set = setInterval(() => {
                    const time = TIME.getCurrentTime();
                    if(time === 0){
                        clearInterval(timer.set);
                        timer.displayNotification();
                    } else {
                        UI.displayCountdown(TIME.countDown());
                    }
                }, 1000)
                timer.startStopBtnPosition('none', 'inline')
                askForNotification();
            },
    
            stop: () => {
                clearInterval(timer.set)
                timer.startStopBtnPosition('inline', 'none')
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
            startStopBtnPosition: (start, stop) => {
                startBtn.style.display = start;
                stopBtn.style.display = stop;
            }
        }
    }
})();

const App = ((UI, TIME, Sessions) => {
    const 
    selectors = UI.getSelectors(),
    colors = UI.getColors(),
    log = Sessions.getLog();

    //Get App Element
    const
    pomodoro = document.querySelector(selectors.pomodoro),
    shortBreak = document.querySelector(selectors.shortBreak),
    longBreak = document.querySelector(selectors.longBreak),
    startBtn = document.querySelector(selectors.startBtn),
    stopBtn = document.querySelector(selectors.stopBtn);


    let loadEvents = () => {
        //pomodoro event
        pomodoro.addEventListener('click', pomodoroTimer);

        //short break event
        shortBreak.addEventListener('click', shortBreakTimer);

        //long break event
        longBreak.addEventListener('click', longBreakTimer);
        
        //start event
        startBtn.addEventListener('click', UI.timer.start);

        //stop event
        stopBtn.addEventListener('click', UI.timer.stop);
    }

    let pomodoroTimer = () => {
        log.currentSession = 'pomodoro';
        TIME.create(1500);
        UI.addAndRemoveActive(pomodoro, longBreak, shortBreak)
        UI.changeColors(colors.main)
        UI.displayCountdown(TIME.convert())
    }
    let shortBreakTimer = () => {
        log.currentSession = 'short break';
        TIME.create(10);
        UI.addAndRemoveActive(shortBreak, longBreak, pomodoro)
        UI.changeColors(colors.sec)
        UI.displayCountdown(TIME.convert())
    }
    let longBreakTimer = () => {
        log.currentSession = 'long break';
        TIME.create(900);
        UI.addAndRemoveActive(longBreak, shortBreak, pomodoro)
        UI.changeColors(colors.tri);
        UI.displayCountdown(TIME.convert())
    }
    // ----------------------------------------------------------------
    // let timer = {
    //     set: null,

    //     start: () => {
    //         console.log(log.currentSession)
    //         timer.set = setInterval(() => {
    //             const time = TIME.getCurrentTime();
    //             if(time === 0){
    //                 clearInterval(timer.set);
    //                 timer.displayNotification();
    //             } else {
    //                 UI.displayCountdown(TIME.countDown());
    //             }
    //         }, 1000)
    //         timer.startStopBtnPosition('none', 'inline')
    //         askForNotification();
    //     },

    //     stop: () => {
    //         clearInterval(timer.set)
    //         timer.startStopBtnPosition('inline', 'none')
    //     },

    //     displayNotification: () => {
    //         if(log.currentSession === 'pomodoro') {
    //             new Notification(`${log.currentSession} is over!`, { body: "Take your break"});
    //         } else if(log.currentSession === 'short break') {
    //             new Notification(`${log.currentSession} is over!`, { body: "Get Back To Work!!!!"});
    //         } else {
    //             new Notification(`${log.currentSession} is over!`, { body: "That Was Relaxing, Now Get Back To Work!!!!"});
    //         }
    //     }, 
    //     startStopBtnPosition: (start, stop) => {
    //         startBtn.style.display = start;
    //         stopBtn.style.display = stop;
    //     }
    // }

    
    
    return {
        init: () => {
            // Display Page Load Timer
            pomodoroTimer()

            UI.timer.startStopBtnPosition('inline', 'none');
            loadEvents();
        }
    }
})(UI, TIME, Sessions);

App.init()