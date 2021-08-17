import { Tabs } from "antd"
import React from "react"
import { useLocalStorage } from "react-use"

// prevent basePath pass to antd tabs
export default ({ children, name, ...props }) => {
  const [activeKey, setActiveKey] = useLocalStorage("antd-tabs:" + name, 0)
  return (
    <Tabs
      type="card"
      centered
      animated
      defaultActiveKey={activeKey}
      onChange={(activeKey) => setActiveKey(activeKey)}
      {...props}
    >
      {React.Children.map(children, (child, index) => (
        <Tabs.TabPane tab={child.props.tableDesc} key={index}>
          {child}
        </Tabs.TabPane>
      ))}
    </Tabs>
  )
}
