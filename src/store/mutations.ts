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
    selectDate(state: State, habitId: number, id: number) {
        const list = state.habitList
        const len = list.length;
        const {RepeatingDate} = _.find(list, habitId)!.habitInfo;

        (RepeatingDate as any[]).forEach((element) => {
            if (element.id === id) {
                element.checked = false;
            }
        });

    },
    // 切换练习的时间段
    changeTimes(state: State, habitId: number, id: number) {
        const list = state.habitList
        const habit = _.find(list, habitId);

        habit !.habitInfo.activeTimes = id;
    },
    // 选择图标背景
    selectColor(state: State, id: number, color: string) {
        const list = state.habitList
        const habit = _.find(list, id);

        habit !.color = color;
    },
    // 选择图标
    selectIcon(state: State, id: number, icon: string) {
        const list = state.habitList
        const habit = _.find(list, id);

        habit !.iconName = icon;
    },
    // 切换提醒时间
    switchRemind(state: State, habitId: number, id: number) {
        const list = state.habitList
        const {remind} = _.find(list, habitId)!.habitInfo;
        (remind as any[]).forEach((item) => {
            if (item.id === id) {
                item.isOpen = !item.isOpen
            }
        })
    },
    // 习惯名称
    changeName(state: State, id: number, value: string) {
        const list = state.habitList
        const habit = _.find(list, id);
        habit !.habitInfo.habitName = value;
    },
    // 绑定激励的话
    changInspire(state: State, id: number, value: string) {
        const list = state.habitList
        const habit = _.find(list, id);
        habit !.habitInfo.inspire = value;
    },
    // 将处于创建状态的习惯切换到完成状态
    changeMode(state: State, id: number, value: string = 'done') {
        const list = state.habitList
        const habit = _.find(list, id);

        habit !.isActive = true;
        habit !.mode = value;
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
    // 切换是否完成习惯
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
    // 切换是否完成习惯
    watchHabits(state: State) {
            const today = moment();
            const newId = _.getDaysId();
            const list = state.habitList
            const habit = _.find(list, id);
            habit !
                .habitLog
                .date
                .push({id: newId, time: today, isFinished: true, message: ''})
    },
    // 切换是否完成习惯
    changeFinished(state: State, id: number) {
        const today = moment();
        const newId = _.getDaysId();
        const list = state.habitList
        const habit = _.find(list, id);
        habit !
            .habitLog
            .date
            .push({id: newId, time: today, isFinished: true, message: ''})
    },
    // 储存打卡日志
    saveLog(state: State, id: number, daysId: number, messages: string) {
        console.log(id, daysId, messages);
        const list = state.habitList
        const habit = _.find(list, id);
        const day = habit !
            .habitLog
            .date
            .find((item) => item.id === daysId);
        day !.message = messages;
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
    // 是否开启整点报时
    changeHourly(state: State, checked: boolean) {

        state.setting.checked = checked

    },
}
