import { IListItem } from "./models/ContextConfiguration"
import { ISideMenuItem } from "./models/SideMenu"

export function getUrl(method: string){
  const BASE_URL = process.env.REACT_APP_BASE_URL
  if (BASE_URL) {
    return BASE_URL.endsWith('/') ?
      `${BASE_URL}${method}` :
      `${BASE_URL}/${method}`;
  }
  throw new Error("BASE_URL not specified")
}

export function getParamValue(formFaram: any): string{
  return '42'
}