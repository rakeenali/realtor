import React from 'react'
import { Provider as URQProvider, createClient } from 'urql'

import Index from './app/index'
import { MessageProvider } from './app/store/Message'
import { AuthProvider } from './app/store/Auth'

const client = createClient({
  url: 'http://cce016f1.ngrok.io/graphql',
})

const App = () => {
  return (
    <MessageProvider>
      <AuthProvider>
        <URQProvider value={client}>
          <Index />
        </URQProvider>
      </AuthProvider>
    </MessageProvider>
  )
}

export default App
