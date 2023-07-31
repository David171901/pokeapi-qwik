import { component$ } from '@builder.io/qwik';
import { Form, routeAction$, z, zod$ } from '@builder.io/qwik-city';

export const useLoginUserAction = routeAction$((data, { cookie, redirect }) => {
  const { email, password } = data;
  if (email === 'cjl@torkore.com' && password === 'Clouds123!') {
    cookie.set('jwt', 'esto_es_mi_jwt', { secure: true, path: '/' });
    redirect(302, '/');
    return {
      success: true,
      jwt: 'esto_es_mi_jwt'
    }
  }
  return {
    success: false,
  }
}, zod$({
  email: z.string().email('Formato no válido'),
  password: z.string().min(6, 'Mínimo 6 letras'),
}));

export default component$(() => {
  const action = useLoginUserAction();
  return (
    <div class="flex items-center w-11/12 bg-white dark:bg-gray-900">
      <div class="container mx-auto">
        <div class="max-w-md mx-auto my-10">
          <div class="text-center">
            <h1 class="my-3 text-3xl font-semibold text-gray-700 dark:text-gray-200">Sign in</h1>
            <p class="text-gray-500 dark:text-gray-400">Sign in to access your account</p>
          </div>
          <div class="m-7">
            <Form action={action}>
              <div class="mb-6">
                <label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email Address</label>
                <input type="email" name="email" id="email" placeholder="you@company.com" class={`w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md`} />
              </div>
              <div class="mb-6">
                <div class="flex justify-between mb-2">
                  <label for="password" class="text-sm text-gray-600 dark:text-gray-400">Password</label>
                  <span class="text-sm text-gray-400 focus:outline-none focus:text-indigo-500 hover:text-indigo-500 dark:hover:text-indigo-300">Forgot password?</span>
                </div>
                <input type="password" name="password" id="password" placeholder="Your Password" class={`w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md`} />
              </div>
              <div class="mb-6">
                <button type="submit" class="w-full px-3 py-4 text-white bg-indigo-500 rounded-md focus:bg-indigo-600 focus:outline-none">Sign in</button>
              </div>
              <p class="text-sm text-center text-gray-400">Don&#x27;t have an account yet? <span class="text-indigo-400 focus:outline-none focus:underline focus:text-indigo-500 dark:focus:border-indigo-800">Sign up</span>.</p>
              <code>
                {JSON.stringify(action.value, undefined, 2)}
              </code>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
});