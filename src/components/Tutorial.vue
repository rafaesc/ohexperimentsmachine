<template>
    <div id="tutorial" class="Tutorial">
        <div id="Tutorial__contain" class="Tutorial__contain">
            <h1 class="title-main">WELCOME TO OLIVER HELDENS'S EXPERIMENTS MACHINE</h1>
            <div class="Tutorial__contain--subtitles">
                <transition  name="transition-tutorial">
                    <h2 v-if="stepTutorial === 1" key="step1">To begin, press one of the blue triangles,
                        these are the drum loops, only two will play at a time.</h2>
                    <h2 v-if="stepTutorial === 2" key="step2">Now, press one of the magenta triangles, these are the sounds.</h2>
                    <h2 v-if="stepTutorial === 3" key="step3">Done, now go make some music!</h2>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>
    let vm, parent, stepTutorial;

    export default {
        name: 'tutorial',
        data () {
            vm = this;
            parent = vm.$parent;
            return {
                on: false
            }
        },
        computed: {
            stepTutorial () {
                return this.$store.state.stepTutorial
            }
        },
        mounted: function(){

        }
    }
</script>