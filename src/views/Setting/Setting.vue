<template>
  <div class="setting">
      <!-- 头像 -->
      <section class="avatar">
      <vue-lazy-component :timeout="1000">
        <router-link :to="{path:'/login'}">
          <div>
            <img v-if="user.url" :src="user.url" alt="头像">
            <icon v-else name="user" />
            <p v-if="user.username">{{user.username}}</p>
          </div>
        </router-link>
        <Skeleton slot="skeleton"/>
        </vue-lazy-component>
      </section>
    
    <!-- 系统设置 -->
      <section>
        <van-cell-group>
            <van-cell clickable title="数据备份" @click="globelSync" :is-link="false" />
            <van-switch-cell v-model="setting.checked"  @change="change" title="整点报时" />
        </van-cell-group>
      </section>
        <!-- 反馈与商店 -->
      <section>
        <van-cell-group>
            <van-cell title="主题商店" @click="handleToast" is-link />
            <router-link :to="{path:'/feedback'}">
              <van-cell title="给作者反馈" is-link />
            </router-link>
            <router-link :to="{path:'/update'}">
              <van-cell title="更新日志" is-link />
            </router-link>
        </van-cell-group>
      </section>
    <section>
      <van-button v-if="user.id" bottom-action @click="logout" >退出登录</van-button>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Cell, CellGroup, SwitchCell, Toast, Button } from 'vant';
import { State, Mutation, Action, Getter } from 'vuex-class';
import { SettingState, UserState } from '@/store/state';

import Skeleton from '@/components/common/Skeleton/SkeletonCircle.vue';

@Component({
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [SwitchCell.name]: SwitchCell,
    [Button.name]: Button,
    Skeleton,
  },
})
export default class Setting extends Vue {
  @State private setting!: SettingState;
  @State private user!: UserState;
  @Getter private syncData: any;
  @Mutation private changeHourly!: (checked: boolean) => void;
  @Mutation private logoutSuccess!: () => void;
  @Action private sync!: (data: any) => void;
  private isOpen!: boolean;
  public data() {
    return {
      isOpen: false,
      checked: false,
    };
  }

  private change(checked: boolean) {
    this.changeHourly(checked);
  }

  private globelSync() {
    if (!this.user.id) {
      Toast('请先登录');
      return;
    }
    this.sync({
      syncData: this.syncData,
      id: this.user.id,
    });

    if (this.user.isSync === 1) {
      Toast('同步成功');
    }
  }

  private logout() {
    // 先同步再退出
    this.globelSync();
    this.logoutSuccess();
    // 清楚本地缓存
    localStorage.removeItem('vuex');
  }

  private handleToast() {
    Toast('敬请期待!');
  }
}
</script>
<style lang="scss" scoped>
@import '../../style/mixin';

section {
  width: 100%;
  text-align: left;
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
    margin-bottom: 1rem;
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
  .van-button {
    background-color: $warn;
  }
  .van-cell {
    display: flex;
    // justify-content: flex-start;
    // flex-direction: row;
    // align-items: center;
  }
}
</style>
