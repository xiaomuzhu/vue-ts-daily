<template>
  <div class="setting">
      <!-- 头像 -->
      <section class="avatar">
        <img v-if="user.url" :src="user.url" alt="头像">
        <icon v-else name="user" />
      </section>
    
    <!-- 系统设置 -->
      <section>
        <van-cell-group>
            <van-cell title="数据备份" is-link />
            <van-switch-cell v-model="setting.checked"  @change="change" title="整点报时" />
        </van-cell-group>
      </section>

        <!-- 反馈与商店 -->
      <section>
        <van-cell-group>
            <van-cell title="主题商店" is-link />
            <router-link :to="{path:'/feedback'}">
              <van-cell title="给作者反馈" is-link />
            </router-link>
            <router-link :to="{path:'/update'}">
              <van-cell title="更新日志" is-link />
            </router-link>
        </van-cell-group>
      </section>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'; // @ is an alias to /src
import { Cell, CellGroup, SwitchCell } from 'vant';
import { State, Mutation } from 'vuex-class';
import { SettingState, UserState } from '@/store/state';

@Component({
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [SwitchCell.name]: SwitchCell,
  },
})
export default class Setting extends Vue {
    @State private setting: SettingState;
    @State private user: UserState;
    @Mutation private changeHourly: (checked: boolean) => void;
    private url: string;
    private isOpen: boolean;
    public data() {
    return {
        url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4216091012,4283409120&fm=27&gp=0.jpg',
        isOpen: false,
        checked: false,
    }
  }

  private change(checked: boolean) {
    this.changeHourly(checked)

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
