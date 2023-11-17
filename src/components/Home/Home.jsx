import { useContext } from "react";
import { userContext } from "./../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { deleteNote, getNote, showModal } from "../../utils/note";
import { NoteContext } from "../../context/NoteContext";
import { useMutation, useQuery, useQueryClient } from "react-query";
import Loading from "../Loading/Loading";
import NoteItem from "./NoteItem";

const Home = () => {
  const { token, setToken } = useContext(userContext);
  const {  setNotes } = useContext(NoteContext);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  function logout() {
    localStorage.clear();
    setToken(null);
    navigate("/auth/login");
  }

  const { data, isLoading,  } = useQuery("getNotesa", () =>
    getNote({ token, updater: setNotes })
  );

  const mutation = useMutation(
    ({ id }) => deleteNote({ token, id, updater: setNotes }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getNotesa");
      },
      onError: (error) => {
        console.error("Delete mutation error:", error);
      },
    }
  );

  return (
    <section>
      <header className="flex justify-between items-center my-5">
        <div className="hidden md:block"></div>
        <h1 className="text-white text-4xl text-center mb-2">Daily Notes</h1>
        <button
          onClick={logout}
          className="bg-fourdColor w-[100px] rounded-[5px] h-[30px] logout hover:scale-[1.05] active:scale-[0.9] transition">
          Logout <i className="fa-solid  ms-1 fa-right-from-bracket"></i>
        </button>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center md:items-start">
        <div className=" text-center  ">
          <h3 className="capitalize text-[25px] mb-2 font-semibold">create Note</h3>
          <div className="bg-thirdColor relative h-[30px]">
            <p className=" rounded-full bg-mainColor w-[35px]  h-[35px] flex items-center absolute left-[50%] translate-x-[-50%] top-[100%] translate-y-[-20px]">
              <i  className="fa-solid  fa-angles-down mx-auto animate-movingUpDown rounded-full  "></i>
            </p>
          </div>
          <button
            onClick={() => {
              showModal({ token, updater: setNotes, queryClient: queryClient });
            }}
            className="bg-secondColor hover:bg-thirdColor transition active:scale-[0.9]  mt-[30px] w-[100px] h-[30px] rounded-[5px]">
            + Create
          </button>
        </div>
        <div className=" md:col-span-2 lg:col-span-3 rounded-[5px] grid grid-cols-1 lg:grid-cols-2  gap-4 ">
          {data ? (
            data
              .reverse()
              .map((note, index) => (
                <NoteItem
                  key={note._id}
                  note={note}
                  data={data}
                  index={index}
                  mutation={mutation}
                />
              ))
          ) : isLoading ? (
            <Loading />
          ) : (
            <p className="text-center text-red-700 font-bold text-[32px]  border-b border-red-500 col-span-2">No Notes Found </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Home;
