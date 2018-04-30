declare namespace Ajax {
  // axios 返回数据
  export interface AxiosResponse {
    data: AjaxResponse;
  }

  // 请求接口数据
  export interface AjaxResponse {
    ID: number;
    /**
     * 消息
     * @type { string }
     */
    message?: string;
  }
}
