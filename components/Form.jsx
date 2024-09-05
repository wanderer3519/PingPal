/**
 * This component is used to render the form for both login and register of authentication
 */

"use client";

import { signIn } from 'next-auth/react';
import { EmailOutlined, LockClockOutlined, PersonOutline } from '@mui/icons-material'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast';

const Form = ({ type }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    if (type === 'register') {

      // Post the data to the server
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        router.push('/');
      }

      if (response.error) {
        toast.error('An error occurred, please try again');
      }
    }

    // Get the sign in response (includes validation)
    if (type === 'login') {
      const resp = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (resp.ok) {
        router.push('/chats');
      }

      if (resp.error) {
        toast.error('Invalid email or password here');
      }
    }
  };

  return (
    <div className='auth'>
      <div className="content">
        <img src="/assets/pingpal.png" alt="logo" className='logo' />

        {/* Form for register */}
        <form className='form' onSubmit={handleSubmit(onSubmit)}>
          {type === 'register' && (
            <div>
              <div className='input'>
                <input
                  defaultValue=""
                  {...register("username", {
                    required: "username is required",
                    validate: (value) => {
                      if (value.length < 3) {
                        return 'username must be at least 3 characters'
                      }
                    }
                  })} type='text' placeholder='Username' className='input-field' />
                <PersonOutline sx={{ color: '#737373' }} />
              </div>

              {errors.username && (
                <p className='text-red-500' > {errors.username.message} </p>
              )}
            </div>
          )}

          {/* Login starts */}
          {/* Email id validation */}
          <div>
            <div className='input'>
              <input
                defaultValue=""
                {...register("email", {
                  required: 'email is required',
                })} type='text' placeholder='Email' className='input-field' />
              <EmailOutlined sx={{ color: '#737373' }} />
            </div>

            {errors.email && (
              <p className='text-red-500' > {errors.email.message} </p>
            )}
          </div>

          {/* Password validation */}
          <div>
            <div className='input'>
              <input
                defaultValue=""
                {...register("password", {
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

            {errors.password && (
              <p className='text-red-500' > {errors.password.message} </p>
            )}
          </div>

          <button className='button' type='submit' >
            {type === 'register' ? 'Register' : 'Login'}
          </button>

        </form>

        {/* Link to switch between login and register */}
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