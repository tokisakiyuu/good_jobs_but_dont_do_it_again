import { FormEvent, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { css } from '@emotion/css'
import {
  Container,
  TextField
} from '@mui/material'

const Home: NextPage = () => {
  const [isError, setError] = useState(false)
  const router = useRouter()
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const keyword = data.get('keyword')
    if (!keyword) {
      return setError(true)
    }
    setError(false)
    router.push(`/${keyword}`)
  }
  return (
    <>
      <Head>
        <title>x得不错，下次不要再x了</title>
      </Head>
      <Container maxWidth='sm'>
        <div className={inputKeywordWrapperStyle}>
          <form onSubmit={onSubmit}>
            <TextField
              name='keyword'
              label='动词'
              variant="outlined"
              color='success'
              autoFocus
              focused
              helperText={isError ? '不能为空' : '输入一个动词并按确认'}
              error={isError}
            />
          </form>
        </div>
      </Container>
    </>
  )
}

const inputKeywordWrapperStyle = css({
  width: 160,
  margin: '100px auto'
})

export default Home
