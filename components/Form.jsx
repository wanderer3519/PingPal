import { EmailOutlined, LockClockOutlined, PersonOutline } from '@mui/icons-material'
import Link from 'next/link'
import React from 'react'
import { useForm } from 'react-hook-form'

const Form = ({ type }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useFormm();

  return (
    <div className='auth'>
      <div className="content">
        <img src="/assets/logo.png" alt="logo" className='logo' />

        <form className='form'>
          {type === 'register' && (
            <div className='input'>
              <input {...register("username", {
                required: "username is required", 
                validate: (value) => {
                  if (value.length < 3) {
                    return 'username must be at least 3 characters'
                  }
                }
              })} type='text' placeholder='Username' className='input-field' />
              <PersonOutline sx={{ color: '#737373' }} />
            </div>
          )}

          <div className='input'>
            <input {...register("email", {
              required: 'email is required',
            })} type='text' placeholder='Email' className='input-field' />
            <EmailOutlined sx={{ color: '#737373' }} />
          </div>

          <div className='input'>
            <input {...register("password", {
              required: 'password is required',
              validate: (value) => {
                if (value.length < 5 || !value.match(/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/)) {
                  return 'password must be at least 3 characters and contain a special character'
                }
              }
            })} 
            type='password' placeholder='Password' className='input-field' />
            <LockClockOutlined sx={{ color: '#737373' }} />
          </div>

          <button className='button' type='submit' >
            {type === 'register' ? 'Register' : 'Login'}
          </button>

        </form>

        {type === 'register' ? (
          <Link href="/" className='link' >
            <p className='text-center' > Already have an account? Sign in Here </p>
          </Link>
        ) : (
          <Link href="/register" className='link' >
            <p className='text-center' > Don't have an account? Register Here </p>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Form