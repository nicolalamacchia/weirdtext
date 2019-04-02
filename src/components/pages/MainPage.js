import React from 'react'
import Main from 'components/atoms/Main'
import Header from 'components/molecules/Header'
import EncodeSection from 'components/organisms/EncodeSection'
import DecodeSection from 'components/organisms/DecodeSection'

const MainPage = () => (
  <Main>
    <Header>WeirdText</Header>
    <EncodeSection />
    <DecodeSection />
  </Main>
)

export default MainPage
