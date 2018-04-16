<template>
    <div class="avatar">
        <img v-if="urls" :src="urls" alt="头像" />
        <icon v-else name="wudao" />
    </div>
</template>

<script lang="ts">
    import { Component, Vue, Prop } from 'vue-property-decorator';
    // import { Icon } from 'vant';

    @Component({

    })
    export default class Avatar extends Vue {
        @Prop()
        private url: string
        private urls: string
        private data() {
            return {
                urls: this.url,
            }
        }

    }
</script>

<style src="./style.scss" lang="scss" scoped>

.avatar {
    height: 35rem;
    svg {
        width: 5rem;
        height: 5rem;
    }
}

</style>

