<template>
    <div id="panel" class="Panel">
        <canvas id="canvas_panel" width="378" height="326"></canvas>
    </div>
</template>

<script>
    import { isMobile
    } from '../utils/Utils';
    import UrlHelper from  '../utils/UrlHelper';

    const SIZE_BASE = 87;
    const SIZE_HEIGHT = 72;
    const SIZE_BASE_HALF = SIZE_BASE / 2;
    const SIZE_HEIGHT_HALF = SIZE_HEIGHT / 2;
    const TAN_TRIANGLE = SIZE_HEIGHT/SIZE_BASE_HALF;

    let vm, parent, canvas, ctx, trianglesList,
            generateTriangle, getIdxButtonSelect, trianglesPosition, 
            activeButtonAutoplay, autoplaySongs, bindPanel;
    
    activeButtonAutoplay = false;
    autoplaySongs = [];
    if ( UrlHelper.get() && isMobile() ) {
        autoplaySongs = UrlHelper.get().split(',');
        activeButtonAutoplay = ( autoplaySongs.length > 0 ) ? true : false;
    }

    bindPanel = function () {
        canvas.addEventListener('click', function(e) {

            if ( activeButtonAutoplay ) {
                activeButtonAutoplay = false;
                TweenLite.to(parent.$refs.tap, 0.5, {opacity:0});
                autoplaySongs.forEach(function(indexButton){
                    parent.play(parent.listButtons[indexButton]);
                })
            } else {
                let eX = e.offsetX;
                let eY = e.offsetY;
                let idxButton = getIdxButtonSelect(eX, eY);
                if (idxButton+1) {
                    parent.play(parent.listButtons[idxButton]);
                }
            }
        }, false);

        canvas.addEventListener('mousemove', function(e) {
            let eX = e.offsetX;
            let eY = e.offsetY;
            let idxButton = getIdxButtonSelect(eX, eY);
            if (idxButton+1){
                canvas.style.cursor = "pointer";
                parent.hoverButton = idxButton;
            } else {
                canvas.style.cursor = "auto";
                parent.hoverButton = -1;
            }

        },false);

        FastClick.attach(document.body);
    };

    trianglesPosition = {
        a: 48,
        b: 46,
        c: 125,
        d: 123,
        e: 202,
        f: 200,
        g: 279,
        h: 277,
        i: 57,
        j: 101,
        k: 145,
        l: 189,
        m: 233,
        n: 277,
        o: 321
    };

    generateTriangle = function(x,y, side, idxButton){
        side = side || 1;
        idxButton = idxButton || 0;
        ctx.moveTo(x-SIZE_BASE_HALF,y+SIZE_HEIGHT_HALF*side);
        ctx.lineTo(x+SIZE_BASE_HALF,y+SIZE_HEIGHT_HALF*side);
        ctx.lineTo(x,y-SIZE_HEIGHT_HALF*side);
        ctx.lineTo(x-SIZE_BASE_HALF,y+SIZE_HEIGHT_HALF*side);

        return { side, x, y, idxButton }
    };

    getIdxButtonSelect = function (x, y) {
        for (let i = 0; i < trianglesList.length; i++){
            let triangle = trianglesList[i];
            let tX = triangle.x;
            let tY = triangle.y;
            let side = triangle.side;
            let left = tX-SIZE_BASE_HALF;
            let right = tX+SIZE_BASE_HALF;
            let top = tY-SIZE_HEIGHT_HALF;
            let bottom = tY+SIZE_HEIGHT_HALF;

            if (( left < x ) && ( right > x ) && ( top < y ) && ( bottom > y )){
                let tanClick;

                if ( tX < x ) {
                    
                    tanClick = ( side > 0 ) ? (y-top)/(x-tX) : (bottom - y)/(x-tX);

                } else {
                    tanClick = ( side > 0 ) ? (y-top)/(tX-x) : (bottom - y)/(tX-x);
                }
                if ( TAN_TRIANGLE < tanClick ){
                    return triangle.idxButton;
                }
            }
        }
    };

    export default {
        name: 'panel',
        data () {
            vm = this;
            parent = vm.$parent;
            return {
            }
        },
        methods: {

        },
        mounted: function(){
            canvas = document.getElementById('canvas_panel');
            ctx = canvas.getContext('2d');
            let canvasWidth = canvas.width;
            let canvasHeight = canvas.height;
            let tPosition = trianglesPosition;
            let count = 0;
            trianglesList = [
                {
                    x:tPosition.j,
                    y:tPosition.a,
                    side: 1
                },
                {
                    x:tPosition.k,
                    y:tPosition.b,
                    side: -1
                },
                {
                    x:tPosition.l,
                    y:tPosition.a,
                    side: 1
                },
                {
                    x:tPosition.m,
                    y:tPosition.b,
                    side: -1
                },
                {
                    x:tPosition.n,
                    y:tPosition.a,
                    side: 1
                },
                {
                    x:tPosition.i,
                    y:tPosition.c,
                    side: 1
                },
                {
                    x:tPosition.j,
                    y:tPosition.d,
                    side: -1
                },
                {
                    x:tPosition.k,
                    y:tPosition.c,
                    side: 1
                },
                {
                    x:tPosition.l,
                    y:tPosition.d,
                    side: -1
                },
                {
                    x:tPosition.m,
                    y:tPosition.c,
                    side: 1
                },
                {
                    x:tPosition.n,
                    y:tPosition.d,
                    side: -1
                },
                {
                    x:tPosition.o,
                    y:tPosition.c,
                    side: 1
                },
                {
                    x:tPosition.i,
                    y:tPosition.f,
                    side: -1
                },
                {
                    x:tPosition.j,
                    y:tPosition.e,
                    side: 1
                },
                {
                    x:tPosition.k,
                    y:tPosition.f,
                    side: -1
                },
                {
                    x:tPosition.l,
                    y:tPosition.e,
                    side: 1
                },
                {
                    x:tPosition.m,
                    y:tPosition.f,
                    side: -1
                },
                {
                    x:tPosition.n,
                    y:tPosition.e,
                    side: 1
                },
                {
                    x:tPosition.o,
                    y:tPosition.f,
                    side: -1
                },
                {
                    x:tPosition.j,
                    y:tPosition.h,
                    side: -1
                },
                {
                    x:tPosition.k,
                    y:tPosition.g,
                    side: 1
                },
                {
                    x:tPosition.l,
                    y:tPosition.h,
                    side: -1
                },
                {
                    x:tPosition.m,
                    y:tPosition.g,
                    side: 1
                },
                {
                    x:tPosition.n,
                    y:tPosition.h,
                    side: -1
                }
            ];
            trianglesList.forEach(function ( triangle ) {
                triangle['idxButton'] = count;
                count++;
            });

            bindPanel();

        }
    }
</script>