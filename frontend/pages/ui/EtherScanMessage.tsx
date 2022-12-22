import { useNetwork } from 'wagmi'
import { Link, Text } from '@chakra-ui/react'
import { etherscan_address } from '@/utils/constants'

interface EtherScanMessageProps {
  title: string
  blockHash: string
}
export const EtherScanMessage: React.FC<EtherScanMessageProps> = ({
  title,
  blockHash,
}) => {
  const { chain } = useNetwork()

  return (
    <>
      <Text>{title}</Text>
      <Text>
        <Link href={etherscan_address(chain?.id || 5, blockHash)} isExternal>
          View on Etherscan
        </Link>
      </Text>
    </>
  )
}
