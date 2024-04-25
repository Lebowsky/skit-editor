import { ITabData } from "../models/SideMenu"
import Tabs from "./Tabs"

interface ContentProps {
	tabs: ITabData[]
  currentTabId: number
}
export default function Content( {tabs, currentTabId }: ContentProps ) {
	return (
		<div style={{
			width: '85%',
			overflow: 'auto'
		}}>
      <Tabs tabsData={tabs} currentTabId={currentTabId} />
		</div>
	)
}