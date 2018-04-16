<template>
  <div class="setting">
      <!-- 头像 -->
      <section class="avatar">
        <img v-if="url" :src="url" alt="头像">
        <icon v-else name="user" />
      </section>
    
    <!-- 系统设置 -->
      <section>
        <van-cell-group>
            <van-cell title="数据备份" is-link />
            <van-cell title="时段管理" is-link />
            <van-cell title="整点报时" is-link  :value="isOpen ? '已开启' : '已关闭'" />
        </van-cell-group>
      </section>

        <!-- 反馈与商店 -->
      <section>
        <van-cell-group>
            <van-cell title="主题商店" is-link />
            <van-cell title="给作者反馈" is-link />
            <van-cell title="更新日志" is-link />
        </van-cell-group>
      </section>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'; // @ is an alias to /src
import { Cell, CellGroup } from 'vant';

// import Avatar from '@/components/common/Avatar/Avatar.vue'


@Component({
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
  },
})
export default class Setting extends Vue {
    private url: string;
    private isOpen: boolean;
    public data() {
    return {
        url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4216091012,4283409120&fm=27&gp=0.jpg',
        isOpen: false,
    }
  }

}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';

section {
    width: 100%;
}

.setting {
  height: calc(100vh - 7rem);
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  .avatar {
      width: 4.5rem;
      height: 4.5rem;
      img {
        width: 100%;
        height: 100%;
        @include borderRadius(50%);
      }
  }
  svg {
      width: 5rem;
      height: 5rem;
  }
}

</style>
