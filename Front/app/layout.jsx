import 'bootstrap/dist/css/bootstrap.css'
import Logo from '@/components/Logo'

export const metadata = {
  title: 'Janice Beleza Estética',
  description: 'Controle de Agendamentos',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">  
    <head>
      <link rel="shortcut icon" href="../Logo.png" type="image/x-icon" />  
    </head>    
      <body>
          {children}
      </body>
    </html>
  )
}
