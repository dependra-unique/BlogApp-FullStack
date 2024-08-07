import React, { useContext } from 'react'
import PageAnimationWrapper from '../common/PageAnimationWrapper.jsx'
import { Link } from 'react-router-dom'
import { UserContext } from '../App.jsx'
import { removeFromSession } from '../common/session.jsx';

function UserNavigationPanel() {

    const {userAuth : {username}, setUserAuth } = useContext(UserContext);

    const signOutUser = () => {
        removeFromSession("user");
        setUserAuth({ accessToken: null});
    }
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

            <button 
            className='text-left p-4 hover:bg-grey w-full pl-8 py-4'
            onClick={signOutUser}
            >
                <h1 className='font-bold text-xl mb-1'>Sign Out</h1>
                <p className='text-dark-grey'>@{username}</p>
            </button>
        </div>

    </PageAnimationWrapper>
  )
}

export default UserNavigationPanel





// //test...
// import React, { useContext, useRef, useEffect } from 'react';
// import PageAnimationWrapper from '../common/PageAnimationWrapper.jsx';
// import { Link } from 'react-router-dom';
// import { UserContext } from '../App.jsx';
// import { removeFromSession } from '../common/session.jsx';

// function UserNavigationPanel({ closePanel }) {
//     const { userAuth: { username }, setUserAuth } = useContext(UserContext);
//     const panelRef = useRef(null);

//     const signOutUser = () => {
//         removeFromSession("user");
//         setUserAuth({ accessToken: null });
//         closePanel();
//     };

//     // Handle clicks outside of the panel
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (panelRef.current && !panelRef.current.contains(event.target)) {
//                 closePanel();
//             }
//         };

//         document.addEventListener('mousedown', handleClickOutside);
//         return () => {
//             document.removeEventListener('mousedown', handleClickOutside);
//         };
//     }, [closePanel]);

//     return (
//         <PageAnimationWrapper
//             className="absolute right-0 z-50"
//             transition={{ duration: 0.2 }}
//         >
//             <div ref={panelRef} className='bg-white absolute right-0 border border-grey w-60 duration-200'>
//                 <Link to="/editor" className='flex gap-2 link md:hidden pl-8 py-4' onClick={closePanel}>
//                     <i className="fi fi-rr-edit"></i>
//                     <p>Write</p>
//                 </Link>

//                 <Link to={`/user/${username}`} className='flex link pl-8 py-4' onClick={closePanel}>
//                     Profile
//                 </Link>

//                 <Link to="/dashboard/blogs" className='flex link pl-8 py-4' onClick={closePanel}>
//                     Dashboard
//                 </Link>
//                 <Link to="/settings/edit-profile" className='flex link pl-8 py-4' onClick={closePanel}>
//                     Settings
//                 </Link>

//                 <span className='absolute border-t border-grey w-[100%]'>
//                 </span>

//                 <button
//                     className='text-left p-4 hover:bg-grey w-full pl-8 py-4'
//                     onClick={signOutUser}
//                 >
//                     <h1 className='font-bold text-xl mb-1'>Sign Out</h1>
//                     <p className='text-dark-grey'>@{username}</p>
//                 </button>
//             </div>
//         </PageAnimationWrapper>
//     );
// }

// export default UserNavigationPanel;
