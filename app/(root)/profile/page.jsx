/**
 * This page is used to edit the user profile and display it
 */

"use client"

import React, { useEffect, useState } from 'react'
import { PersonOutline } from '@mui/icons-material'
import { useSession } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { CldUploadButton } from 'next-cloudinary';
import Loader from '@components/Loader';

const page = () => {
  // Get the user session
  const { data: session } = useSession();
  const user = session?.user;

  // Set the loading state
  const [loading, setLoading] = useState(true);

  // Reset/update the user details in the form
  useEffect(() => {
    if (user) {
      reset({
        username: user?.username,
        profileImage: user?.profileImage
      })
    }
    setLoading(false);
  }, [user]);

  const { register, watch, setValue, handleSubmit, reset, formState: { error } } = useForm();

  // upload the photo to cloudinary
  const uploadPhoto = (result) => {
    setValue('profileImage', result?.info?.secure_url);
  }

  // Update the user details
  const updateUser = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${user._id}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      setLoading(false);
      // auto reload after updating the user profile image
      window.location.reload();
    }
    catch (error) {
      console.log(error);
    }
  }

  // Loading state
  return loading ? <Loader /> : (

    // Edit profile form
    <div className='profile-page'>
      <h1 className='text-heading3-bold'> Edit your profile </h1>

      {/* Form to edit the user profile */}
      <form className='edit-profile' onSubmit={handleSubmit(updateUser)}>
        <div className="input">

          <input {...register('username', {
            required: 'Username is required',
            validate: value => {
              if (value.length < 3)
                return 'Username must be at least 3 characters long';

            }
          })}
            type="text"
            placeholder='Username'
            className='input-field' />

          <PersonOutline sx={{ color: "#737373" }} />
        </div>
        {error?.username && <p className='text-red-500'>{error.username.message}</p>}

        <div className='flex items-center justify-between'>
          <img src={watch('profileImage') || user?.profileImage || "/assets/person.jpg"}
            alt="profile" className='w-40 h-40 rounded-full' />

          {/* Upload button to upload the profile image */}
          <CldUploadButton options={{ maxFiles: 1 }} onSuccess={uploadPhoto} uploadPreset='rn7zselu' >
            <p className='text-body-bold'>Upload new photo</p>
          </CldUploadButton>
        </div>

        {/* Save changes button */}
        <button className='btn' type='submit'> Save changes </button>
      </form>
    </div>
  )
}

export default page