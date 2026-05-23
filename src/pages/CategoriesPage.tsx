import {
  useEffect,
  useState,
} from "react";

import MainLayout from "../layouts/MainLayout";

import {
  getCategories,
  createCategory,
  deleteCategory,
} from "../services/categoryService";

type Category = {
  id: number;
  name: string;
};

const CategoriesPage = () => {

  const [categories,
    setCategories] = useState<Category[]>([]);

  const [name,
    setName] = useState("");

  const [openModal,
    setOpenModal] = useState(false);

  const fetchCategories =
    async () => {

      try {

        const data =
          await getCategories();

        setCategories(data);

      } catch (error) {

        console.log(error);

      }
      
    };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate =
    async () => {

      try {

        await createCategory({
          name,
        });

        setName("");

        setOpenModal(false);

        fetchCategories();

      } catch (error) {

        console.log(error);

      }
    };
    

  const handleDelete =
    async (id: number) => {

      const confirmDelete =
        confirm(
          "Yakin hapus category?"
        );

      if (!confirmDelete) return;

      try {

        await deleteCategory(id);

        fetchCategories();

      } catch (error) {

        console.log(error);

      }
    };
    

  return (

    <MainLayout>

      <div className="bg-white p-6 rounded-xl shadow-lg">

        {/* HEADER */}

        <div className="flex justify-between items-center mb-6">

          <h1 className="text-3xl font-bold">
            Categories
          </h1>

          <button
            onClick={() =>
              setOpenModal(true)
            }
            className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-xl"
          >
            Tambah Category
          </button>

        </div>

        {/* TABLE */}

        <div className="overflow-x-auto">

          <table className="w-full border-collapse">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-4 text-left">
                  No
                </th>

                <th className="p-4 text-left">
                  Category Name
                </th>

                <th className="p-4 text-left">
                  Action
                </th>

              </tr>

            </thead>

            <tbody>

              {categories.map(
                (item, index) => (

                  <tr
                    key={item.id}
                    className="border-b"
                  >

                    <td className="p-4">
                      {index + 1}
                    </td>

                    <td className="p-4">
                      {item.name}
                    </td>

                    <td className="p-4">

                      <button
                        onClick={() =>
                          handleDelete(
                            item.id
                          )
                        }
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                      >
                        Delete
                      </button>

                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>

      </div>

      {/* MODAL */}

      {openModal && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-400px">

            <h1 className="text-2xl font-bold mb-5">
              Tambah Category
            </h1>

            <input
              type="text"
              placeholder="Masukkan nama category"
              className="w-full border p-3 rounded-lg mb-5"
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() =>
                  setOpenModal(false)
                }
                className="bg-gray-300 px-5 py-2 rounded-lg"
              >
                Batal
              </button>

              <button
                onClick={handleCreate}
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Simpan
              </button>

            </div>

          </div>

        </div>
      )}

    </MainLayout>
  );
};


export default CategoriesPage;