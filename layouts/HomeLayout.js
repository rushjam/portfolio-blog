import Link from 'next/link'
import Tag from '@/components/Tag'
import React from 'react'

const HomeLayout = ({ posts }) => {
  const convertDate = (date) => {
    const originalDate = new Date(date)
    const formattedDate = originalDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
    return formattedDate
  }

  const Post = ({ post, isLarge, isPhoto }) => {
    const { slug, date, title, summary, tags, thumbnail } = post

    return (
      <div className="p-2">
        {isPhoto && (
          <img
            alt={summary}
            src={thumbnail}
            className={`mb-4 object-cover ${isLarge ? 'h-96' : 'h-64'} w-full rounded-md`}
          />
        )}
        {tags.slice(0, 1).map((tag) => (
          <Tag key={tag} text={tag} />
        ))}
        <h2
          className={`my-4 break-keep ${
            isLarge ? 'text-5xl' : 'text-2xl'
          } font-extrabold tracking-tight`}
        >
          <Link
            href={`/blog/${slug}`}
            className="cursor-pointer text-gray-900 no-underline hover:underline dark:text-gray-100"
          >
            {title}
          </Link>
        </h2>
        <p className="prose my-2 max-w-none text-sm text-gray-500 dark:text-gray-400">{summary}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{convertDate(date)}</p>
      </div>
    )
  }

  const Divider = ({ borderSize }) => {
    return (
      <div
        className={`my-4 flex ${
          borderSize ? `border-${borderSize}` : 'border'
        } border-slate-200 dark:border-slate-800`}
      ></div>
    )
  }

  return (
    <div className="container mx-auto mb-12 mt-8">
      <div className="-mx-4 flex flex-wrap">
        <div className="mb-4 w-full px-4 lg:w-3/5">
          {posts.slice(0, 1).map((post, index) => (
            <Post post={post} key={index} isLarge isPhoto />
          ))}
        </div>

        <div className="mb-4 w-full px-2 lg:w-2/5">
          <div className="mb-4 p-2">
            {posts.slice(1, 4).map((post, index) => {
              const { slug, date, title, summary, tags, thumbnail } = post

              return (
                <div key={index}>
                  <div className="flex items-start gap-4">
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
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {convertDate(date)}
                      </p>
                    </div>
                  </div>
                  {index !== 2 && <Divider />}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <Divider borderSize="2" />
      <div className="-mx-4 flex flex-wrap">
        {posts.slice(4, 6).map((post, index) => (
          <div className="mb-4 w-full px-4 md:w-1/2 lg:w-1/2 xl:w-1/2" key={index}>
            <Post post={post} isPhoto />
          </div>
        ))}
      </div>
      <Divider borderSize="2" />
      <h5 className="text-xl font-bold">Latest Post</h5>
      <Divider />

      <div className="flex flex-wrap">
        {posts.slice(6, 10).map((post, index) => (
          <div className="mb-4 w-full px-4 md:w-1/2 lg:w-1/4 xl:w-1/4" key={index}>
            <Post post={post} key={index} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomeLayout
