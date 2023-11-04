import Navbar from '@components/Navbar'
import '@styles/globals.css'
import Provider from '@components/Provider'

export const metadeta = {
    title: "Promptopia",
    description: "Discover and share AI prompts"
}

const RootLayout = ({ children }) => {
    return (
        <html lang='en'>
            <body>
                <Provider>
                    <div className='main'>
                        <div className='gradient' />
                    </div>

                    <main className='app'>
                        <Navbar />
                        {children}
                    </main>
                </Provider>
            </body>
        </html>
    )
}

export default RootLayout