<template>
    <div id="spectrum">
        <canvas id='canvas_spectrum' width="1500" height="900"></canvas>
    </div>
</template>

<script>
    import Bar from '../models/Bar';
    import Vec2d from '../models/Vec2d';
    import {
        isChrome, isNotIE, isNotMobile
    } from '../utils/Utils';

    const SPECTRUM_SIZE = 100;
    const CIRCLE_WIDTH = 300;
    const GRADE_CIRCLE_SPECTRUM = 360 / SPECTRUM_SIZE;
    const GRADIENT_ELECTRIC = ["#FF6C5C", "#7CFF99", "#E6B800", "#DC80FC", "#FF8605", "#FF9795"];
    const PI = Math.PI;
    const DOUBLE_PI = PI*2;

    let vm, parent, analyser, canvas, ctx,
        centerCanvas, getListSpectrum, generateListBars,
        renderBars, renderPointBar, renderElectric, generateGradient,
        renderCircle, listCenterBars, listOutSideBars,
        listPointBars, listElectric, gradientElectric, renderCompleteSpectrum,
        renderPartialSpectrum, renderNoSupport;


    getListSpectrum = function(button){
        let listSpectrum;
        if ( Object.keys(button).length > 0 ){
            let analyser = button.audio.analyser;
            listSpectrum = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(listSpectrum);
        } else {
            listSpectrum = [];
        }
        return listSpectrum;
    };

    generateListBars = function(circleWidth, side, customGrade, size){
        circleWidth = circleWidth || 220;
        customGrade = customGrade || 0;
        size = size || 1;
        side = side || 1;
        let listBar = [];

        let i = SPECTRUM_SIZE - 1;
        for(i; i > -1; --i) {
            let bar = new Bar(
                    circleWidth,
                    centerCanvas,
                    GRADE_CIRCLE_SPECTRUM*i,
                    side);
            bar.grade += customGrade;
            bar.size = size;
            listBar.push(bar);
        }

        return listBar;
    };

    renderBars = function(listBar, button, divide){
        let listSpectrum = getListSpectrum(button);
        let i = SPECTRUM_SIZE - 1;

        divide = divide || 3;

        for(i; i > -1; --i) {
            let bar, spectrum;

            bar = listBar[i];
            if (button.active){
                spectrum = listSpectrum[i] || 0;
                bar.height = (spectrum / divide);
            } else {
                bar.remove();
            }
            bar.update();
            ctx.moveTo(bar.pos.getX(), bar.pos.getY());
            ctx.lineTo(bar.posEnd.getX(), bar.posEnd.getY());
        }
    };

    renderPointBar = function (listBar, button, divide) {
        let listSpectrum = getListSpectrum(button);
        let i = SPECTRUM_SIZE - 1;

        divide = divide || 3;
        for(i; i > -1; --i) {
            let bar, spectrum;

            bar = listBar[i];
            if (button.active){
                bar.size = 0.2;
                spectrum = listSpectrum[i] || 0;
                bar.height = (spectrum / divide);
            } else {
                bar.remove();
                
            }
            bar.update();
            ctx.beginPath();
            ctx.arc(bar.posEnd.getX(),bar.posEnd.getY(),bar.size,0,DOUBLE_PI);
            ctx.stroke();
        }
    };

    renderElectric = function(listBar, button, divide, color){
        let initX, initY, size;
        let listSpectrum = getListSpectrum(button);
        let i = SPECTRUM_SIZE - 1;

        color = color || '#ffffff';
        divide = divide || 3;

        size = 1;
        for(i; i > -1; --i) {
            let bar, spectrum, x, y;

            bar = listBar[i];
            if (button.active){
                spectrum = listSpectrum[i] || 0;
                bar.height = (spectrum / divide);
            } else {
                bar.remove();
            }
            bar.update();
            x = bar.posEnd.getX();
            y = bar.posEnd.getY();
            if ( i === SPECTRUM_SIZE - 1 ){
                ctx.moveTo(x,y);
                initX = x;
                initY = y;
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.strokeStyle = color;
        ctx.lineTo(initX, initY);
        ctx.lineWidth = size;
    };

    renderCircle = function (size) {
        ctx.beginPath();
        ctx.arc(centerCanvas.getX(),centerCanvas.getY(),size,0,DOUBLE_PI);
        ctx.strokeStyle = '#ffffff';
        ctx.stroke();
        ctx.closePath();
    };

    generateGradient = function(listGradient, circleWidth) {
        let linearGradient = ctx.createLinearGradient(0, 0, PI*circleWidth, 0);
        linearGradient.addColorStop(.14, listGradient[0]);
        linearGradient.addColorStop(.28, listGradient[1]);
        linearGradient.addColorStop(.42, listGradient[2]);
        linearGradient.addColorStop(.56, listGradient[3]);
        linearGradient.addColorStop(.7, listGradient[4]);
        linearGradient.addColorStop(.85, listGradient[5]);

        return linearGradient;
    };

    renderCompleteSpectrum = function () {
        ctx.clearRect(0,0,canvas.width,canvas.height);

        let centerBars = parent.centerBars;
        let outSideBars = parent.outSideBars;
        let particlesOutSide = parent.particlesOutSide;


        /*
        ctx.shadowColor = '#999';
        ctx.shadowOffsetX = -1;
        ctx.shadowOffsetY = 1;*/
        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();
        renderPointBar(listPointBars, particlesOutSide, 2);
        renderBars(listCenterBars, centerBars, 3);
        renderBars(listOutSideBars, outSideBars,9);

        ctx.stroke();
        ctx.closePath();
        ctx.beginPath();
        renderElectric(listElectric, centerBars, 15, '#E6D67C');
        ctx.stroke();
        ctx.closePath();
    };

    renderPartialSpectrum = function () {
        ctx.clearRect(0,0,canvas.width,canvas.height);

        let centerBars = parent.centerBars;
        let outSideBars = parent.outSideBars;
        let particlesOutSide = parent.particlesOutSide;



        ctx.strokeStyle = '#ffffff';
        ctx.beginPath();
        renderPointBar(listPointBars, particlesOutSide, 2);
        renderBars(listCenterBars, centerBars, 3);
        renderBars(listOutSideBars, outSideBars,9);

        ctx.stroke();
        ctx.closePath();
         ctx.beginPath();
         renderElectric(listElectric, centerBars, 15, '#E6D67C');
         ctx.stroke();
         ctx.closePath();
    };

    export default {
        name: 'spectrum',
        data () {
            vm = this;
            parent = vm.$parent;
            return {
            }
        },
        computed: {
            machine () {
                return this.$store.state.machine
            }
        },
        watch: {
            machine( value ){
                if ( value ) {
                    if ( isNotMobile() &&  isNotIE() ) {
                        listCenterBars = generateListBars(CIRCLE_WIDTH,1);
                        listOutSideBars = generateListBars(CIRCLE_WIDTH+170,-1,2);
                        listPointBars = generateListBars(CIRCLE_WIDTH+230,-1, 2, 0.2);
                        listElectric = generateListBars(CIRCLE_WIDTH+190,-1);
                        gradientElectric = generateGradient(GRADIENT_ELECTRIC, CIRCLE_WIDTH+10);
                        if ( isChrome() ) {
                            setInterval(renderCompleteSpectrum,1);
                        } else {
                            setInterval(renderPartialSpectrum,1);
                        }
                    }
                }
            }
        },
        mounted: function(){
            canvas = document.getElementById('canvas_spectrum');
            ctx = canvas.getContext('2d');
            centerCanvas = new Vec2d(canvas.width / 2, canvas.height / 2);
        }
    }
</script>