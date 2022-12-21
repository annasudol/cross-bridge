import { Meta } from '@/layouts/Meta'
import { Main } from 'pages/templates/Main'
import { Tabs } from 'pages/ui/Tabs'

const Home = () => {
  return (
    <Main
      meta={
        <Meta
          title="Cross chain ETH-MATIC Bridge"
          description="Crypto cross-chain bridge between Ethereum and Polygon networks"
        />
      }
    >
      <div className="flex justify-center">{/* <Tabs /> */}</div>
    </Main>
  )
}

export default Home
