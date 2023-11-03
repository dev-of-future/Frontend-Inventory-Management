'use client'
import React from 'react'

export default function Home() {

  return (
    <main>
      <>
        <p>The Homepage is a work in progress, visit the other pages listed on the navbar</p>
        <p>If your navbar is empty, it means you havent signed up yet
          <a href="/signup" className='cursor-pointer link'>Sign up</a>
        </p>
      </>
    </main>
  )
}
