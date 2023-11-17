import React, { useContext } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { userContext } from "../../context/UserContext";
import { showDeleteModal, showUpdateModal } from "../../utils/note";
import Lottie from "lottie-react";
import noteimg from "../../../public/animation/note.json";
import { useQueryClient } from "react-query";

const NoteItem = ({ note ,data, index,mutation}) => {
  const { title, content, _id } = note;
  
  

  
  const { token, setToken } = useContext(userContext);
  const queryClient = useQueryClient();
  return (
    <article>
       <div
                key={index}
                className="border border-gray-400 rounded-[5px] mb-1 ">
                <div className=" flex bg-headerNote justify-center items-center flex-wrap px-3">
                  <h2  className=" capitalize text-center text-[20px] font-bold  overflowWrap  overflow-hidden ">
                    {title} 
                  </h2>
                 
                </div>
                <h3 className=" capitalize  text-center py-3 bg-bodyNote overflowWrap overflow-hidden px-3">
                  {content}
                </h3>
                <div className="flex items-center ps-2 bg-footerNote capitalize ">
                  <RiDeleteBin6Fill title="Delete"
                    onClick={() => {
                      showDeleteModal({ mutation, id: _id, token });
                    }}
                    className="text-[20px] hover:scale-[1.1] transition text-red-700 cursor-pointer"
                  />
                   <Lottie 
                  onClick={()=>{
                    showUpdateModal({title:title,desc:content , token , id:_id ,queryClient})
                  }}
                    animationData={noteimg}
                    title="Edite"
                    loop={false}
                    className="w-[50px] h-[50px] hover:scale-[1.1] transition  cursor-pointer"
                  />
                </div>
              </div>
    </article>
  );
};

export default NoteItem;
