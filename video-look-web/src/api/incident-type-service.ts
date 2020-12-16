import store from '@/store';
import axios from 'axios';
import StandardError from 'standard-error';
import { IncidentTypeUrls } from '@/common/urls/incident-type-urls';

export default {
  async getIncidentType(): Promise<any> {
    const url = `${store.getters.configs.systemUrl}${IncidentTypeUrls.getIncidentType}`;
    return axios
      .get(url)
      .then((response: any) => {
        return Promise.resolve(response.data);
      })
      .catch((error: any) => {
        if (error && error.response && error.response.data) {
          const errorCode = error.response.data.error;
          const msg = errorCode;
          return Promise.reject(new StandardError(msg, error.response.data));
        } else {
          return Promise.reject(new StandardError('Login.SystemError', error));
        }
      });
  }
};
