import * as React from "react"
import { Link, type HeadFC, type PageProps } from "gatsby"


export default function IndexPage() {
  return (
    <main>
      <div className="flex flex-col gap-1 px-1 text-xs bg-[blue] text-white">
        <h1 className="text-md">paint w. code</h1>
        <p className="text-black/50"></p>
      </div>
      <ul className="text-lg pl-1">
        <li><Link className="text-black underline" to="canvas/te/ep133">ep-133</Link></li>
      </ul>
    </main>
  )
}

export const Head: HeadFC = () => <title>Home Page</title>
