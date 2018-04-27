import moment from 'moment';

import {State, HabitList} from './state';
import config from '@/config';
import _ from '@/utils';

export default {

    // 切换活动图标的状态
    getActivePage(state: State, id: number) {
        state
            .activePage
            .map((item) => {
                // 将当前活动的页脚图表点亮
                if (item.id !== id) {
                    item.isActived = false;
                } else {
                    item.isActived = true
                }
            })
    },

    // 切换header上图标
    changeHeaderState(state: State, id: number) {
        const {headerInfo} = state;
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
        state
            .habitList
            .push(habit);
    },
    selectDate(state: State, payload: {habitId: number, id: number}) {
        const list = state.habitList
        const len = list.length;
        const {RepeatingDate} = _.find(list, payload.habitId)!.habitInfo;

        (RepeatingDate as any[]).forEach((element) => {
            if (element.id === payload.id) {
                element.checked = false;
            }
        });

    },
    // 切换练习的时间段
    changeTimes(state: State, payload: {habitId: number, id: number}) {
        const list = state.habitList
        const habit = _.find(list, payload.habitId);

        habit !.habitInfo.activeTimes = payload.id;
    },
    // 选择图标背景
    selectColor(state: State, payload: {id: number, color: string}) {
        const list = state.habitList
        const habit = _.find(list, payload.id);

        habit !.color = payload.color;
    },
    // 选择图标
    selectIcon(state: State, payload: {id: number, icon: string}) {
        const list = state.habitList
        const habit = _.find(list, payload.id);

        habit !.iconName = payload.icon;
    },
    // 切换提醒时间
    switchRemind(state: State, payload: {habitId: number, id: number}) {
        const list = state.habitList
        const {remind} = _.find(list, payload.habitId)!.habitInfo;
        (remind as any[]).forEach((item) => {
            if (item.id === payload.id) {
                item.isOpen = !item.isOpen
            }
        })
    },
    // 习惯名称
    changeName(state: State, payload: {id: number, value: string}) {
        const list = state.habitList
        const habit = _.find(list, payload.id);
        habit !.habitInfo.habitName = payload.value;
    },
    // 绑定激励的话
    changInspire(state: State, payload: {id: number, value: string}) {
        const list = state.habitList
        const habit = _.find(list, payload.id);
        habit !.habitInfo.inspire = payload.value;
    },
    // 将处于创建状态的习惯切换到完成状态
    changeMode(state: State, payload: {id: number, value: string}) {
        const list = state.habitList
        const habit = _.find(list, payload.id);

        habit !.isActive = true;
        habit !.mode = payload.value;
    },
    // 将此习惯归档
    deleteHabit(state: State, id: number) {
        const list = state.habitList
        const habit = _.find(list, id);
        habit !.isActive = false;
    },
    // 删除此习惯
    removeHabit(state: State, id: number) {
        const list: HabitList[] = state.habitList
        state.habitList = list.filter((item) => item.id !== id)
    },
    // 重新激活此习惯
    activateHabit(state: State, id: number) {
        const list = state.habitList
        const habit = _.find(list, id);
        habit !.isActive = true;
    },
    // 获取需要当天执行的习惯
    changeCollapse(state: State, activeNames: number[] | never[]) {
        const today = state.today
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
                habit !
                .habitLog
                .date
                .push({id: newId, time: today, isFinished: false, message: ''})
            }
    },
    // 切换当前习惯是否完成
    changeFinished(state: State, payload: {id: number, daysId: number}) {
        const today = moment();
        const list = state.habitList
        const habit = _.find(list, payload.id);
        const date = habit !
            .habitLog
            .date
            .find((item) => item.id === payload.daysId);
        // 切换完成状态
        date!.isFinished = !date!.isFinished;
        if (date!.isFinished) {
            habit!.habitLog.currentConsecutiveDays ++
            habit!.habitLog.totalHabitDays ++
        } else {
            habit!.habitLog.currentConsecutiveDays --
            habit!.habitLog.totalHabitDays --
        }

    },
    // 储存打卡日志
    saveLog(state: State, payload: {id: number, daysId: number, message: string}) {
        const list = state.habitList
        const habit = _.find(list, payload.id);
        const day = habit !
            .habitLog
            .date
            .find((item) => item.id === payload.daysId);
        day !.message = payload.message;
    },

    // 领取卡片
    receiveCard(state: State) {
        const today = moment();
        // @ts-ignore
        state
            .today
            .finishedDate
            .push(today);
        state.today.isReceived = true;
    },
    // 登陆成功后执行
    loginLoading(state: State, data: any) {

            state.user!.isLogin = 0;
    },
    // 登陆成功后执行
    loginSuccess(state: State, data: any) {
        state.user!.id = data.id;
        state.user!.username = data.username;
        state.user!.url = data.url;
        state.user!.isLogin = 1;
        },
    // 是否开启整点报时
    changeHourly(state: State, checked: boolean) {

        state.setting.checked = checked

    },
    // 是否同步成功
    sync(state: State, isSync: number) {
        state.user!.isSync = isSync;

    },
}
