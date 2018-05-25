import moment from 'moment';

import { State, HabitList, RepeatingDateState, ClockLog } from '@/store/state';

const userInfo = 'xiaomuzhu';

export function getInfo() {
  return localStorage.getItem(userInfo);
}

export function setInfo(username: string) {
  return localStorage.setItem(userInfo, username);
}

export function removeInfo() {
  return localStorage.removeItem(userInfo);
}

function getDateList(arr: RepeatingDateState[]) {
  const list: string[] = [];
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    if (element.checked) {
      list.push(element.date);
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

const utils = {
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
  getNewDate(str: string) {
    const newList = str.split('/');
    const year = newList.shift();
    newList.push(year!);
    return newList.join('/');
  },
  getDateList,
  transformDate,

  // 通过id查找相关习惯对象
  find(arr: HabitList[], id: number) {
    const index = utils.findIndex(arr, id);
    if (index >= 0) {
      return arr[index];
    }
  },

  // 通过id查找相关习惯对象的Index
  findIndex(arr: HabitList[], id: number) {
    let low = 0;
    let high = arr.length - 1;
    let mid: number;
    let currentId: number;
    while (low <= high) {
      mid = Math.floor(low + (high - low) / 2);
      currentId = arr[mid].id;
      if (currentId < id) {
        low = mid + 1;
      } else if (currentId > id) {
        high = mid - 1;
      } else {
        return mid;
      }
    }
    return -1;
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
      day = moment()
        .add(preDay, 'days')
        .day();
    }
    const current = transformDate(day);
    const currentList: HabitList[] = [];
    for (let index = 0; index < arr.length; index++) {
      const habit = arr[index];
      const element = arr[index].habitInfo.RepeatingDate;
      // @ts-ignore
      if (getDateList(element).indexOf(current) >= 0) {
        currentList.push(habit);
      }
    }

    return currentList;
  },

  // 以天为单位设置打卡的id
  getDaysId(time?: number) {
    const now = !time ? new Date().valueOf() : time;

    // 之所以+8 是因为得转换成天朝的东八区
    const hours = moment.duration(now).as('hours') + 8;
    return Math.floor(hours / 24);
  },

  // 以天为单位设置打卡的id
  getMoment(days: number) {
    moment.locale('zh-cn');
    return moment('1-1-1970', 'MM-DD-YYYY').add(days, 'd');
  },

  // 获取当天需要更新的打卡对象的index
  getHabitLogDateIndex(dateList: ClockLog[], days: number) {
    let low = 0;
    let high = dateList.length - 1;
    let mid: number;
    let currentId: number;
    while (low <= high) {
      mid = Math.floor(low + (high - low) / 2);
      currentId = dateList[mid].id;
      if (currentId < days) {
        low = mid + 1;
      } else if (currentId > days) {
        high = mid - 1;
      } else {
        return mid;
      }
    }
    return -1;
  },

  // 通过id查找相关习惯对象
  getHabitLogDate(dateList: ClockLog[], days: number) {
    const index = utils.getHabitLogDateIndex(dateList, days);
    if (index >= 0) {
      return dateList[index];
    }
  },

  /**
   * 查找打卡信息史上最长连续打卡的长度
   * @param dateList ClockLog[] 储存打卡信息的数组
   */
  getMaxDays(dateList: ClockLog[]) {
    const list = dateList.filter(item => item.isFinished === true);
    if (list.length === 0) {
      return 0;
    }
    if (list.length === 1) {
      return 1;
    }
    let max = 1;
    let current = 1;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      const next = list[index + 1];
      if (next && element.id + 1 === next.id) {
        current++;
        max = Math.max(max, current);
      } else {
        current = 1;
      }
    }

    return max;
  },

  /**
   * 查找打卡信息当前最长连续打卡的长度
   * @param dateList ClockLog[] 储存打卡信息的数组
   */
  getCurrentMaxDays(dateList: ClockLog[]) {
    const list = dateList.filter(item => item.isFinished === true);
    if (list.length === 0) {
      return 0;
    }
    if (list.length === 1) {
      return 1;
    }
    if (!dateList[dateList.length - 1].isFinished) {
      return 0;
    }

    let current = 1;
    for (let index = list.length - 1; index > 0; index--) {
      const element = list[index];
      const pre = list[index - 1];
      if (element.id - 1 === pre.id) {
        current++;
        // max = Math.max(max, current);
      } else {
        return current;
      }
    }

    return current;
  },

  // 获取isFinished
  getIsFinished(habit: HabitList) {
    const { date } = habit.habitLog;
    const { length } = date;
    return date[length - 1].isFinished;
  },
};

export default utils;
