import moment from 'moment';

import { State, HabitList, RepeatingDateState } from '@/store/state';

const userInfo = 'xiaomuzhu'

export function getInfo() {
  return localStorage.getItem(userInfo)
}

export function setInfo(username: string) {
  return localStorage.setItem(userInfo, username)
}

export function removeInfo() {
  return localStorage.removeItem(userInfo)
}



function getDateList(arr: RepeatingDateState[]) {
    const list: string[] = [];
    for (let index = 0; index < arr.length; index++) {
        const element = arr[index];
        if (element.checked) {
            list.push(element.date)
        }
    }
    return list;
}

    // 星期与数字相互转化
function transformDate(date: string | number) {
        const weekday = new Map([
          [0, '星期日'],
          [1, '星期一'],
          [2, '星期二'],
          [3, '星期三'],
          [4, '星期四'],
          [5, '星期五'],
          [6, '星期六'],
        ]);

        if (typeof date === 'number') {
          return weekday.get(date);
        } else if (typeof date === 'string') {
          for (const [key, value] of weekday) {
            if (value === date) {
              return key;
            }
          }
        } else {
          return null;
        }
      }

export default {
    generateGuuId() {
    let d = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
},

    getDate(str: string) {
        return str.replace(/['星期']/g, ' ');
    },

    getStr(str: string, min: number = 2, max: number = 6) {
        const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{min,max}$/;
        if (!reg.test(str.trim())) {
            return false;
          } else {
              return true;
          }
    },
    getDateList,
    transformDate,
    // 通过id查找相关习惯对象
    find(arr: HabitList[], id: number ) {
        let obj;
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element.id === id) {
                obj = element;
            }
        }
        return obj;
    },

    // 通过id查找相关习惯对象的Index
    findIndex(arr: HabitList[], id: number ) {
        let Index;
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            if (element.id === id) {
                Index = index;
            }
        }
        return Index;
    },

    /**
     * 获取符合日期的习惯
     *
     * @param {HabitList[]} arr 存放习惯相关信息的数组
     * @param {number} [preDay] 默认是当天日期,如果加上数字1就是一天前(昨天)
     * @returns
     */
    dateComparison(arr: HabitList[], preDay: number = 0) {
        let day: number;
        if (!preDay) {
            day = moment().day();
        } else {
            day = moment().add(preDay, 'days').day();
        }
        const current = transformDate(day);
        const currentList: HabitList[] = [];
        for (let index = 0; index < arr.length; index++) {
            const habit = arr[index];
            const element = arr[index].habitInfo.RepeatingDate;
            // @ts-ignore
            if (getDateList(element).indexOf(current)) {
                currentList.push(habit);
            }
        }
        return currentList;
    },

    // 以天为单位设置打卡的id
    getDaysId() {
    const now = (new Date()).valueOf();
    // 之所以+8 是因为得转换成天朝的东八区
    const hours = moment.duration((new Date()).valueOf()).as('hours') + 8;

    return Math.floor(hours / 24)
    },

    // 获取isFinished
    getIsFinished(habit: HabitList) {
        const {date} = habit.habitLog;
        const {length} = date;
        return date[length - 1].isFinished;
    },
};
