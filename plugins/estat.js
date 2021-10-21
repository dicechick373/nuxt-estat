import qs from 'qs';

export default function ({ $axios, $config }, inject) {
  const api = $axios.create({
    headers: {
      common: {
        Accept: 'application/json',
      },
      'Content-Type': 'application/json',
    },
    params: {
      appId: $config.ESTAT_APPID,
    },
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'comma' });
    },

    data: {},
  })

  api.setBaseURL(`${$config.SITE_URL}json/getStatsData`)

  inject('estat', api)
}