import React from 'react'
import InviteModal from '../components/invitemodal/InviteModal'
import Navbar from '../components/Navbar'

const InviteFriendsPage: React.FC = () => {
  return (
    <div className='w-full h-screen relative bg-gray bg-opacity-30'>
        <Navbar />
        <div className=' absolute inset-0 flex justify-center items-center'>
            <InviteModal />
        </div>
    </div>
  )
}

export default InviteFriendsPage