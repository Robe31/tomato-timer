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
        }
    }
})();

const App = ((UI, TIME) => {
    const 
    selectors = UI.getSelectors(),
    colors = UI.getColors();

    const
    pomodoro = document.querySelector(selectors.pomodoro),
    shortBreak = document.querySelector(selectors.shortBreak),
    longBreak = document.querySelector(selectors.longBreak),
    startBtn = document.querySelector(selectors.startBtn),
    stopBtn = document.querySelector(selectors.stopBtn),
    main = document.querySelector(selectors.main),
    nav = document.querySelector(selectors.nav);


    let loadEvents = () => {
        //pomodoro event
        pomodoro.addEventListener('click', pomodoroTimer);

        //short break event
        shortBreak.addEventListener('click', shortBreakTimer);

        //long break event
        longBreak.addEventListener('click', longBreakTimer);
        
        //start event
        startBtn.addEventListener('click', timer.start);

        //stop event
        stopBtn.addEventListener('click', timer.stop);
    }

    let pomodoroTimer = () => {
        TIME.create(1500);
        const time = TIME.convert()
        pomodoro.classList.add('active');
        shortBreak.classList.remove('active');
        longBreak.classList.remove('active');
        main.style.background = colors.main;
        nav.style.background = colors.main;
        stopBtn.style.color = colors.main;
        startBtn.style.color = colors.main;
        UI.displayCountdown(time)
    }
    let shortBreakTimer = () => {
        TIME.create(300);
        const time = TIME.convert()
        shortBreak.classList.add('active');
        pomodoro.classList.remove('active');
        longBreak.classList.remove('active');
        main.style.background = colors.sec;
        nav.style.background = colors.sec;
        stopBtn.style.color = colors.sec;
        startBtn.style.color = colors.sec;
        UI.displayCountdown(time)
    }
    let longBreakTimer = () => {
        TIME.create(900);
        const time = TIME.convert()
        longBreak.classList.add('active')
        shortBreak.classList.remove('active');
        pomodoro.classList.remove('active');
        main.style.background = colors.tri;
        nav.style.background = colors.tri;
        stopBtn.style.color = colors.tri;
        startBtn.style.color = colors.tri;
        UI.displayCountdown(time)
    }
    let timer = {
        set: null,
        start: () => {
            timer.set = setInterval(() => {
                const time = TIME.getCurrentTime();
                if(time === 0){
                    clearInterval(timer.set)
                } else {
                        
                    UI.displayCountdown(TIME.countDown())
                }
            }, 1000)
            startBtn.style.display = 'none';
            stopBtn.style.display = 'inline';
        },
        stop: () => {
            clearInterval(timer.set)
            startBtn.style.display = 'inline';
            stopBtn.style.display = 'none';
        }
    }
    let initialBtnPosition = () => {
        startBtn.style.display = 'inline';
        stopBtn.style.display = 'none'
    }
    
    return {
        init: () => {
            // Display Page Load Timer
            pomodoroTimer()

            initialBtnPosition();
            loadEvents();
        }
    }
})(UI, TIME);

App.init()