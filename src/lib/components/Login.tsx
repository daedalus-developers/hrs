'use client'
import { useFormState } from 'react-dom';
import { login } from '@/actions/login';


const initialState = { status: 0, message: '' }

export default function Login() {
  const [state, formAction] = useFormState(login, initialState);

  console.log(state.message)
  return (
    <div>
      <form action={formAction} className='text-black' >
        <input name='email' type='text' placeholder='Email Address' />
        <input name='password' type='password' placeholder='Password' />
        <button type='submit' className='bg-white'>Submit</button>
      </form>
    </div>
  )
}

