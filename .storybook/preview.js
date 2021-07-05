import { client } from "client/demo"
import { ClientProvider } from "core/db/client/ClientContext"

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <ClientProvider client={client}>
      <Story />
    </ClientProvider>
  ),
]
