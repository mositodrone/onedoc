"use client";

import Loader from "@/components/Loader";
import { getclerkUsers, getDocumentUsers } from "@/lib/actions/user.actions";
import { useUser } from "@clerk/nextjs";
import { ClientSideSuspense, LiveblocksProvider } from "@liveblocks/react/suspense"
import { ReactNode } from "react";

const Provider = ({ children }: { children: ReactNode }) => {
  const { user: clerkUser } = useUser();

  return (
    <LiveblocksProvider 
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        const users = await getclerkUsers({ userIds });

        return users
      }}
      resolveMentionSuggestions={async ({ text, roomId}) => {
        const roomUsers = await getDocumentUsers({
          roomId,
          currentUser: clerkUser?.emailAddresses[0].emailAddress!,
          text,
        })

        return roomUsers;
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
    </LiveblocksProvider>
  )
}

export default Provider
// SENTRY_AUTH_TOKEN=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