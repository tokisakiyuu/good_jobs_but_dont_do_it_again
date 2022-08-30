import { FormEvent, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { css } from '@emotion/css'
import {
  Container,
  TextField,
  Button
} from '@mui/material'

const Home: NextPage = () => {
  const [isError, setError] = useState(false)
  const [keyword, setKeyword] = useState<string>('')
  const router = useRouter()
  const onSubmit = () => {
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
          <TextField
            value={keyword}
            label='动词'
            variant="outlined"
            color='success'
            autoFocus
            focused
            helperText={isError ? '不能为空' : '输入一个动词并按确认'}
            error={isError}
            onInput={e => setKeyword((e.target as HTMLInputElement).value)}
          />
          <div className='confirm-btn'>
            <Button variant='contained' onClick={onSubmit}>确定</Button>
          </div>
        </div>
      </Container>
    </>
  )
}

const inputKeywordWrapperStyle = css({
  width: 160,
  margin: '100px auto',
  '.confirm-btn': {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Home
