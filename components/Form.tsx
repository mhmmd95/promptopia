import Link from 'next/link'
import { ChangeEvent } from 'react'

const Form = ({type, post, setPost, submitting, handleSubmit}: any) => {
  return (
    <section className='w-full m-w-full flex-start flex-col'>
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span>
      </h1>

      <p className='desc text-left max-w-md'>
        {type} and share prompts with the world and expand your imagination with new AI technologies.
      </p>
      
      <form
        onSubmit={handleSubmit}
        className='glassmorphism w-full max-w-2xl flex flex-col gap-7 mt-10'
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>

          <textarea 
            value={post.value}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPost((prevPost: any) =>  {
              return {...prevPost, prompt: e.target.value}
            })}
            placeholder='Write your prompt here..'
            name='prompt'
            required
            className='form_textarea'
          />
        </label>

        <label>
          Tag {` `}
          <span className='font-normal'>
            (#development, #AI, #Prompts)
          </span>

          <input
            type='text'
            value={post.value}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setPost((prevPost: any) =>  {
              return {...prevPost, tag: e.target.value}
            })}
            name='tag'
            required
            placeholder='#Tag'
            className='form_input'
          />
        </label>

        <div className='flex flex-end mb-5 gap-4'>
          <Link            
            href="/"
            className='text-gray-500 text-sm'
          >
            Cancel
          </Link>

          <button
            type='submit'
            disabled={submitting}
            className='px-5 bg-primary-orange text-white py-1.5 rounded-full'
          >
            {submitting ? `${type}...` : type}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form