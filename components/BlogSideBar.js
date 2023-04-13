import React from 'react'
import Link from '@/components/Link'
import Tag from '@/components/Tag'

export default function BlogSideBar({ tags, next, prev, basePath }) {
  return (
    <aside className="sticky top-0 col-span-1 self-start">
      <footer>
        <div className="divide-gray-200 text-sm font-medium leading-5 dark:divide-gray-700 xl:col-start-1 xl:row-start-2 xl:divide-y">
          {tags && (
            <div className="py-4 xl:py-8">
              <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                Tags
              </h2>
              <div className="flex flex-wrap">
                {tags.map((tag) => (
                  <Tag key={tag} text={tag} />
                ))}
              </div>
            </div>
          )}
          {(next || prev) && (
            <div className="flex justify-between py-4 xl:block xl:space-y-8 xl:py-8">
              {prev && (
                <div>
                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    &larr; Previous Article
                  </h2>
                  <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    <Link href={`/${prev.path}`}>{prev.title}</Link>
                  </div>
                </div>
              )}
              {next && (
                <div>
                  <h2 className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">
                    Next Article &rarr;
                  </h2>
                  <div className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
                    <Link href={`/${next.path}`}>{next.title}</Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="pt-4 xl:pt-8">
          <Link
            href={`/${basePath}`}
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="Back to the blog"
          >
            &larr; Back to the all blogs
          </Link>
        </div>
      </footer>
    </aside>
  )
}
