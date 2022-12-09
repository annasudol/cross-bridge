import { Meta } from '@/layouts/Meta';
import { Main } from '@/templates/Main';
import Tabs from '@/ui/Tabs';

const Index = () => {
  return (
    <Main
      meta={
        <Meta
          title="Cross chain ETH-BSC Bridge"
          description="Crypto cross-chain bridge between Ethereum and Binance networks"
        />
      }
    >
      <div className="flex justify-center">
        <Tabs />
      </div>
    </Main>
  );
};

export default Index;
