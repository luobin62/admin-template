/* import defaultSettings from '@/settings'

const title = defaultSettings.title || '芯片管理平台'*/
const title = '芯片管理平台'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
