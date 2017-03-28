<template>
  <div id="app" class="App ">
    <principal></principal>
    <loading></loading>
    <div class="Machine__Parallax">
      <ul id="parallax"
          data-limit-y="0" :class="'Parallax '+scene+' ie-'+isIE">
        <li v-for="(layer, index) in layers"
            class="layer Parallax__layer"
            v-bind:data-depth="layer.depth">
          <div class="Parallax__layer--background" :class="'layer-'+layer.class">
            <game v-if="layer.class === 'game'"></game>
            <spectrum v-if="layer.class === 'spectrum'"></spectrum>
          </div>
        </li>
      </ul>
    </div>
    <credits></credits>
    <svg xmlns="http://www.w3.org/2000/svg" width="0" height="0" style="display:none">
      <symbol id="shapeLinkedin" viewBox="0 0 42 42"> <path class="st0" d="M37.2,1H4.8C2.7,1,1,2.7,1,4.8v32.4C1,39.3,2.7,41,4.8,41h32.4c2.1,0,3.8-1.7,3.8-3.8V4.8C41,2.7,39.3,1,37.2,1 z M11.2,8.6c1.7,0,2.8,1.2,2.8,2.9c0,1.6-1.1,2.9-2.9,2.9c-1.7,0-2.8-1.3-2.8-2.9S9.5,8.6,11.2,8.6z M14.3,33.4H8.6V16.2h5.7V33.4z M35.3,33.4h-5.6v-9c0-2.3-0.6-3.8-2.7-3.8c-1.5,0-2.5,1-2.9,2C24,23,23.9,23.5,23.9,24v9.4h-5.8c0,0,0.1-15.7,0-17.3h5.8v2.4 c0.7-1.1,2.1-2.8,5.1-2.8c3.7,0,6.3,2.9,6.3,8V33.4z"></path> <path class="st0" d="M23.9,18.6L23.9,18.6C23.9,18.5,23.9,18.6,23.9,18.6L23.9,18.6z"></path> </symbol>
      <symbol id="shapeThinArrow" viewBox="0 0 24 14"><polygon class="st0" points="12.1,2.7 22.4,13 23.3,12.1 12.1,1 1,12.1 1.9,13 "></polygon></symbol>
      <symbol id="shapeHeadPhones" viewBox="0 0 512 512"><path d="M512,336v64c0,35.344-28.656,64-64,64c-17.688,0-32-14.313-32-32V240c0-88.375-71.625-160-160-160  c-88.359,0-160,71.625-160,160v192c0,17.688-14.313,32-32,32c-35.344,0-64-28.656-64-64v-64c0-35.344,28.656-64,64-64v-32  c0-106.031,85.969-192,192-192s192,85.969,192,192v32C483.344,272,512,300.656,512,336z"/></symbol>
      <symbol id="shapeFacebook" viewBox="0 0 512 512"><path d="M223.22,71.227c16.066-15.298,38.918-20.465,60.475-21.109c22.799-0.205,45.589-0.081,68.388-0.072   c0.09,24.051,0.098,48.111-0.009,72.161c-14.734-0.026-29.478,0.036-44.212-0.026c-9.343-0.582-18.937,6.5-20.635,15.762   c-0.224,16.093-0.081,32.195-0.072,48.289c21.61,0.089,43.22-0.027,64.829,0.054c-1.582,23.281-4.47,46.456-7.858,69.541   c-19.088,0.179-38.187-0.018-57.274,0.099c-0.17,68.665,0.089,137.33-0.134,205.995c-28.352,0.116-56.721-0.054-85.072,0.08   c-0.537-68.674,0.044-137.383-0.295-206.066c-13.832-0.144-27.672,0.099-41.503-0.116c0.053-23.085,0.018-46.169,0.026-69.246   c13.822-0.169,27.654,0.036,41.477-0.098c0.42-22.442-0.421-44.91,0.438-67.333C203.175,101.384,209.943,83.493,223.22,71.227z"/></symbol>
      <symbol id="shapeTwitter" viewBox="0 0 512 512"><path d="M512,97.209c-18.838,8.354-39.082,14.001-60.329,16.54c21.687-13,38.343-33.585,46.187-58.114  c-20.299,12.038-42.778,20.779-66.705,25.489c-19.16-20.415-46.461-33.17-76.674-33.17c-58.012,0-105.043,47.029-105.043,105.039  c0,8.233,0.929,16.25,2.72,23.939c-87.3-4.382-164.701-46.2-216.509-109.753c-9.042,15.514-14.224,33.558-14.224,52.809  c0,36.444,18.544,68.596,46.73,87.433c-17.219-0.546-33.416-5.271-47.577-13.139c-0.01,0.438-0.01,0.878-0.01,1.321  c0,50.894,36.209,93.348,84.261,103c-8.813,2.398-18.094,3.686-27.674,3.686c-6.77,0-13.349-0.66-19.764-1.887  c13.367,41.73,52.159,72.104,98.126,72.949c-35.95,28.175-81.243,44.967-130.458,44.967c-8.479,0-16.841-0.497-25.059-1.471  c46.486,29.806,101.701,47.197,161.021,47.197c193.211,0,298.868-160.063,298.868-298.873c0-4.554-0.104-9.084-0.305-13.59  C480.11,136.773,497.918,118.273,512,97.209z"/></symbol>
      <symbol id="shapeInstagram" viewBox="0 0 512 512"><path	d="M256,49.471c67.266,0,75.233.257,101.8,1.469,24.562,1.121,37.9,5.224,46.778,8.674a78.052,78.052,0,0,1,28.966,18.845,78.052,78.052,0,0,1,18.845,28.966c3.45,8.877,7.554,22.216,8.674,46.778,1.212,26.565,1.469,34.532,1.469,101.8s-0.257,75.233-1.469,101.8c-1.121,24.562-5.225,37.9-8.674,46.778a83.427,83.427,0,0,1-47.811,47.811c-8.877,3.45-22.216,7.554-46.778,8.674-26.56,1.212-34.527,1.469-101.8,1.469s-75.237-.257-101.8-1.469c-24.562-1.121-37.9-5.225-46.778-8.674a78.051,78.051,0,0,1-28.966-18.845,78.053,78.053,0,0,1-18.845-28.966c-3.45-8.877-7.554-22.216-8.674-46.778-1.212-26.564-1.469-34.532-1.469-101.8s0.257-75.233,1.469-101.8c1.121-24.562,5.224-37.9,8.674-46.778A78.052,78.052,0,0,1,78.458,78.458a78.053,78.053,0,0,1,28.966-18.845c8.877-3.45,22.216-7.554,46.778-8.674,26.565-1.212,34.532-1.469,101.8-1.469m0-45.391c-68.418,0-77,.29-103.866,1.516-26.815,1.224-45.127,5.482-61.151,11.71a123.488,123.488,0,0,0-44.62,29.057A123.488,123.488,0,0,0,17.3,90.982C11.077,107.007,6.819,125.319,5.6,152.134,4.369,179,4.079,187.582,4.079,256S4.369,333,5.6,359.866c1.224,26.815,5.482,45.127,11.71,61.151a123.489,123.489,0,0,0,29.057,44.62,123.486,123.486,0,0,0,44.62,29.057c16.025,6.228,34.337,10.486,61.151,11.71,26.87,1.226,35.449,1.516,103.866,1.516s77-.29,103.866-1.516c26.815-1.224,45.127-5.482,61.151-11.71a128.817,128.817,0,0,0,73.677-73.677c6.228-16.025,10.486-34.337,11.71-61.151,1.226-26.87,1.516-35.449,1.516-103.866s-0.29-77-1.516-103.866c-1.224-26.815-5.482-45.127-11.71-61.151a123.486,123.486,0,0,0-29.057-44.62A123.487,123.487,0,0,0,421.018,17.3C404.993,11.077,386.681,6.819,359.866,5.6,333,4.369,324.418,4.079,256,4.079h0Z"/>
        <path d="M256,126.635A129.365,129.365,0,1,0,385.365,256,129.365,129.365,0,0,0,256,126.635Zm0,213.338A83.973,83.973,0,1,1,339.974,256,83.974,83.974,0,0,1,256,339.973Z"/><circle cx="390.476" cy="121.524" r="30.23"/></symbol>
      <symbol id="shapeEmail" viewBox="0 0 1000 1000"><g xmlns="http://www.w3.org/2000/svg"><path d="M612,591.7C556.7,636,522.2,658,487.8,658c-33,0-66.4-20.6-118-60.8L62.7,867.5h864.9L615.5,589.1C614.3,589.9,613,591,612,591.7z"/><path d="M247.7,502.7C174.8,446.5,90.7,381.5,10,317.6v509.5c0,1.6,0.8,3,0.9,4.5l309.6-272.5C298.1,541.6,274,523.1,247.7,502.7z"/><path d="M987.6,838.9c1.2-3.7,2.4-7.6,2.4-11.8V296c-96.9,75.4-237.2,184.6-325.8,254.5L987.6,838.9z"/><path d="M928.8,132.5H71.3c-22.4,0-61.3,38.9-61.3,61.3V242c90.3,71.9,188.4,147.6,271.5,211.7c45.8,35.4,86.9,67.2,119.3,92.5c87.4,68.5,87.4,68.5,176.6-2.8C658.1,479,875.2,310.1,990,220.8v-26.9C990,171.4,951.1,132.5,928.8,132.5z"/></g></symbol>
    </svg>
  </div>
