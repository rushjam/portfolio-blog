import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { nightOwl } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import dotenv from 'dotenv'
dotenv.config({ encoding: 'latin1' })

console.log(process.env.COMPILE_API)
console.log(process.env.COMPILE_API_KEY)
console.log(process.env.COMPILE_API_HOST)

const CodeBlock = ({ userLang, userCode }) => {
  const [loading, setLoading] = useState(false)

  const [userOutput, setUserOutput] = useState('')

  const [isCopied, setIsCopied] = useState(false)
  const [isCompiled, setIsCompiled] = useState(false)

  const [url, setUrl] = useState('')

  useEffect(() => {
    if (process.env.COMPILE_API) {
      setUrl(process.env.COMPILE_API)
    }
  }, [])

  console.log("URL - ",url)

  const codeLang = {
    python: 'python3',
    java: 'java',
    javascript: 'nodejs',
    csharp: 'csharp',
  }

  const Compile = async () => {
    setLoading(true)
    setIsCompiled(true)

    const url = process.env.COMPILE_API
    const headers = {
      'Content-Type': 'application/json',
      'X-RapidAPI-Key': process.env.COMPILE_API_KEY,
      'X-RapidAPI-Host': process.env.COMPILE_API_HOST,
    }

    const requestBody = {
      language: codeLang[userLang],
      version: 'latest',
      code: userCode,
      input: null,
    }

    const options = {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    }

    try {
      const response = await fetch(url, options)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData = await response.json()
      setUserOutput(responseData.output)
    } catch (error) {
      console.error('Fetch error:', error)
    } finally {
      setLoading(false)
      setIsCompiled(false)
    }
  }

  const handleCopyClick = () => {
    // Create a temporary textarea element to copy the code
    const tempTextarea = document.createElement('textarea')
    tempTextarea.value = userCode
    document.body.appendChild(tempTextarea)
    tempTextarea.select()
    document.execCommand('copy')
    document.body.removeChild(tempTextarea)

    // Set the copied state to true and reset it after 3 seconds
    setIsCopied(true)
    setTimeout(() => {
      setIsCopied(false)
    }, 3000)
  }

  const handleLoading = () => {
    setIsCompiled(true)
    setTimeout(() => {
      setIsCompiled(false)
    }, 1000)
  }

  return (
    <>
      <div className="hover-parent relative">
        <button
          className={`absolute bottom-2 right-2 z-50 h-8 w-8 rounded border-2 ${
            isCompiled ? 'border-green-400' : 'border-gray-300'
          } bg-gray-700 p-1 dark:bg-gray-800`}
          onClick={userOutput ? handleLoading : Compile}
        >
          {isCompiled ? (
            <Loader />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="-1 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="h-full w-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
          )}
        </button>
        <button
          className={`copy-button absolute right-2 top-2 z-50 h-8 w-8 rounded border-2 ${
            isCopied ? 'border-green-400' : 'border-gray-300'
          } bg-gray-700 p-1 opacity-0 hover:opacity-100 dark:bg-gray-800`}
          onClick={handleCopyClick}
        >
          {isCopied ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              style={{ stroke: 'rgb(74 222 128)' }}
              className="h-full w-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-.1-.664m-5.8 0A2.251 2.251 0 0 1 13.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0 1 18 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3 1.5 1.5 3-3.75"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="-1 0 24 24"
              strokeWidth="1.5"
              stroke="white"
              className="h-full w-full"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
          )}
        </button>
        <SyntaxHighlighter language={userLang} style={{nightOwl}}>
          {userCode}
        </SyntaxHighlighter>
      </div>
      {loading && <Loader />}
      {userOutput && (
        <>
          <p>Output:</p>
          <pre>
            <code>{userOutput}</code>
          </pre>
        </>
      )}
    </>
  )
}

export default CodeBlock
