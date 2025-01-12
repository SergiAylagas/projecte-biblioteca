import { LoaderFunction, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { fetchData } from "~/utils/api";
import Header from "~/components/Header";
import { isAuthenticated } from "~/utils/auth";

export const loader: LoaderFunction = async ({ request }) => {
  const authenticated = await isAuthenticated(request);
  if (!authenticated) {
    return redirect("/login");
  }

  const userId = 1; // Reemplaza esto con la lógica para obtener el ID del usuario autenticado
  const books = await fetchData(`books?user_id=${userId}`);
  return json({ authenticated, books });
};

export default function MyBooks() {
  const { authenticated, books } = useLoaderData();

  return (
    <div className="flex flex-col h-screen">
      <Header authenticated={authenticated} />
      <main className="flex-grow flex items-center justify-center">
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="bg-grey-500 dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6 text-gray-900 dark:text-gray-100">
                <div className="container mx-auto px-20">
                  <div className="bg-gray-300">
                    <div className="p-3 px-6 min-h-48 flex justify-center items-center" style={{ cursor: "auto" }}>
                      <div className="overflow-y-auto h-auto">
                        <div className="flex flex-col gap-10">
                          {books.map((book: any) => (
                            <div key={book.id} className="rounded-md shadow-md sm:w-96 bg-coolGray-900 text-coolGray-100">
                              <div className="flex items-center justify-between p-3" style={{ cursor: "auto" }}>
                                <div className="flex items-center space-x-2" style={{ cursor: "auto" }}>
                                  <img src={book.user.image || "/images/default.png"} alt={book.user.nick} className="object-cover object-center w-8 h-8 rounded-full shadow-sm bg-coolGray-500 border-coolGray-700" style={{ cursor: "auto" }} />
                                  <div className="-space-y-1" style={{ cursor: "auto" }}>
                                    <h2 className="text-sm font-semibold leading-none" style={{ cursor: "auto" }}>{book.user.name} {book.user.surname}</h2>
                                  </div>
                                </div>
                              </div>
                              <img src={book.image_path} alt="" className="object-cover object-center w-48 h-48 bg-coolGray-500" style={{ cursor: "auto" }} />
                              <div className="p-3" style={{ cursor: "auto" }}>
                                <div className="flex items-center justify-between" style={{ cursor: "auto" }}>
                                  <div className="space-y-3 py-3" style={{ cursor: "auto" }}>
                                    <p className="text-sm" style={{ cursor: "auto" }}>
                                      <span className="text-lg font-light text-grey-100">@{book.user.name} | {new Date(book.created_at).toLocaleDateString()}</span>
                                    </p>
                                    <p className="text-sm" style={{ cursor: "auto" }}>
                                      <span className="text-base font-semibold px-2">{book.description}</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}