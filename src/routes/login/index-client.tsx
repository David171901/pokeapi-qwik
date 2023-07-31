import { $, component$, useComputed$, useStore } from '@builder.io/qwik';

export default component$(() => {

  const formState = useStore({
    email: '',
    password: '',
    formPosted: false,
  })

  const emailError = useComputed$(() => {
    if(formState.email.includes('@')) return ''
    return 'border-red-500 border-2'
  })

  const passwordError = useComputed$(() => {
    if(formState.password.length > 6) return ''
    return 'border-red-500 border-2'
  })

  const isFormValid = useComputed$(() => {
    if(
      emailError.value === 'border-red-500 border-2' || 
      passwordError.value === 'border-red-500 border-2'
    ) return false;

    return true;
  })

  const onSubmit = $(() => {
    formState.formPosted = true
    console.log(formState)
  })

  return (
    <div class="flex items-center w-11/12 bg-white dark:bg-gray-900">
      <div class="container mx-auto">
        <div class="max-w-md mx-auto my-10">
          <div class="text-center">
            <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign in</h1>
            <p class="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
          </div>
          <div class="m-7">
            <form onSubmit$={onSubmit} preventdefault:submit>
              <div class="mb-6">
                <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                <input type="email" name="email" id="email" placeholder="you@company.com" class={`w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md ${formState.formPosted ? emailError.value : ''}`} onInput$={(event) => formState.email = (event.target as HTMLInputElement).value} value={formState.email}/>
              </div>
              <div class="mb-6">
                <div class="flex justify-between mb-2">
                  <label for="password" class="text-sm text-gray-600 dark:text-gray-400">Password</label>
                  <span class="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</span>
                </div>
                <input type="password" name="password" id="password" placeholder="Your Password" class={`w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md ${formState.formPosted ? passwordError.value : ''}`} onInput$={(event) => formState.password = (event.target as HTMLInputElement).value} value={formState.password}/>
              </div>
              <div class="mb-6">
                <button type="submit" class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none" disabled={!isFormValid.value}>Sign in</button>
              </div>
              <p class="text-sm text-center text-gray-400">Don&#x27;t have an account yet? <span class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800">Sign up</span>.</p>
            </form>
            <pre>
              {
                JSON.stringify(formState)
              }
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
});