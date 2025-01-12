import { useLoaderData, Form, useActionData } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { fetchData, postData } from "~/utils/api";
import { isAuthenticated } from "~/utils/auth";

export const loader = async ({ request }) => {
  const authenticated = await isAuthenticated(request);
  if (!authenticated) {
    return redirect("/login");
  }

  const generes = await fetchData("generes");
  return json({ authenticated, generes });
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const image = formData.get("image");
  const description = formData.get("description");
  const genere = formData.get("genere");
  const valoration = formData.get("valoration");

  const data = {
    image,
    description,
    genere,
    valoration,
  };

  try {
    await postData("store.image", data);
    return redirect("/my-books");
  } catch (error) {
    return json({ error: error.message }, { status: 400 });
  }
};

export default function UploadBook() {
  const { generes } = useLoaderData();
  const actionData = useActionData();

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
          <div className="p-6 text-gray-900 dark:text-gray-100">
            <Form method="post" encType="multipart/form-data" className="mt-6 space-y-6">
              {actionData?.error && <p className="text-red-500">{actionData.error}</p>}
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Image
                </label>
                <input id="image" name="image" type="file" className="mt-1 block w-full" required />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input id="description" name="description" type="text" className="mt-1 block w-full" required />
              </div>
              <div>
                <label htmlFor="genere" className="block text-sm font-medium text-gray-700">
                  Genere
                </label>
                <select id="genere" name="genere" className="mt-1 block w-full" required>
                  {generes.map((genere) => (
                    <option key={genere.id} value={genere.id}>
                      {genere.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="valoration" className="block text-sm font-medium text-gray-700">
                  Valoració
                </label>
                <div className="flex items-center" id="star-rating">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <span key={i} className="star text-gray-400 cursor-pointer" data-value={i}>
                      ★
                    </span>
                  ))}
                </div>
                <input type="hidden" id="valoration" name="valoration" required />
              </div>
              <div className="flex items-center gap-4">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                  Save
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
      <script>
        {`
          document.addEventListener('DOMContentLoaded', function () {
            const stars = document.querySelectorAll('#star-rating .star');
            const valorationInput = document.getElementById('valoration');
            
            stars.forEach(star => {
              star.addEventListener('click', function () {
                const value = this.getAttribute('data-value');
                valorationInput.value = value;
                
                stars.forEach(s => {
                  if (s.getAttribute('data-value') <= value) {
                    s.classList.add('text-yellow-500');
                    s.classList.remove('text-gray-400');
                  } else {
                    s.classList.add('text-gray-400');
                    s.classList.remove('text-yellow-500');
                  }
                });
              });
            });
          });
        `}
      </script>
    </div>
  );
}