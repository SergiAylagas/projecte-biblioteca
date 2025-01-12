import { useActionData, Form, redirect } from "@remix-run/react";
import { json } from "@remix-run/node";
import { postData } from "~/utils/api";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const login = formData.get("login");
  const password = formData.get("password");

  const data = { login, password };

  try {
    const response = await postData("login", data);
    if (response.success) {
      return redirect("/dashboard");
    } else {
      return json({ error: response.message }, { status: 400 });
    }
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
};

export default function Login() {
  const actionData = useActionData();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-12 rounded-lg shadow-xl w-[32rem] flex flex-col">
        <h1 className="text-4xl font-bold text-center text-white mb-6">
          Login
        </h1>

        {actionData?.error && (
          <div className="bg-red-600 text-white p-3 rounded-md mb-4">
            {actionData.error}
          </div>
        )}

        <Form method="post" className="space-y-6">
          <div>
            <label
              htmlFor="login"
              className="block text-sm font-medium text-gray-300"
            >
              Email/Username
            </label>
            <input
              id="login"
              name="login"
              type="text"
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="you@example.com"
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-md text-white focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="••••••••"
            />
          </div>

          <div className="block mt-4">
            <label htmlFor="remember_me" className="inline-flex items-center">
              <input
                id="remember_me"
                type="checkbox"
                className="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800"
                name="remember"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                Remember me
              </span>
            </label>
          </div>

          <div className="flex items-center justify-end mt-4">
            <a
              className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
              href="/forgot-password"
            >
              Forgot your password?
            </a>

            <button
              type="submit"
              className="ml-3 bg-indigo-600 text-white py-3 px-4 rounded-md text-lg font-medium hover:bg-indigo-500 transition duration-200"
            >
              Log In
            </button>
          </div>
        </Form>

        <p className="text-sm text-gray-400 text-center mt-6">
          Don’t have an account?{" "}
          <a href="/register" className="text-indigo-400 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}