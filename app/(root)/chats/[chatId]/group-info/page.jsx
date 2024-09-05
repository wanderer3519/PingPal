"use client"

import { useEffect, useState } from 'react'
import { GroupOutlined, PersonOutline } from '@mui/icons-material'
import { useForm } from 'react-hook-form';
import { CldUploadButton } from 'next-cloudinary';
import Loader from '@components/Loader';
import { useParams, useRouter } from 'next/navigation';

const page = () => {
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState({});

  const { chatId } = useParams();

  const getChatDetails = async () => {
    try {
      const response = await fetch(`/api/chats/${chatId}`);
      const data = await response.json();
      setChat(data);
      setLoading(false);

      reset({
        name: data?.name,
        groupPhoto: data?.groupPhoto,

      })

    } 
    catch (error) {
      console.log(error);  
    }
  }

  useEffect(() => {
    if (chatId)
      getChatDetails();
  }, [chatId])  

  const { register, watch, setValue, handleSubmit, reset, formState: { error } } = useForm();

  const uploadPhoto = (result) => {
    setValue('groupPhoto', result?.info?.secure_url);
  }

  const router = useRouter();

  const updateGroupChat = async (data) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/chats/${chatId}/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      setLoading(false);

      if(response.ok)
        router.push(`/chats/${chatId}`);
    }
    catch (error) {
      console.log(error);
    }
  }


  return loading ? <Loader /> : (
    <div className='profile-page'>
      <h1 className='text-heading3-bold'> Edit group info </h1>

      <form className='edit-profile' onSubmit={handleSubmit(updateGroupChat)}>
        <div className="input">

          <input {...register('name', {
            required: 'Group chat name is required',
          })}
            type="text"
            placeholder='Group chat name'
            className='input-field' />

          <GroupOutlined sx={{ color: "#737373" }} />
        </div>
        {error?.name && <p className='text-red-500'>{error.name.message}</p>}

        <div className='flex items-center justify-between'>
          <img src={watch('groupPhoto') || "/assets/group.png"}
            alt="profile" className='w-40 h-40 rounded-full' />

          <CldUploadButton options={{ maxFiles: 1 }} onSuccess={uploadPhoto} uploadPreset='rn7zselu' >
            <p className='text-body-bold'>Upload new photo</p>
          </CldUploadButton>
        </div>

        <div className='flex flex-wrap gap-3'>
          {chat?.members?.map((member, index) => (
            <p key={index} className='selected-contact'> {member?.username} </p>
          ))}
        </div>

        <button className='btn' type='submit'> Save changes </button>
      </form>
    </div>
  )
}

export default page