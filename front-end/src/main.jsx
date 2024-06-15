// import React from 'react'
// import ReactDOM from 'react-dom/client'
// import App from './App.jsx'


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
// )


import React from 'react'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'

import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ColorModeScript } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import { RecoilRoot } from 'recoil'



const styles = {
  global: (props) => ({
    body: {
      color: mode('gray.800', 'whiteAlpha.900')(props),
      bg: mode('gray.100', '#101010')(props)
    }
  })
}
const config = {
  initialColorMode: "dark",
  useSystemColorMode: true
};

const colors = {
  gray: {
    light: "#616161",
    dark: "#1e1e1e"
  }
}
const theme = extendTheme({ config, styles, colors })

const rootElement = document.getElementById('root')
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RecoilRoot>

      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>
)
