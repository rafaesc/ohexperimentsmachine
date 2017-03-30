<template>
  <div id="loading" class="Loading">
    <transition name="loading-content">
      <div v-show="loading && done" class="Loading__layout">
        <div ref="wrapper" class="Loading__wrapper">
          <div class="Loading__content">
            <div class="Loading__audio">
              <div class="Loading__audio--circle">
                <div class="Loading__audio--icon">
                  <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shapeHeadPhones"></use></svg>
                </div>
              </div>
            </div>
            <div class="Loading__content--title">
              UNLOCKS THE SOUND
            </div>
            <div class="Loading__content--subtitle">
              For a better experience use headphones
            </div>
            <div class="Loading__circle">
              <svg class="ip-inner" width="40px" height="40px" viewBox="0 0 80 80">
                <path class="ip-loader-circlebg" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"/>
                <path id="ip-loader-circle" class="ip-loader-circle" d="M40,10C57.351,10,71,23.649,71,40.5S57.351,71,40.5,71 S10,57.351,10,40.5S23.649,10,40.5,10z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="loading-brushes" v-on:after-leave="afterLeave">
      <div v-show="loading && done" class="Loading__brushes">
        <div ref="transition" class="Loading__brushes--transition"></div>
      </div>
    </transition>
  </div>
</template>

<script>
    import {
        isNotMobile, isNotIE
    } from '../utils/Utils';
    import {
        DOC,
        WIN
    } from '../utils/Variables';
    import { loader } from '../utils/Loader';
    import PathLoader from '../models/PathLoader';

    const LIST_IMAGES = [
        'dist/static/img/panel.png',
        'dist/static/img/front2.png',
        'dist/static/img/montain2.png',
        'dist/static/img/oliver.png',
        'dist/static/img/sky1.jpg',
        'dist/static/img/transition.png'
    ];

    let vm, parent, loadImages, simulationFn, progress;

    progress = 0;
    loadImages = function(){
        if ( isNotIE() ) {
            LIST_IMAGES.forEach(function (image) {
            let img = new Image();
            loader.listener(function (endLoad) {
                img.onload = function () {
                endLoad()
                }
            });
            img.src = image;
            })
        }
    };

    loadImages();
    loader.onLoaded = function( loaded, toLoad ) {
        progress = (loaded * 1) / toLoad
    }

    loader.onfinish = function () {
        if ( isNotIE() ) {
            setTimeout(function () {
                vm.loading = false;
                vm.$store.commit('completeLoad');
            },1000);
        }
    };

    simulationFn =  function( instance ){
        let interval = setInterval( function() {
            

            instance.setProgress( progress );


            if( progress === 1 ) {
                clearInterval( interval );
            }
        }, 80 );
    }

    export default {
        name: 'loading',
        data(){
            vm = this;
            parent = vm.$parent;
            return {
                loading: true
            }
        },
        methods: {
            afterLeave(){
                if ( isNotMobile() ) {
                var app = document.getElementById('parallax');
                var parallax = new Parallax(app);
                }
            }
        },
        computed: {
          done(){
              return this.$store.state.machine
          }
        },
        mounted(){

            let pathLoader = new PathLoader( document.getElementById( 'ip-loader-circle' ));
            pathLoader.setProgressFn( simulationFn );


            let frameProportion = 1.78,
                frames = 24,
                resize = false;
            let transitionBackground = vm.$refs.transition;
            
            setLayerDimensions();
            window.addEventListener('resize', function () {
                if( !resize ) {
                resize = true;
                (!window.requestAnimationFrame) ? setTimeout(setLayerDimensions, 300) : window.requestAnimationFrame(setLayerDimensions);
                }
            });
            vm.$store.commit('reviewBrowser');
            function setLayerDimensions() {
                var windowWidth = window.innerWidth+100,
                windowHeight = window.innerHeight,
                layerHeight, layerWidth;

                if( windowWidth/windowHeight > frameProportion ) {
                    layerWidth = windowWidth;
                    layerHeight = layerWidth/frameProportion;
                } else {
                    layerHeight = windowHeight;
                    layerWidth = layerHeight*frameProportion;
                }

                transitionBackground.style.width = layerWidth*frames+'px';
                transitionBackground.style.height = layerHeight+'px';

                resize = false;
            }

            let wrapperClassName = vm.$refs.wrapper.className;
            setTimeout(function(){
                vm.$refs.wrapper.className = `${wrapperClassName} active`;
            }, 500)
        
        }
    }
</script>