</template>

<script>
  import {
          isNotChrome,
          isNotMobile,
          isChrome,
          isIE,
          isMobile
  } from './utils/Utils';
  import Store from './utils/Store';
  import spectrum from './components/Spectrum.vue';
  import RAFTimeout from './utils/RAFTimeout';
  import game from './components/Game.vue';
  import credits from './components/Credits.vue';
  import loading from './components/Loading.vue';
  import principal from './components/Principal.vue';
  import {
          DOC, WIN, PANEL_CONTAIN,
          LAYOUT_CONTAIN, TUTORIAL_CONTAIN,
          DONE_TUTORIAL_STORE
  } from './utils/Variables'

  const SECONDS_CHANGE_SCENE = 30;

  let vm, root, rafTimeout, listBackground, scene,
          resizePanel;

  resizePanel = function(){
    if ( !vm.doneTutorial ) {
      let panelContainTop, tutorialContainHeight,
              panelContain, tutorialContain, layoutContain;

      panelContain = DOC.getElementById(PANEL_CONTAIN);
      tutorialContain = DOC.getElementById(TUTORIAL_CONTAIN);
      layoutContain = DOC.getElementById(LAYOUT_CONTAIN);
      panelContainTop = panelContain.offsetTop - 76 - 18;
      tutorialContainHeight = tutorialContain.clientHeight;

      if ( panelContainTop < tutorialContainHeight ) {

        function resize(element) {
          let distance = tutorialContainHeight + 76 + 18 + 120;
          element.style.top = `${distance}px`;
        }

        resize(panelContain);
        resize(layoutContain);
      }
    }

  };

  scene = 'night';
  listBackground = [
    {
      depth: '1.00',
      class: 'sky1',
      type: 'night'
    },
    {
      depth: '0.70',
      class: 'montain2',
      type: 'night'
    },
    {
      depth: '0.60',
      class: 'spectrum'
    },
    {
      depth: '0.40',
      class: 'front2',
      type: 'night'
    },
    {
      depth: '0.60',
      class: 'game'
    }
  ];

  rafTimeout = RAFTimeout();

  export default {
    name: 'app',
    components: {
      'game': game,
      'spectrum': spectrum,
      'loading': loading,
      'principal': principal,
      'credits': credits
    },
    data () {
      vm = this;
      root = vm.$root;
      return {
        scene,
        layers: listBackground,
        centerBars: {},
        outSideBars: {},
        particlesOutSide: {},
        particleBeat:{},
        isIE : isIE(),
        rafTimeout
      }
    },
    computed: {
      doneTutorial () {
        return this.$store.state.doneTutorial;
      }
    },
    mounted: function(){
      resizePanel();


      WIN.addEventListener('resize', function () {
        resizePanel();
      })

    }
  }
</script>

<style>

</style>
