
// 单个习惯的状态信息
export interface HabitList {
  id: number;
  iconName: string;
  color: string;
  // 关于习惯的基本信息
  habitInfo: {
    // 习惯名称
    habitName: string;
    // 重复练习的日期
    RepeatingDate: string[];
    // 练习的时间段
    timeSlot: string;
    // 提醒的时间
    remind: string;
    // 激励自己的话
    inspire: string;
  };
  // 习惯日志
  habitLog: {
    // 总共坚持练习了多少天
    totalHabitDays: string;
    // 当前连续联系了多少天
    currentConsecutiveDays: number;
    // 历史上最多连续练习多少天
    mostConsecutiveDays: number;
    // 创建日期
    createdTime: string;
    // 创建此习惯至今多少天
    totalDays: number;
    date: string[] | never[];
  }
}

export interface Card {
  src: string;
  content?: string;
}
export interface PageInfo {
  id: number;
  isActived: boolean;
  name: {
    defaultName: string;
    activedName: string;
  }
  path: string;
  tagName: string;
}

export interface HeaderInfo {
  left?: string;
  title: string;
  right?: string;
}

export interface State {
  activePage: PageInfo[];
  headerInfo: HeaderInfo;
  card: Card;
  habitList?: HabitList[];
  user?: {
    username: string | undefined;
    id: number | null;
    createdTime: string | undefined;
  };
}


// 初始状态
const state: State = {
  activePage: [
    {
      id: 0,
      isActived: true,
      name: {
        defaultName: 'today-o',
        activedName: 'today',
      },
      path: '/today',
      tagName: '日常',
    },
    {
      id: 1,
      isActived: false,
      name: {
        defaultName: 'habit-o',
        activedName: 'habit',
      },
      path: '/habit',
      tagName: '习惯',
    },
    {
      id: 2,
      isActived: false,
      name: {
        defaultName: 'setting-o',
        activedName: 'setting',
      },
      path: '/setting',
      tagName: '更多',
    },
  ],
  headerInfo: {
      left: 'letter',
      title: 'TODAY',
      right: 'filter',
  },
  card: {
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-5xlxmMc1UjkLOsMSPPX9sKgNr3XuCNHCCCwI__iXCx2zftWo',
      content: '1',
  },
  habitList: [{
    id: 0,
    iconName: 'taiyang',
    color: '#ffe884',
    habitInfo: {
      // 习惯名称
      habitName: '背单词',
      // 重复练习的日期
      RepeatingDate: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
      // 练习的时间段
      timeSlot: '任意时段',
      // 提醒的时间
      remind: '12',
      // 激励自己的话
      inspire: '坚持的路上没有捷径',
    },
    habitLog: {
      // 总共坚持练习了多少天
      totalHabitDays: '0天',
      // 当前连续联系了多少天
      currentConsecutiveDays: 0,
      // 历史上最多连续练习多少天
      mostConsecutiveDays: 0,
      // 创建日期
      createdTime: '0',
      // 创建此习惯至今多少天
      totalDays: 0,
      // 坚持的日期
      date: [],
    },
}],
  user: {
    username: '',
    id: null,
    createdTime: '',
  },
}

export default state;
