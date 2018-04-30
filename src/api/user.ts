import { _get, _post, _delete } from './index';

// 登录
export const login = (data: any) => {
  const req = {
    data,
    url: 'admin/user_login',
  };
  return _post(req);
};

// 获取用户信息
export const userInfo = (data: any) => {
  const req = {
    data,
    url: 'admin/user_info',
  };
  return _get(req);
};

// 改变用户头像
export const changeAvatar = (data: any) => {
  const req = {
    data,
    url: 'admin/change_avatar',
  };
  return _post(req);
};
