import { Meta } from '@/layouts/Meta'
import { Main } from 'pages/templates/Main'
import { Tabs } from 'pages/ui/Tabs'
import { ModalUI } from '@/ui/ModalUI'

const Home = () => {
  return (
    <Main
      meta={
        <Meta
          title="Cross-chain Bridge"
          description="Crypto cross-chain bridge between Ethereum and Polygon networks"
        />
      }
    >
      <div className="flex justify-center">
        <ModalUI />
        <Tabs />{' '}
      </div>
    </Main>
  )
}

export default Home
