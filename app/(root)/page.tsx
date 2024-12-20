import AddDocumentBtn from '@/components/AddDocumentBtn'
import Header from '@/components/Header'
import { getDocuments } from '@/lib/actions/room.actions'
import { dateConverter } from '@/lib/utils'
import { SignedIn, UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

const Home = async () => {
  const user = await currentUser();
  if(!user) redirect('/sign-in');
  const roomDocuments = await getDocuments(user.emailAddresses[0].emailAddress)

  return (
    <div>
      <main className="home-container">
        <Header className="sticky left-0 top-0">
          <div className="flex items-center gap-2 lg:gap-4">
            Notification
            <SignedIn>
              <UserButton/>
            </SignedIn>
          </div>
        </Header>

        {roomDocuments?.data.length > 0 ? (
          <div className="document-list-conatiner">
            <div className="document-list-title">
              <h3 className="text-28-semibold">All documents</h3>
              <AddDocumentBtn 
                userId={user.id}
                email={user.emailAddresses[0].emailAddress}
              />              
            </div>

              <ul className="document-ul">
                {roomDocuments.data.map(({ id, metadata, createdAt }: any) => (
                  <li key={id} className="document-list-item">
                    <Link href={`/documents/${id}`} className="flex flex-1 items-center gap-4">
                      <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
                        <Image
                          src="/assets/icons/doc.svg"
                          alt="/file"
                          width={40}
                          height={40}
                        />
                      </div>
                      <div className="space-y-1">
                        <p className="line-clamp-1 text-lg">
                          {metadata.title}
                        </p>
                        <p className="text-sm font-white text-blue-100">
                          Created about {dateConverter(createdAt)}
                        </p>
                      </div>
                    </Link>
                    {/* Add a Delete Button */}
                  </li>
                ))}
              </ul>
          </div>
        ): (
          <div className="document-list-empty">
            <Image
              src="/assets/icons/doc.svg"
              alt="document"
              width={40}
              height={40}
              className="mx-auto"
            />

            <AddDocumentBtn
              userId={user.id}
              email={user.emailAddresses[0].emailAddress}
            />
          </div>
        )}

      </main>
    </div>
  )
}

export default Home