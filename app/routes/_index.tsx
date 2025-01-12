import type { MetaFunction, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import Header from "../components/Header";
import { isAuthenticated } from "../utils/auth";

export const meta: MetaFunction = () => {
  return [
    { title: "Home - My Remix App" },
    { name: "description", content: "Welcome to the homepage of My Remix App!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const authenticated = await isAuthenticated(request);
  return { authenticated };
};

export default function Index() {
  const { authenticated } = useLoaderData<{ authenticated: boolean }>();

  return (
    <div className="flex flex-col h-screen">
      <Header authenticated={authenticated} />
      <main className="flex-grow flex items-center justify-center">
        {authenticated ? (
          <div className="py-12">
            <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
              <div className="bg-grey-500 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                <div className="p-6 text-gray-900 dark:text-gray-100">
                  <div className="container mx-auto px-20">
                    <div className="bg-gray-300">
                      <div className="p-3 px-6 min-h-48 flex justify-center items-center" style={{ cursor: "auto" }}>
                        {/* Aquí va el contenido interactivo */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="text-4xl">Welcome to My Remix App!</h1>
        )}
      </main>
    </div>
  );
}