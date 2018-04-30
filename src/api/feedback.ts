import { _post } from './index';

// 反馈
export const feedback = (data: any) => {
  const req = {
    data,
    url: 'feedback',
  };
  return _post(req);
};
