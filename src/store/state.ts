import * as moment from 'moment';
export interface ClockLog {
  id: number;
  time?: moment.Moment;
  isFinished: boolean;
  message?: string;
}
export interface UserState {
  username: string | undefined;
  id: number | null;
  createdTime: string | undefined;
  url: string;
  isLogin: number;
  isSync: number;
}

export interface SettingState {
  checked: boolean;
  url: string;
}

export interface TimeSlotList {
  id: number;
  title: string;
}

export interface RemindState {
  id: number;
  remind: string;
  isOpen: boolean;
}

export interface RepeatingDateState {
  id: number;
  date: string;
  checked: boolean;
}

// 单个习惯的状态信息
export interface HabitList {
  id: number;
  iconName: string;
  color: string;
  mode: string;
  // 是否可用,否则是被归档了
  isActive: boolean;
  // 关于习惯的基本信息
  habitInfo: {
    // 习惯名称
    habitName: string;
    // 重复练习的日期
    RepeatingDate: RepeatingDateState[] | never[];
    // 练习的时间段
    activeTimes: number;
    timeSlotList: TimeSlotList[] | never[];
    // 提醒的时间
    remind: RemindState[] | never[];
    // 激励自己的话
    inspire: string;
  };
  // 习惯日志
  habitLog: {
    // 总共坚持练习了多少天
    totalHabitDays: number;
    // 当前连续联系了多少天
    currentConsecutiveDays: number;
    // 历史上最多连续练习多少天
    mostConsecutiveDays: number;
    // 创建日期
    createdTime: string;
    // 创建此习惯至今多少天
    totalDays: number;
    date: ClockLog[];
  };
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
  };
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
  habitList: HabitList[];
  today: {
    active: string[] | never[] | number[];
    finishedDate: moment.Moment[] | never[];
    isReceived: boolean;
  };
  setting: SettingState;
  user?: UserState;
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
      path: '/',
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
    right: '', // filter
  },
  today: {
    active: [0],
    finishedDate: [],
    isReceived: false,
  },
  setting: {
    checked: false,
    url:
      'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4216091012,4283409120&fm=27&gp=0.jpg',
  },
  card: {
    src:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-5xlxmMc1UjkLOsMSPPX9sKgNr3XuCNHCCCwI__iXCx2zftWo',
    content: '1',
  },
  habitList: [
    {
      id: 1524822339790,
      iconName: 'taiyang',
      color: '#ffe884',
      mode: 'done',
      isActive: true,
      habitInfo: {
        // 习惯名称
        habitName: '背单词',
        // 重复练习的日期
        RepeatingDate: [
          { id: 0, date: '星期一', checked: true },
          { id: 1, date: '星期二', checked: true },
          { id: 2, date: '星期三', checked: true },
          { id: 3, date: '星期四', checked: true },
          { id: 4, date: '星期五', checked: true },
          { id: 5, date: '星期六', checked: true },
          { id: 6, date: '星期日', checked: true },
        ],
        // 练习的时间段
        activeTimes: 0,
        // 目前已存在的时间段
        timeSlotList: [
          {
            id: 0,
            title: '起床之后',
          },
          {
            id: 1,
            title: '晨间习惯',
          },
          {
            id: 2,
            title: '中午时分',
          },
          {
            id: 3,
            title: '午间习惯',
          },
          {
            id: 4,
            title: '晚间习惯',
          },
          {
            id: 5,
            title: '睡觉之前',
          },
          {
            id: 6,
            title: '任意时间',
          },
        ],
        // 提醒的时间
        remind: [{ id: 0, remind: '12:00', isOpen: false }],
        // 激励自己的话
        inspire: '坚持的路上没有捷径',
      },
      habitLog: {
        // 总共坚持练习了多少天
        totalHabitDays: 0,
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
    },
  ],
  user: {
    isLogin: -1,
    username: '',
    id: null,
    createdTime: '',
    isSync: -1,
    url:
      'https://is4-ssl.mzstatic.com/image/thumb/Purple71/v4/be/13/06/be1306d8-e343-2adb-2b04-9a6884300499/pr_source.jpg/1200x630bb.jpg',
  },
};

export default state;
