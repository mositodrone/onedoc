import Image from 'next/image';
import React from 'react'

const Collaborator = ({ key, roomId, creatorId, email, collaborator, user } : CollaboratorProps) => {
  const [UserType, setUserType] = useState(collaborator.userType || 'viewer');

  const [setLoading, setSetLoading] = useState(false);

  const shareDocumentHandler = async (type: string) => {}
  const removeCollaboratorHandler = async (type: string) => {}
  
  return(
    <li className="flex items-center justify-between gap-2 py-3">
      <div className="flex gap-2">
        <Image
          src={collaborator.avatar}
          alt={collaborator.name}
          width={36}
          height={36}
          className="size-9 rounded-full"
        />
      </div>
    </li>
  )
}

export default Collaborator