import { State } from './state';

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
}
