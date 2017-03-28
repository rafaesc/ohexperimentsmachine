<template>
  <footer id="credits" class="Credits">
    <aside class="Credits__arrow" @click="activeCredits">
      <div class="Credits__arrow--container">
        <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shapeThinArrow"></use></svg>
      </div>
    </aside>

    <section class="Credits__footer">
      <div class="Credits__footer--container">
        <div class="row">
          <div class="Credits__content">
            <img src="dist/assets/img/logo_white.png" width="120">
            <br><br>
            <p>Oliver Heldens Experiments Machine is a non-commercial and unofficial game created by me, Rafael Escala.</p>
            <div class="Credits__row">
              <div class="Credits__icon">
                <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shapeEmail"></use></svg>
              </div>
              <div class="Credits__text">
                <a @click="redirect('email')" href="mailto:rafaesc92@gmail.com">rafaesc92@gmail.com</a>
              </div>
            </div>
            <div class="Credits__row">
              <div class="Credits__icon">
                <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shapeLinkedin"></use></svg>
              </div>
              <div class="Credits__text">
                <a @click="redirect('linkedin')" href="https://www.linkedin.com/in/rafaelescala/" target="_blank">https://www.linkedin.com/in/rafaelescala/</a>
              </div>
            </div>

            <div class="Credits__row">
              <div class="Credits__text">
                Source Code <a @click="redirect('github')" href="https://github.com/rafaesc92/ohexperimentsmachine" target="_blank">https://github.com/rafaesc92/ohexperimentsmachine</a>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </footer>
</template>

<script>
  import { isNotMobile } from '../utils/Utils';

  let vm, parent, toggle;

  toggle = false;
  export default {
    name: 'credits',
    data () {
      vm = this;
      parent = vm.$parent;
      return {

      }
    },
    methods: {
      redirect(type){
        ga('send', 'event', 'Link', 'redirect', type);
        console.debug(type);
      },
      activeCredits(){
        ga('send', 'event', 'Credits', 'click');
        if ( isNotMobile() ) {
          if ( toggle ) {
            vm.$el.className = 'Credits';
            toggle = false;
          } else {
            toggle = true;
            vm.$el.className ='Credits active';
          }
        }
      }
    },
    mounted(){
    }
  }
</script>