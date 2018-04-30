import { _post } from './index';

// 同步
export const sync = (data: any) => {
  console.log(data);
  const req = {
    data,
    url: 'sync',
  };
  return _post(req);
};
