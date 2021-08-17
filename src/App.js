import { ClientProvider } from "core/db/client/ClientContext"
import { client } from "dvdrental/client"
import { client as demoClient } from "demo/client"

import DvdRental from "dvdrental"
import Demo from "demo"

import { Divider, Typography } from "antd"

const { Title } = Typography

function App() {
  return (
    <div>
      <ClientProvider client={client}>
        <Title level={4} className="mt-4 ml-4">
          Dvd Rental
        </Title>
        <DvdRental />
      </ClientProvider>
      <Divider></Divider>

      <ClientProvider client={demoClient}>
        <Title level={4} className="mt-4 ml-4">
          Demo
        </Title>
        <Demo />
      </ClientProvider>
    </div>
  )
}

export default App
