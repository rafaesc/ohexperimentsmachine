<template>
    <div id="game" class="Game">
        <div class="System" :class="doneTutorial ? '' : 'active-tutorial tutorial-'+stepTutorial">
            <div id="Layout__contain" class="System__wrapper panel-layout">
                <div class="System_contain">
                </div>
            </div>
            <tutorial></tutorial>
            <div id="Panel__contain" class="System__wrapper">
                <div class="System_contain">
                    <div class="System__header">
                        <img src="dist/assets/img/logo.png" width="205" height="90">
                    </div>
                    <div class="System__list">
                        <div v-for="(button, index) in listButtons"
                             :class="'System__list--button '+button.type+' button-'+button.id+' shape-'+button.shape">
                            <div :class="[hoverButton === index ? 'hover' : '']">
                                <button
                                        :class="{
                            'waiting': button.waiting,
                            'active': button.active,
                            'combo': listSongs[button.idxSong].active}">
                                </button>
                            </div>
                        </div>
                    </div>
                    <div ref="tap" class="System__tap">
                        <div class="System__tap--contain">
                            TAP TO<br>PLAY
                        </div>
                    </div>
                    <panel></panel>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import panel from './Panel.vue';
    import tutorial from './Tutorial.vue';
    import Store from '../utils/Store';
    import { audioTime,
            audioContextSupported,
            isNotMobile,
            isMobile
    } from '../utils/Utils';
    import {
      DOC,
      WIN,
      LAYOUT_CONTAIN,
      PANEL_CONTAIN,
      DONE_TUTORIAL_STORE
    } from '../utils/Variables';
    import { listTransition, listSongs, listButtons} from '../models/ListSongs';
    import UrlHelper from  '../utils/UrlHelper';


    const TYPE_BUTTON = ['sounds', 'drum'];
    
    let vm, parent, init, timeLoops, rafTimeout,
            count, createButtonObject,
            countHistory, forced, getRandom,
            nextTutorial, initTimePlay, updateSaveStore,
            autoplaySongs, validatePlay, validateLoop,
            clearListPause, getTimeInit, playTransition,
            validLimits, updateDurationSongs;
    
    count = 0;
    init = 2000;
    timeLoops = {};
    countHistory = 0;
    forced = false;

    autoplaySongs = [];
    if ( UrlHelper.get() ) {
        autoplaySongs = UrlHelper.get().split(',');
    }

    initTimePlay = function(duration) {

        let initTime, sequence;

        sequence = duration;

        if ( vm.startTime === 0 ) {
            vm.startTime = audioTime() + 0.100;
            initTime = vm.startTime;
        } else {
            initTime = (audioTime() - vm.startTime) % sequence;
            if ( initTime !== 0 ) {
                initTime = sequence - initTime;
            }
            initTime = audioTime() + initTime
        }
        return initTime;
    }

    listButtons.forEach(function ( button, idxButton ) {
        button['id'] = count;
        button['idxButton'] = idxButton;
        count++;
    });

    getRandom = function(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    nextTutorial = function(step) {
        if ( !vm.doneTutorial && vm.stepTutorial === step ) {
            if ( vm.stepTutorial === 1 ) {
                vm.$store.commit('nextTutorial')
            } else {
                vm.$store.commit('nextTutorial')
                Store.set(DONE_TUTORIAL_STORE, true);

                setTimeout(function () {
                    DOC.getElementById(PANEL_CONTAIN).style.top = '';
                    DOC.getElementById(LAYOUT_CONTAIN).style.top = '';
                    vm.$store.commit('completeTutorial');
                }, 2500);
            }
        }
    };

    createButtonObject = function (button) {
        let idxSong, type, idxButton, loops,
                order;

        type = button.type;
        idxSong = button.idxSong;
        idxButton = button.idxButton;
        loops = button.loops;
        order = countHistory++;

        return {
            idxSong,
            type,
            idxButton,
            loops,
            order
        };
    };

    updateSaveStore = function(){
        let containActive = Object.keys(vm.listActive).join(',');

        UrlHelper.set(containActive);
    };

    validatePlay = function(){
        let _this, listActive, sizeListActive;

        _this = vm;
        listActive = _this.listActive;
        sizeListActive = Object.keys(listActive).length;

        if(_this.active){
            setTimeout(function(){
                vm.isPlaying = sizeListActive > 0;
            }, 100);

            let time = getTimeInit()*1000;

            if( time === 0){
                _this.nextSound = 0;
                time = timeLoops.sounds*1000;
            }

            rafTimeout(function () {
                vm.isPlaying = false;
                clearListPause();

                validatePlay();
            }, time);
        }
    };

    validateLoop = function(){
        let _this;

        _this = vm;

        if(_this.active){
            let halfTime = getTimeInit(timeLoops.drum)*1000;
            if( halfTime === 0){
                halfTime = timeLoops.drum*1000;
            }

            rafTimeout(function () {
                clearListPause(1);
                validateLoop();
            }, halfTime);
        }
    };

    clearListPause = function(loops){
        let listPause, audio, bPause, buttonPause;

        loops = loops || 2;
        listPause = vm.listPause;
        for (let buttonPId in listPause ) {

            bPause = listPause[buttonPId];

            if (bPause.loops === loops ){

                buttonPause = vm.listButtons[bPause.idxButton];
                if(bPause.type === 'sounds') {
                    vm.listSongs[bPause.idxSong].active = false;
                }

                buttonPause.active = false;
                ga('send', 'event', 'Music', 'stop', buttonPId);
                buttonPause.audio.stop();
                delete listPause[buttonPId];
            }
        }
    };

    getTimeInit = function(duration){
        let secuence, timeInit;

        if(forced){
            secuence = duration || timeLoops.sounds;
            timeInit = (audioTime()-vm.startTime)%secuence;
            if(timeInit!== 0){
                timeInit = secuence-timeInit;
            }
        } else{
            forced = true;
            timeInit = 0;
        }

        return timeInit;
    };

    playTransition = function (transition, currentTime, timeInit) {
        let duration, timeTransition;

        timeTransition = timeInit - transition.init;
        duration = transition.audio.duration();
        transition.audio.play(currentTime+timeTransition);
        rafTimeout(function () {
            transition.audio.isPlaying = false;
            vm.transitionActive = false;
        },duration*1000);
    };

    updateDurationSongs = function(){
        if ( vm.machine ) {
            timeLoops.drum = listButtons[2].audio.duration();
            timeLoops.sounds = listButtons[0].audio.duration();

            if ( timeLoops.drum === timeLoops.sounds ) {
                timeLoops.drum = timeLoops.drum/2
            }

            if ( isNotMobile() ) {
                autoplaySongs.forEach(function(indexButton){
                    vm.play(listButtons[indexButton]);
                })
            }
        }
    };

    export default {
        name: 'game',
        data () {
            vm = this;
            parent = vm.$parent;
            return {
                active: false,
                activeLooper: false,
                startTime: 0,
                hoverButton:-1,
                listSongs,
                listWaiting: {},
                listActive: {},
                listPause: {},
                nextSound: 0,
                transitionActive: false,
                listButtons,
                isPlaying: false,
                isMobile: isMobile()
            }
        },
        computed: {
            stepTutorial () {
                return this.$store.state.stepTutorial
            },
            doneTutorial () {
                return this.$store.state.doneTutorial
            },
            doneLoad () {
                return this.$store.state.doneLoad
            },
            machine () {
                return this.$store.state.machine
            }
        },
        watch: {
            doneLoad( value ){
                updateDurationSongs();
            },
            isPlaying( value ) {
                if ( value ) {
                    vm.$store.commit('activeLooper')
                } else {
                    vm.$store.commit('inactiveLooper')
                }
            },
            listActive( value ) {
                updateSaveStore();
            }
        },
        components: {
            'panel': panel,
            'tutorial': tutorial
        },
        methods: {
            play: function (button) {
                let _this, timeInit, currentTime,
                        loops, buttonId, buttonWaiting,
                        listActive, listWaiting, idxSong,
                        idxButton, type, listPause,
                        runTransition, duration;

                _this = this;

                idxSong = button.idxSong;
                idxButton = button.idxButton;
                buttonId = button.id;
                type = button.type;
                duration = timeLoops[button.type];

                if(!_this.active){
                    _this.startTime = audioTime();
                    _this.active = true;
                }

                listWaiting = _this.listWaiting;
                listActive = _this.listActive;
                listPause = _this.listPause;
                currentTime = audioTime();
                if(button.active||button.waiting){

                    button.active = false;
                    button.waiting = false;

                    buttonWaiting = listWaiting[buttonId];
                    if (typeof buttonWaiting !== 'undefined') {
                        delete listWaiting[buttonId];
                        if ( type === TYPE_BUTTON[1] ) {
                            let bPause, copy;

                            for ( let buttonPId in listPause ) {
                                bPause = listPause[buttonPId];

                                if ( type === bPause.type ) {
                                    copy = listPause[buttonPId];

                                    listActive[buttonPId] = copy;
                                    delete listPause[buttonPId];
                                }
                            }
                        } else {

                            let bPause, copy;

                            for ( let buttonPId in listPause ) {
                                bPause = listPause[buttonPId];

                                if ( idxSong !== bPause.idxSong &&
                                        bPause.type !== TYPE_BUTTON[1] ) {

                                    copy = listPause[buttonPId];

                                    listActive[buttonPId] = copy;
                                    delete listPause[buttonPId];
                                }
                            }

                        }

                    } else{

                        if( type === 'sounds' ) {
                            vm.listSongs[idxSong].active = false;
                        }
                        delete listActive[buttonId];
                        updateSaveStore();
                        delete listPause[buttonId];
                    }

                    ga('send', 'event', 'Music', 'stop', buttonId);
                    button.audio.stop();
                    if (  Object.keys(listActive).length === 0 ) {
                        vm.isPlaying = false;
                    }
                } else{
                    let buttonObject, found, bWait, buttonWaiting,
                            bActive, copy;

                    if ( type === 'drum' ) {
                        let boxButtons, removeButton, listOrders;

                        boxButtons = {};
                        for ( let buttonWId in listWaiting ) {

                            bWait = listWaiting[buttonWId];
                            if ( type === bWait.type ) {

                                boxButtons[bWait.order] = {
                                    buttonId: buttonWId,
                                    buttonObject: bWait
                                };
                            }
                        }

                        listOrders = Object.keys(boxButtons);

                        if ( listOrders.length === 2 ) {

                            removeButton = boxButtons[listOrders[0]];

                            buttonWaiting = vm.listButtons[removeButton.buttonObject.idxButton];
                            buttonWaiting.waiting = false;
                            buttonWaiting.audio.stop();
                            delete listWaiting[removeButton.buttonId];

                        } else {

                            for ( let buttonAId in listActive ) {

                                bActive = listActive[buttonAId];
                                if ( type === bActive.type ) {

                                    boxButtons[bActive.order] = {
                                        buttonId: buttonAId,
                                        buttonObject: bActive
                                    };

                                }
                            }
                            listOrders = Object.keys(boxButtons);

                            if ( listOrders.length === 2 ) {

                                removeButton = boxButtons[listOrders[0]];

                                copy = listActive[removeButton.buttonId];

                                listPause[removeButton.buttonId] = copy;

                                delete listActive[removeButton.buttonId];

                            }

                        }
                        nextTutorial(1);

                    } else {
                        for ( let buttonWId in listWaiting ) {

                            bWait = listWaiting[buttonWId];
                            if ( idxSong !== bWait.idxSong  &&
                                    bWait.type !== 'drum' ) {


                                buttonWaiting = vm.listButtons[bWait.idxButton];

                                buttonWaiting.waiting = false;
                                buttonWaiting.audio.stop();
                                delete listWaiting[buttonWId];
                            }
                        }

                        for ( let buttonAId in listActive ) {

                            bActive = listActive[buttonAId];
                            if ( idxSong !== bActive.idxSong  &&
                                    bActive.type !== 'drum' ) {
                                copy = listActive[buttonAId];

                                listPause[buttonAId] = copy;

                                vm.$delete(vm.listActive, buttonAId);
                                

                                runTransition = true;
                            }
                        }
                        nextTutorial(2);
                    }

                    button.waiting = true;
                    buttonObject = createButtonObject(button);
                    listWaiting[buttonId] = buttonObject;
                    loops = button.loops;
                    timeInit = getTimeInit(duration);
                    if ( runTransition && !vm.transitionActive ) {
                        let timeTransition, transition, largeTransition,
                                mediumTransition, smallTransition, selectTrans;

                        vm.transitionActive = true;
                        mediumTransition = timeInit - 1.9;
                        smallTransition = timeInit - 1;

                        if ( mediumTransition > 0 ){
                            selectTrans = getRandom(0,3);
                            transition = listTransition[selectTrans];
                            playTransition(transition,currentTime, timeInit);
                        } else if ( smallTransition > 0 ){
                            selectTrans = getRandom(2,3);
                            transition = listTransition[selectTrans];
                            playTransition(transition,currentTime, timeInit);
                        } else {
                            vm.transitionActive = false;
                        }
                    }

                    ga('send', 'event', 'Music', 'play', buttonId);
                    button.audio.play(initTimePlay(duration));

                    rafTimeout(function () {

                        if( button.waiting==true ) {
                            button.active = true;
                            button.waiting = false;
                            setTimeout(function(){
                                vm.isPlaying = true;
                            },100);


                            if( type === 'sounds' ) {
                                vm.listSongs[idxSong].active = true;
                                vm.$set(parent, 'centerBars', button);
                            } else {
                                vm.$set(parent, 'outSideBars', button);
                                vm.$set(parent, 'particlesOutSide', button);
                            }

                            buttonWaiting = listWaiting[buttonId];
                            if (typeof buttonWaiting !== 'undefined') {

                                vm.$set(vm.listActive, buttonId, buttonObject);


                                delete listWaiting[buttonId];
                            }
                        }
                    },timeInit*1000);

                }
                if(!vm.activeLooper){

                    vm.activeLooper = true;
                    validatePlay();
                    validateLoop();
                }
            }
        },
        mounted: function(){
            let _this;

            rafTimeout = parent.rafTimeout;

            if ( autoplaySongs.length > 0 && isMobile() ){
                TweenLite.to(vm.$refs.tap, 0, {opacity:0.6});
            }
            
        }
    }
</script>