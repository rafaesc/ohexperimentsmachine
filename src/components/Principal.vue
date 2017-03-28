<template>
    <div id="principal" class="Principal">
        <div class="Principal__wrapper">
            <div class="Principal__content">
                <div class="Principal__content--left">
                    <a @click="redirect('facebook')" href="https://www.facebook.com/OliverHeldens" target="_blank" class="Principal__button">
                    <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shapeFacebook"></use></svg>
                    </a>
                    <a @click="redirect('twitter')" href="https://twitter.com/OliverHeldens" target="_blank" class="Principal__button">
                    <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shapeTwitter"></use></svg>
                    </a>
                    <a @click="redirect('instagram')" href="http://instagram.com/oliverheldens" target="_blank" class="Principal__button">
                    <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shapeInstagram"></use></svg>
                    </a>
                </div>
                <div class="Principal__content--right">
                    <div :class="['Menu', (activeMenu) ? 'active' : '']" @click.prevent="openMenu">
                        <div class="Menu__contain">
                            <div class="Menu__toggle">
                                <div class="Menu__hamburger"></div>
                            </div>
                            <div class="Menu__text">
                                MENU
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div ref="principalMenu" :class="['Principal__menu', (activeMenu) ? 'active' : '']">
                <div ref="share" class="ShareModal">
                    <div class="ShareModal__wrapper">
                        <div class="ShareModal__contain">
                            <div class="ShareModal__body">
                                <div class="ShareModal__head">
                                    You can share your experiment 
                                </div>
                                <div class="ShareModal__footer">
                                    <div class="ShareModal__button">
                                        <div @click.prevent="shareFacebook" class="ShareModal__button--icon facebook-icon">
                                            <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shapeFacebook"></use></svg>
                                        </div>
                                    </div>
                                    <div class="ShareModal__button">
                                        <div @click.prevent="shareTwitter" class="ShareModal__button--icon twitter-icon">
                                            <svg><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shapeTwitter"></use></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div ref="sailL" class="Principal__menu--sail-l"></div>
                <div ref="lineWrap" class="Principal__menu--line"></div>
                <div ref="sailR" class="Principal__menu--sail-r"></div>
                <div ref="menuContent" class="Principal__menu--content">
                    <div class="item-wrapper no-hover">
                        <span class="item-menu">OFFICIAL SITES</span>
                    </div>
                    <div class="item-wrapper">
                        <a @click="redirect('shop')" href="http://www.oliverheldensshop.com/?utm_source=ohexperimentsmachine.com&utm_campaign=ohexperimentsmachine" target="_blank" class="item-menu">SHOP</a>
                    </div>
                    <div class="item-wrapper">
                        <a @click="redirect('tour')" href="http://oliverheldens.tumblr.com/tour" target="_blank" class="item-menu">TOUR</a>
                    </div>
                    <div class="item-wrapper">
                        <a @click="redirect('beatport')" href="http://www.beatport.com/artist/oliver-heldens/314140" target="_blank" class="item-menu">BEATPORT</a>
                    </div>
                    <div class="item-wrapper">
                        <a @click="redirect('spotify')" href="https://play.spotify.com/artist/5nki7yRhxgM509M5ADlN1p?play=true&utm_source=ohexperimentsmachine.com&utm_medium=ohexperimentsmachine" target="_blank" class="item-menu">SPOTIFY</a>
                    </div>
                    <div class="item-wrapper">
                        <a @click="redirect('soundcloud')" href="http://soundcloud.com/oliverheldens" target="_blank" class="item-menu">SOUNDCLOUD</a>
                    </div>
                </div>
            </div>
        </div>
        <div class="looper" :class="{ active: looper }"></div>
    </div>
</template>

<script>

    let vm, parent, inTransition;

    const BODY = document.body;

    const TITLE = "Check out the mix I made with $user Experiments Machine";
    const USER_FACEBOOK = 'Oliver Heldens';
    const USER_TWITTER = '@OliverHeldens';
    const DESCRIPTION = "I just made this mix with Oliver Heldens Experiments Machine";

    inTransition = false;
    export default {
        name: 'principal',
        data () {
            vm = this;
            parent = vm.$parent;
            return {
                activeMenu: false,
                showMenu: false
            }
        },
        computed: {
            clearScreen() {
                let storeState = this.$store.state;
                return (storeState.doneTutorial && storeState.doneLoad && storeState.machine);
            },
            looper(){
                return this.$store.state.looper;
            }
        },
        watch: {
            clearScreen( value ) {
                if ( value ) {
                    let principal = vm.$el;
                    TweenLite.to(principal, 1, {ease: Power1.easeOut, top:0, delay: 1})
                }
            },
            activeMenu(value){
                let sailL = vm.$refs.sailL;
                let sailR = vm.$refs.sailR;
                let share = vm.$refs.share;
                let principalMenu = vm.$refs.principalMenu;
                let lineWrap = vm.$refs.lineWrap;
                let menuContent = vm.$refs.menuContent;
                let timeEndTransition;
                if ( value ) {
                    ga('send', 'event', 'Menu', 'open');
                    TweenLite.to(principalMenu, 0, {top:0});
                    TweenLite.to(sailR, 1, {ease: Power1.easeOut, top:0});
                    TweenLite.to(sailL, 1, {ease: Power1.easeOut, top:0, delay: 0.1});
                    TweenLite.to(lineWrap, 0.5, {ease: Power1.easeOut, top:0, delay: 1});
                    TweenLite.to(share, 0.5, {opacity:1, delay: 1});
                    
                    timeEndTransition = 1600;
                } else {
                    ga('send', 'event', 'Menu', 'close');
                    TweenLite.to(principalMenu, 1, {top:"-100%", delay: 0})
                    TweenLite.to(lineWrap, 0, {top:'-100%', delay: 1});
                    TweenLite.to(sailL, 0, {top:'-100%', delay: 1});
                    TweenLite.to(sailR, 0, {top:'-100%', delay: 1});
                    TweenLite.to(share, 0, {opacity:0, delay: 1});

                    timeEndTransition = 1100;
                }
                setTimeout(function(){
                    inTransition = false;
                    if ( !value ) {
                        BODY.style.overflowY = "";
                    }
                },timeEndTransition)
            }
        },
        methods: {
            redirect(type){
                ga('send', 'event', 'Link', 'redirect', type);
                console.debug(type);
            },
            openMenu(){
                if ( !inTransition ) {
                    inTransition = true;
                    BODY.style.overflowY = "hidden";
                    vm.activeMenu = !vm.activeMenu;
                }
            },
            shareFacebook(){
                let title = TITLE.replace('$user', USER_FACEBOOK);

                FB.ui({
                method: 'feed',
                link: window.location.href,
                title: title,
                description: DESCRIPTION,
                }, function(response){
                    if ( response ) {
                        ga('send', 'social', 'facebook', 'share', window.location.href);
                    }
                });
            },
            shareTwitter(){
                let text = TITLE.replace('$user', USER_TWITTER);
                text = `${text} #ExperimentsMachine ${window.location.href}`;
                window.open("https://twitter.com/intent/tweet?text=" + encodeURIComponent(text), "_blank");
                ga('send', 'social', 'twitter', 'tweet', window.location.href);
            }
        },
        mounted(){
            
        }
    }

</script>