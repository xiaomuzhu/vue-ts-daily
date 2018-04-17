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

    getStr(str: string) {
        const reg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{2,6}$/;
        if (!reg.test(str.trim())) {
            return false;
          } else {
              return true;
          }
    },
};
