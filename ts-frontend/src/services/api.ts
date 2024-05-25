import { getUrl } from "../utils"

export const fakeFetchConfiguration = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({})
    }, 1)
  })
}

export const fetchConfiguration = async () => {
  const CONF_URL = getUrl('get_conf');
  
  return fetch(CONF_URL, { mode: 'cors' }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error('Something went wrong');
  })
    .then((responseJson) => {
      return responseJson
    });
}

export const fetchPostConfiguration = async (configJsonData: {[key: string]: any}) => {
  const CONF_URL = getUrl('set_conf')
  return fetch(
    CONF_URL,
    {
      mode: 'cors',
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(configJsonData)
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error('Something went wrong');
    })
    .then((responseJson) => {
      return responseJson
    })
}