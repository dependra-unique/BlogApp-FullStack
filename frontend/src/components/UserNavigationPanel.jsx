import React, { useContext } from 'react'
import PageAnimationWrapper from '../common/PageAnimationWrapper.jsx'
import { Link } from 'react-router-dom'
import { UserContext } from '../App.jsx'

function UserNavigationPanel() {

    const {userAuth : {username} } = useContext(UserContext);
  return (
    <PageAnimationWrapper 
    className="absolute right-0 z-50"
    transition={ {duration: 0.2}}
    >

        <div className='bg-white absolute right-0 border border-grey w-60 duration-200'>
            <Link to="/editor" className='flex gap-2 link md:hidden pl-8 py-4'>
                <i className="fi fi-rr-edit"></i>
                <p>Write</p>
            </Link>

            <Link to={`/user/${username}`} className='flex link pl-8 py-4'>
                Profile
            </Link>

            <Link to="/dashboard/blogs" className='flex link pl-8 py-4'>
                Dashboard
            </Link>
            <Link to="/settings/edit-profile" className='flex link pl-8 py-4'>
                Settings
            </Link>

            <span className='absolute border-t border-grey w-[100%]'>

            </span>
        </div>

    </PageAnimationWrapper>
  )
}

export default UserNavigationPanel