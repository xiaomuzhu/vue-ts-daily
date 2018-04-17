import moment from 'moment';

import { State, HabitList } from './state';
import config from '@/config';


export default {

    // 切换活动图标的状态
    getActivePage(state: State, id: number) {
        state.activePage.map((item) => {
            // 将当前活动的页脚图表点亮
            if (item.id !== id) { item.isActived = false; } else {
                item.isActived = true
            }
        })
    },

    // 切换header上图标
    changeHeaderState(state: State, id: number) {
        const { headerInfo } = state;
        switch (id) {
            case 0:
            headerInfo.left = 'letter';
            headerInfo.right = 'filter';
            headerInfo.title = 'TODAY';
            break;
            case 1:
            headerInfo.left = 'file';
            headerInfo.right = 'new';
            headerInfo.title = '我的习惯';
            break;
            case 2:
            headerInfo.left = '';
            headerInfo.right = 'skin';
            headerInfo.title = '设置';
            break;
        }
    },

    // 切换活动图标的状态
    createHabit(state: State, id: number) {
        const timestamp = ( new Date()).valueOf();
        const iconInfo = id === 0 ? config.newHabit : config.habitLibrary.find((item) => item.id === id);
        const habit = {
            id: timestamp,
            iconName: iconInfo!.name,
            color: '#ffe884',
            isCreating: true,
            habitInfo: {
              // 习惯名称
              habitName: iconInfo!.title,
              // 重复练习的日期
              RepeatingDate: [{id: 0, date: '星期一', checked: true}, {id: 1, date: '星期二', checked: true}, {id: 2, date: '星期三', checked: true}, {id: 3, date: '星期四', checked: true}, {id: 4, date: '星期五', checked: true}, {id: 5, date: '星期六', checked: true}, {id: 6, date: '星期日', checked: true}],
              // 练习的时间段
              activeTimes: 0,
              timeSlotList: [{
                id: 0,
                isActive: true,
                title: '起床之后',
            },
            {
                id: 1,
                isActive: false,
                title: '晨间习惯',
            },
            {
                id: 2,
                isActive: false,
                title: '中午时分',
            },
            {
                id: 3,
                isActive: false,
                title: '午间习惯',
            },
            {
                id: 4,
                isActive: false,
                title: '晚间习惯',
            },
            {
                id: 5,
                isActive: false,
                title: '睡觉之前',
            },
            {
                id: 6,
                isActive: false,
                title: '任意时间',
            },
        ],
              // 提醒的时间
              remind: [],
              // 激励自己的话
              inspire: '',
            },
            habitLog: {
              // 总共坚持练习了多少天
              totalHabitDays: '0天',
              // 当前连续联系了多少天
              currentConsecutiveDays: 0,
              // 历史上最多连续练习多少天
              mostConsecutiveDays: 0,
              // 创建日期
              createdTime: moment(timestamp).format('YYYY-MM-DD'),
              // 创建此习惯至今多少天
              totalDays: parseInt(moment(timestamp).fromNow(true)),
              // 坚持的日期
              date: [],
            },
        };
        state.habitList.push(habit);
    },
    selectDate(state: State, id: number) {
        const list = state.habitList
        const len = list.length;
        const {RepeatingDate} = list[len - 1].habitInfo;

        (RepeatingDate as any[]).forEach((element) => {
            if (element.id === id) {
                element.checked = false;
              }
        });

    },
    changeTimes(state: State, id: number) {
        const list = state.habitList
        const len = list.length;

        list[len - 1].habitInfo.activeTimes = id;
    },

    selectColor(state: State, color: string) {
        const list = state.habitList
        const len = list.length;

        list[len - 1].color = color;
    },
    selectIcon(state: State, icon: string) {
        const list = state.habitList
        const len = list.length;

        list[len - 1].iconName = icon;
    },
}
