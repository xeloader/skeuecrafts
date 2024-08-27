import * as React from 'react'
import { Link, type HeadFC } from 'gatsby'

export default function IndexPage (): JSX.Element {
  return (
    <main>
      <div className='flex flex-col gap-1 px-1 text-xs bg-[blue] text-white'>
        <h1 className='text-md'>skojcrafts / paint w. code</h1>
        <p className='text-black/50' />
      </div>
      <ul className='text-lg pl-1'>
        <li><Link className='text-black underline' to='canvas/te/ep133'>ep-133</Link></li>
      </ul>
    </main>
  )
}

const getFrame = (frames: string[], index: number): string => {
  return frames[index % frames.length]
}

export const Head: HeadFC = () => {
  const [index, setIndex] = React.useState(0)
  const faces = ['·', '.', '.', '·', '˙', '˙']
  const frames = faces.length * 2
  React.useEffect(() => {
    const id = setInterval(() => {
      if (!document.hidden) {
        setIndex(index => index + 1)
      }
    }, 250)
    return () => {
      clearInterval(id)
    }
  })
  const completeFrame = Array.from(Array(frames)).map((_, i) => getFrame(faces, index + i + 1)).join('')
  return (
    <title>.skojcrafts {completeFrame}</title>
  )
}
