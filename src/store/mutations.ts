import moment from 'moment';

import { State, HabitList } from './state';
import config from '@/config';
import _ from '@/utils';

export default {
  // 切换活动图标的状态
  getActivePage(state: State, id: number) {
    state.activePage.map(item => {
      // 将当前活动的页脚图表点亮
      if (item.id !== id) {
        item.isActived = false;
      } else {
        item.isActived = true;
      }
    });
  },

  // 切换header上图标
  changeHeaderState(state: State, id: number) {
    const { headerInfo } = state;
    switch (id) {
      case 0:
        headerInfo.left = 'letter';
        headerInfo.right = ''; // filter
        headerInfo.title = 'TODAY';
        break;
      case 1:
        headerInfo.left = 'file';
        headerInfo.right = 'new';
        headerInfo.title = '我的习惯';
        break;
      case 2:
        headerInfo.left = '';
        headerInfo.right = ''; // skin
        headerInfo.title = '设置';
        break;
    }
  },

  // 创建习惯
  createHabit(state: State, habit: HabitList) {
    state.habitList.push(habit);
  },
  // 删除未定义好的习惯
  RemoveHabit(state: State) {
    state.habitList.pop();
  },
  // 选择执行的星期
  selectDate(state: State, payload: { habitId: number; id: number }) {
    const list = state.habitList;
    const len = list.length;
    const { RepeatingDate } = _.find(list, payload.habitId)!.habitInfo;

    (RepeatingDate as any[]).forEach(element => {
      if (element.id === payload.id) {
        element.checked = !element.checked;
      }
    });
  },
  // 切换练习的时间段
  changeTimes(state: State, payload: { habitId: number; id: number }) {
    const list = state.habitList;
    const habit = _.find(list, payload.habitId);

    habit!.habitInfo.activeTimes = payload.id;
  },
  // 选择图标背景
  selectColor(state: State, payload: { id: number; color: string }) {
    const list = state.habitList;
    const habit = _.find(list, payload.id);

    habit!.color = payload.color;
  },
  // 选择图标
  selectIcon(state: State, payload: { id: number; icon: string }) {
    const list = state.habitList;
    const habit = _.find(list, payload.id);

    habit!.iconName = payload.icon;
  },
  // 切换提醒时间
  switchRemind(state: State, payload: { habitId: number; id: number }) {
    const list = state.habitList;
    const { remind } = _.find(list, payload.habitId)!.habitInfo;
    (remind as any[]).forEach(item => {
      if (item.id === payload.id) {
        item.isOpen = !item.isOpen;
      }
    });
  },
  // 习惯名称
  changeName(state: State, payload: { id: number; value: string }) {
    const list = state.habitList;
    const habit = _.find(list, payload.id);
    habit!.habitInfo.habitName = payload.value;
  },
  // 绑定激励的话
  changInspire(state: State, payload: { id: number; value: string }) {
    const list = state.habitList;
    const habit = _.find(list, payload.id);
    habit!.habitInfo.inspire = payload.value;
  },
  // 切换习惯当前的状态
  changeMode(state: State, payload: { id: number; value: string }) {
    const list = state.habitList;
    const habit = _.find(list, payload.id);
    habit!.isActive = true;
    habit!.mode = payload.value;
  },
  // 将此习惯归档
  deleteHabit(state: State, id: number) {
    const list = state.habitList;
    const habit = _.find(list, id);
    habit!.isActive = false;
  },
  // 删除此习惯
  removeHabit(state: State, id: number) {
    const list: HabitList[] = state.habitList;
    state.habitList = list.filter(item => item.id !== id);
  },
  // 重新激活此习惯
  activateHabit(state: State, id: number) {
    const list = state.habitList;
    const habit = _.find(list, id);
    habit!.isActive = true;
  },
  // 获取需要当天执行的习惯
  changeCollapse(state: State, activeNames: number[] | never[]) {
    const today = state.today;
    today.active = activeNames;
  },
  // 未添加当日任务的习惯列表进行更新
  updateHabits(state: State, updateList: number[]) {
    const today = moment();
    const newId = _.getDaysId();
    const list = state.habitList;
    for (let index = 0; index < updateList.length; index++) {
      const id = updateList[index];
      const habit = _.find(list, id);

      habit!.habitLog.date.push({
        id: newId,
        time: today,
        isFinished: false,
        message: '',
      });
    }
  },
  // 对习惯的打卡信息进行补签
  supplementHabits(state: State, payload: { id: number; daysId: number }) {
    const list = state.habitList;
    const today = _.getMoment(payload.daysId);
    const habit = _.find(list, payload.id);
    // 储存date信息的数组
    const dateList = habit!.habitLog.date;
    if (dateList.length > 0) {
      for (let index = 0; index < dateList.length; index++) {
        const element = dateList[index];
        if (element.id > payload.daysId) {
          dateList.splice(index, 0, {
            id: payload.daysId,
            time: today,
            isFinished: true,
            message: '',
          });
          habit!.habitLog.currentConsecutiveDays = _.getCurrentMaxDays(
            dateList,
          );

          habit!.habitLog.totalHabitDays++;
          console.log(_.getMaxDays(dateList));

          habit!.habitLog.mostConsecutiveDays = _.getMaxDays(dateList);
          return;
        }
      }
    } else {
      dateList.push({
        id: payload.daysId,
        time: today,
        isFinished: true,
        message: '',
      });
    }
  },
  // 切换当前习惯是否完成
  changeFinished(state: State, payload: { id: number; daysId: number }) {
    const list = state.habitList;
    const habit = _.find(list, payload.id);
    // 储存date信息的数组
    const dateList = habit!.habitLog.date;
    const len = dateList.length;
    // 找到id相关信息
    const date = dateList.find(item => item.id === payload.daysId);
    // 切换完成状态
    date!.isFinished = !date!.isFinished;

    // 当当前信息被切换成"已完成"
    if (date!.isFinished) {
      // 当当前打卡信息属于当天的时候
      if (dateList[len - 1].id === payload.daysId) {
        habit!.habitLog.currentConsecutiveDays++;
      } else {
        habit!.habitLog.currentConsecutiveDays = _.getCurrentMaxDays(dateList);
      }
      habit!.habitLog.totalHabitDays++;
    } else {
      // 当当前打卡信息属于当天的时候
      if (dateList[len - 1].id === payload.daysId) {
        habit!.habitLog.currentConsecutiveDays--;
      } else {
        habit!.habitLog.currentConsecutiveDays = _.getCurrentMaxDays(dateList);
      }
      habit!.habitLog.totalHabitDays--;
      date!.message = '';
    }
    habit!.habitLog.mostConsecutiveDays = _.getMaxDays(dateList);
  },
  // 储存打卡日志
  saveLog(
    state: State,
    payload: { id: number; daysId: number; message: string },
  ) {
    const list = state.habitList;
    const habit = _.find(list, payload.id);
    const day = habit!.habitLog.date.find(item => item.id === payload.daysId);
    day!.message = payload.message;
  },

  // 领取卡片
  receiveCard(state: State) {
    const today = moment();
    // @ts-ignore
    state.today.finishedDate.push(today);
    state.today.isReceived = true;
  },
  // 登陆成功后执行
  loginLoading(state: State, data: any) {
    state.user!.isLogin = 0;
  },
  // 登陆成功后执行
  loginSuccess(state: State, data: any) {
    const currentState = JSON.parse(data.content);

    state.activePage = currentState.activePage;
    state.headerInfo = currentState.headerInfo;
    state.card = currentState.card;
    state.habitList = currentState.habitList;
    state.today = currentState.today;
    state.setting = currentState.setting;

    state.user!.id = data.id;
    state.user!.username = data.username;
    state.user!.url = data.url;
    state.user!.isLogin = 1;
  },
  // 退出登录
  logoutSuccess(state: State) {
    state.user!.id = null;
    state.user!.username = '';
    state.user!.url =
      'https://is4-ssl.mzstatic.com/image/thumb/Purple71/v4/be/13/06/be1306d8-e343-2adb-2b04-9a6884300499/pr_source.jpg/1200x630bb.jpg';
    state.user!.isLogin = -1;
  },
  // 是否开启整点报时
  changeHourly(state: State, checked: boolean) {
    state.setting.checked = checked;
  },
  // 是否同步成功
  sync(state: State, isSync: number) {
    state.user!.isSync = isSync;
  },
};
