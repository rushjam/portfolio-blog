import Link from 'next/link'
import Tag from '@/components/Tag'
import React from 'react'

const HomeLayout = ({ posts }) => {
  return (
    <div className="container mx-auto mt-8 mb-12">
      <div className="-mx-4 flex flex-wrap">
        <div className="mb-4 w-full px-4 lg:w-3/5">
          {posts.slice(0, 1).map((post, index) => {
            const { slug, date, title, summary, tags, thumbnail } = post

            const originalDate = new Date(date)
            const formattedDate = originalDate.toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })
            return (
              <div className="p-2" key={0}>
                <img alt={summary} src={thumbnail} className="mb-4 w-full rounded-md" />
                {tags.slice(0, 1).map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
                <h2 className="my-4 break-keep text-5xl font-extrabold leading-10 tracking-tight">
                  <Link
                    href={`/blog/${slug}`}
                    className="cursor-pointer text-gray-900 no-underline hover:underline dark:text-gray-100"
                  >
                    {title}
                  </Link>
                </h2>
                <p className="prose my-2 max-w-none text-sm text-gray-500 dark:text-gray-400">
                  {summary}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
              </div>
            )
          })}
        </div>

        <div className="mb-4 w-full px-2 lg:w-2/5">
          <div className="mb-4 p-2">
            {posts.slice(1, 4).map((post, index) => {
              const { slug, date, title, summary, tags, thumbnail } = post

              const originalDate = new Date(date)
              const formattedDate = originalDate.toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })

              return (
                <>
                  <div className="flex items-start gap-4" key={index}>
                    <img
                      alt={summary}
                      src={thumbnail}
                      className="mb-4 h-auto w-1/3 rounded-md object-contain"
                    />
                    <div>
                      {tags.slice(0, 1).map((tag) => (
                        <Tag key={tag} text={tag} />
                      ))}
                      <h2 className="my-2 break-keep text-2xl font-extrabold leading-8 tracking-tight">
                        <Link
                          href={`/blog/${slug}`}
                          className="cursor-pointer text-gray-900 no-underline hover:underline dark:text-gray-100"
                        >
                          {title}
                        </Link>
                      </h2>
                      <p className="prose my-2 max-w-none text-sm text-gray-500 dark:text-gray-400">
                        {summary}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
                    </div>
                  </div>
                  {index != '2' && (
                    <div className="my-8 flex border border-slate-200	dark:border-slate-800"></div>
                  )}
                </>
              )
            })}
          </div>
        </div>
      </div>
      <div className="my-8 flex border border-slate-200	dark:border-slate-800"></div>
      <div className="-mx-4 flex flex-wrap">
        {posts.slice(4, 6).map((post, index) => {
          const { slug, date, title, summary, tags, thumbnail } = post

          const originalDate = new Date(date)
          const formattedDate = originalDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })
          return (
            <div className="mb-4 w-full px-4 lg:w-1/2" key={index}>
              <div className="p-2">
                <img alt={summary} src={thumbnail} className="mb-4 w-full rounded-md" />
                {tags.slice(0, 1).map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
                <h2 className="my-4 break-keep text-3xl font-extrabold leading-10 tracking-tight">
                  <Link
                    href={`/blog/${slug}`}
                    className="cursor-pointer text-gray-900 no-underline hover:underline dark:text-gray-100"
                  >
                    {title}
                  </Link>
                </h2>
                <p className="prose my-2 max-w-none text-gray-500 dark:text-gray-400">{summary}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{formattedDate}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="my-4 flex border-2 border-slate-200	dark:border-slate-800"></div>
      <h5 className="font-bold text-xl">Latest Post</h5>
      <div className="mb-8 mt-4 flex border border-slate-200	dark:border-slate-800"></div>

      <div className="flex justify-between gap-4">
        {posts.slice(6, 10).map((post, index) => {
          const { slug, date, title, summary, tags, thumbnail } = post

          const originalDate = new Date(date)
          const formattedDate = originalDate.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          })

          return (
            <div className="mb-4 w-full px-4 lg:w-1/2" key={index}>
              {tags.slice(0, 1).map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
              <h2 className="my-4 break-keep text-lg font-extrabold tracking-tight">
                <Link
                  href={`/blog/${slug}`}
                  className="cursor-pointer text-gray-900 no-underline hover:underline dark:text-gray-100"
                >
                  {title}
                </Link>
              </h2>
              <p className="prose my-2 max-w-none text-sm text-gray-500 dark:text-gray-400">{summary}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{formattedDate}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomeLayout
