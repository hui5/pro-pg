import { client } from "pages/dvdrental/client"
import { client as demoClient } from "pages/demo/client"

import { ClientProvider } from "core/db/client/ClientContext"

import DvdRental from "pages/dvdrental"
import Demo from "pages/demo"

// import "./App.css"

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
