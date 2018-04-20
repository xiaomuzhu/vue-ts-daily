import {_get, _post, _delete} from './index'

// 获取用户所有地址
export const getAllAddress = (data: any) => {
  const req = {
    data,
    url: 'admin/all_address',
  };
  return _get(req);
}

// 获取指定收货地址
export const getAddress = (data: any) => {
  const req = {
    data,
    url: 'admin/address',
  }
  return _get(req)
}

// 添加收获地址
export const add_address = (data: any) => {
  const req = {
    data,
    url: 'admin/address',
  }
  return _post(req);
}

export const updateAddress = (data: any) => {
  const req = {
    data,
    url: 'admin/update_address',
  }
  return _post(req)
}

// 删除收货地址
export const deleteAddress = (data: any) => {
  const req = {
    data,
    url: 'admin/address',
  }
  return _delete(req)
}

// 登录
export const login = (data: any) => {
  const req = {
    data,
    url: 'admin/user_login',
  }
  return _post(req);
}

// 获取用户信息
export const userInfo = (data: any) => {
  const req = {
    data,
    url: 'admin/user_info',
  }
  return _get(req);
}

// 改变用户头像
export const changeAvatar = (data: any) => {
  const req = {
    data,
    url: 'admin/change_avatar',
  }
  return _post(req)
}

// 获取我的评论
export const comment = (data: any) => {
  const req = {
    data,
    url: 'v1/my_comment',
  }
  return _get(req);
}

export const deleteComment = (data: any) => {
  const req = {
    data,
    url: 'v1/comment',
  }
  return _delete(req);
}

