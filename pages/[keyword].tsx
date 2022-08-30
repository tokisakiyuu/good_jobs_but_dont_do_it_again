import { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import { default as NextImage } from 'next/image'
import { useRouter } from 'next/router'
import { css } from '@emotion/css'

const KeywordPage: NextPage = () => {
  const router = useRouter()
  const keyword = router.query.keyword as string
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imgSrc, setImgSrc] = useState<string>('')
  useEffect(() => {
    if (keyword) {
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          draw(ctx, keyword)
            .then(() => {
              const src = canvasRef.current?.toDataURL()
              src && setImgSrc(src)
            })
        }
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword])
  return (
    <>
      <Head>
        <title>送你一句话</title>
      </Head>
      <div className={canvasStyle}>
        <canvas
          className='canvas'
          ref={canvasRef}
          width={500}
          height={500}
        />
        <NextImage
          src={imgSrc}
          alt={`${keyword}得不错，下次不要再${keyword}了`}
          width={500}
          height={500}
        />
      </div>
    </>
  )
}

async function draw(ctx: CanvasRenderingContext2D, keyword: string) {
  ctx.clearRect(0, 0, 500, 500)
  await drawImage(ctx)
  await drawText(ctx, keyword)
}

async function drawImage(ctx: CanvasRenderingContext2D) {
  const img = new Image()
  img.src = '/lookmesee.png'
  return new Promise<void>((resolve) => {
    img.onload = () => {
      ctx.drawImage(img, 0, 0, 500, 500)
      resolve()
    }
  })
}

async function drawText(ctx: CanvasRenderingContext2D, keyword: string) {
  // 用户输入的关键词大于等于4个字时，则“x得不错”的宽度(横排)大于等于“下次不要再y了”的高度(竖排)
  // 要让所有文字都能在500x500的画布内完整绘制，所以要按占用高或者宽最大的那段句子来计算字体大小
  const fontSize = (500 - 30) / (keyword.length >= 4 ? keyword.length + 3 : 7)
  const keywordWidth = fontSize * keyword.length
  const keywordOffsetX = 15
  const keywordOffsetY = 15 + fontSize * 5
  const verticalSentenceOffsetX = 15 + keywordWidth / 2 - fontSize / 2
  ctx.textBaseline = 'top'
  ctx.font = `${fontSize}px Lucida Sans`
  ctx.fillStyle = 'red'
  ctx.fillText(keyword, keywordOffsetX, keywordOffsetY)
  ctx.fillStyle = 'black'
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 2
  ctx.fillText('得不错', keywordOffsetX + keywordWidth, keywordOffsetY)
  ctx.strokeText('得不错', keywordOffsetX + keywordWidth, keywordOffsetY)
  Array.from('下次不要再').forEach((word, index) => {
    ctx.fillText(word, verticalSentenceOffsetX, 15 + index * fontSize)
    ctx.strokeText(word, verticalSentenceOffsetX, 15 + index * fontSize)
  })
  ctx.fillText('了', verticalSentenceOffsetX, 15 + 6 * fontSize)
  ctx.strokeText('了', verticalSentenceOffsetX, 15 + 6 * fontSize)
  return
}

const canvasStyle = css({
  display: 'flex',
  justifyContent: 'center',
  '.canvas': {
    width: '100%',
    display: 'none'
  }
})

export default KeywordPage
