<template>
    <div id="upgrade" class="Upgrade">
        <div class="Upgrade__content">
            <div class="Upgrade__title">
                Sorry your browser is not supported for this experience
            </div>
            <div class="Upgrade__video"></div>
            <div class="Upgrade__text">
                Please try in the latest version of Chrome, Firefox or Microsoft Edge
            </div>
        </div>
    </div>
</template>
<script>

    let vm, root;

    export default {
        name: 'upgrade',
        data () {
            vm = this;
            root = vm.$root;
            return {

            }
        },
        methods: {
            
        },
        mounted(){
        }
    }

</script>