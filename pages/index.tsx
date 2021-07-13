import '@/styles/Home.module.css'

import React, { useEffect } from 'react'
import sv from '@/constants/styles'
import styled from 'styled-components'
// @ts-ignore
import { rgba } from 'polished'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import HolaWaves from '@/assets/images/HolaWaves'
import Button from '@/components/elements/Button'
import {
  Text,
  PageTitle,
  SubTitle,
  GradientContainer
} from '@/components/elements/StyledComponents'
import walletSDK from '@/modules/wallet/client'

const Content = styled.div`
  flex: 3;
  min-height: 550px;
  ${sv.flexCenter};
`;

const MainPitch = styled.div`
  color: ${sv.colors.buttonText};
  ${sv.flexCenter};
  flex-direction: column;
  max-width: 500px;
`;

const Logo = styled.div`
  font-size: 90px;
  margin-bottom: ${sv.grid*4}px;
`;

const NewStoreButton = styled(Button)`
  margin-top: ${sv.grid*3}px;
`;

const HasStoreText = styled(Text)`
  margin-top: ${sv.grid*4}px;
  max-width: 240px;
  text-align: center;
`;

const Waves = styled.div`
  width: 100%;
  flex: 0 0 40%;
  max-height: 600px;
  ${sv.flexCenter};
  svg {
    min-width: 1000px;
  }
`;

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    if (process.browser) {
      window.solana.on("connect", () => {
        const solanaPubkey = window.solana.publicKey.toString()
  
        window.arweaveWallet.getActivePublicKey()
          .catch(() => window.arweaveWallet.connect(['ACCESS_ADDRESS', 'ACCESS_PUBLIC_KEY', 'SIGN_TRANSACTION', 'SIGNATURE']))
          .then(() => walletSDK.find(solanaPubkey))
          .then((wallet) => {
            if (!wallet) {
              toast(() => <>Holaplex is in a closed beta but we have added your wallet to the waitlist. Email the team at <a href="mailto:hola@holaplex.com">hola@holaplex.com</a> to join the beta.</>)

              return walletSDK.create(solanaPubkey)
            }
  
            if (wallet.approved) {
              router.push("/storefronts/new")
            } else {
              toast(() => <>Holaplex is in a closed beta and your wallet has not yet been approved. Email the team at <a href="mailto:hola@holaplex.com">hola@holaplex.com</a> to join the beta.</>)
            }
          })
      })
    }
  })

  return (
    <GradientContainer>
      <Content>
        <MainPitch>
          <Logo>👋</Logo>
          <PageTitle center invert>Holaplex</PageTitle>
          <SubTitle center invert>Design, launch, and host your Metaplex NFT marketplace. No coding required!</SubTitle>
          <NewStoreButton onClick={() => window.solana.connect() } label="Create Your Store" />
          <HasStoreText color={rgba(sv.colors.buttonText, .6)}>
          </HasStoreText>
        </MainPitch>
      </Content>
      <Waves>
        <HolaWaves />
      </Waves>
    </GradientContainer>

  )
}
