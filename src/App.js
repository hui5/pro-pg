import ProLayout, { PageContainer } from "@ant-design/pro-layout"

import DvdRental from "dvdrental"
import Demo from "demo"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
  Link,
} from "react-router-dom"

const Layout = () => {
  const location = useLocation()
  return (
    <ProLayout
      title=""
      route={{
        path: "/",
        routes: [
          {
            path: "/dvdrental",
            name: "Dvd rental",
          },
          {
            path: "/demo",
            name: "Demo",
          },
        ],
      }}
      location={{ pathname: location.pathname }}
      menuItemRender={(item, dom) => <Link to={item.path}>{dom}</Link>}
      style={{
        height: "100vh",
      }}
      navTheme="light"
      layout="top"
    >
      <Switch>
        <Route path="/dvdrental" component={DvdRental} />
        <Route path="/demo" component={Demo} />
      </Switch>
    </ProLayout>
  )
}

export default () => (
  <Router>
    <Layout></Layout>
  </Router>
)
