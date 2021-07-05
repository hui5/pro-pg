import ProCard from "@ant-design/pro-card"
import { PageContainer } from "@ant-design/pro-layout"
import { Col, PageHeader, Row } from "antd"
import { chain, initial, last } from "lodash"
import React from "react"
import { useHistory } from "react-router"

// a index page for test pages
export default ({ title, route, routes }) => {
  const root = chain(routes[1].routes).find(["path", "/"]).value()

  return (
    <PageContainer title={title || "Pages"}>
      <Row justify="center">
        <Col span={20}>
          <List root={root} title=""></List>
        </Col>
      </Row>
    </PageContainer>
  )
}

const List = ({ root, title }) => {
  const children = chain(root.routes)
    .filter((node) => node.path && node.path !== "/")
    .reverse()
    .value()

  return (
    <ProCard ghost title={title} style={{ marginBottom: "20px" }}>
      {children.map((node) => (
        <Row key={node.path}>
          <Col span={4}></Col>
          <Col span={20}>
            <Item node={node} />
          </Col>
        </Row>
      ))}
    </ProCard>
  )
}

const Item = ({ node }) => {
  const path = node.path.split("/")
  const histotry = useHistory()

  return node.routes ? (
    <List root={node} title={node.path} />
  ) : (
    <ProCard
      bordered
      hoverable
      size="small"
      onClick={(e) => {
        e.stopPropagation()
        histotry.push(node.path)
      }}
    >
      <PageHeader title={last(path)} subTitle={initial(path)}></PageHeader>
    </ProCard>
  )
}
