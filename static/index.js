// // Timer Controller
// const TimerCtrl = (()=>{
//     let timer = {
//         time: 1500,
//     }
//     return {
//         logData: () => {
//             return timer.time;
//         },
//         breakTime: (newTime) => {
//             timer.time = newTime;
//         },
//         updateTime: () => {
//             timer.time--;
//             let minutes = ~~((timer.time % 3600) / 60);
//             let seconds = ~~timer.time % 60;

//             return `${minutes}:${seconds}`;
//         },
//         initialTime: () => {
//             let minutes = ~~((timer.time % 3600) / 60);
//             let seconds = ~~timer.time % 60;
//             if(seconds == 0) {
//                 seconds = '00';
//             }
//             return `${minutes}:${seconds}`;
//         }
//     }
// })();

// const UICtrl = (() => {
//     //Get UISelectors
//     const UISelectors = {
//         time: '.time',
//         startSessionBtn: '.start-session',
//         startBreakBtn: '.start-break',
//         pauseSessionBtn: '.pause-session',
//         pauseBreakBtn: '.pause-break'
//     }
    
//     return {
//         getUISelectors: () => {
//             return UISelectors;
//         },
//         displayTime: (time) => {
//             document.querySelector(UISelectors.time).textContent = time;
//         },
//         initialBtnDisplay: () => {
//             document.querySelector(UISelectors.pauseSessionBtn).style.display = 'none';
//             document.querySelector(UISelectors.pauseBreakBtn).style.display = 'none';
//         }
//     }
// })();

// // App Controller
// const AppCtrl = ((TimerCtrl, UICtrl) => {

//     //load event listeners
//     let loadAllEvents = () => {
//         //get ui selectors
//         const UI = UICtrl.getUISelectors();
//         let intervV;

//         // start timer
//         document.querySelector(UI.startSessionBtn).addEventListener('click', (e) => {
            
//             intervV = setInterval(
//                 startTimer, 
//                 1000
//             )

//             document.querySelector(UI.startSessionBtn).style.display = 'none';
//             document.querySelector(UI.pauseSessionBtn).style.display = 'inline';

//             e.preventDefault()
//         });

//         // pause timer
//         document.querySelector(UI.pauseSessionBtn).addEventListener('click', (e) => {
//             clearInterval(intervV);

//             document.querySelector(UI.startSessionBtn).style.display = 'inline';
//             document.querySelector(UI.pauseSessionBtn).style.display = 'none';

//             e.preventDefault();
//         })

//         // start break
//         document.querySelector(UI.startBreakBtn).addEventListener('click', (e) => {
//             let time = TimerCtrl.logData()
//             if(time < 300) {
//                 intervV = setInterval(
//                     startTimer,
//                     1000
//                 )
//             } else {
//                 TimerCtrl.breakTime(300)
//                 intervV = setInterval(
//                     startTimer,
//                     1000
//                 )
//             }

//             document.querySelector(UI.startBreakBtn).style.display = 'none';
//             document.querySelector(UI.pauseBreakBtn).style.display = 'inline';

//             e.preventDefault();
//         })

//         // pause break
//         document.querySelector(UI.pauseBreakBtn).addEventListener('click', (e) => {

//             clearInterval(intervV)

//             document.querySelector(UI.startBreakBtn).style.display = 'inline';
//             document.querySelector(UI.pauseBreakBtn).style.display = 'none';

//             e.preventDefault();
//         })
//     }
//     let startTimer = () => {
//         UICtrl.displayTime(TimerCtrl.updateTime())
//     }
//     return {
//         init: () => {
//             //Initial Button Display
//             UICtrl.initialBtnDisplay();

//             // Initial Time Display
//             UICtrl.displayTime(TimerCtrl.initialTime());
            
//             loadAllEvents();
//         }
//     }
// })(TimerCtrl, UICtrl)

// AppCtrl.init();