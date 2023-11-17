import axios from "axios";
import Swal from "sweetalert2";

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/**SHOW MODAL */
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
export function showModal({ token, updater, queryClient }) {
  Swal.fire({
    title: "Add Note",
    html: `
            <div class='grid grid-cols-1 gap-3'>
            <input required id='title' class="inputHandel" placeholder="Enter A Title..."/>
            <textarea required id='desc' class="inputHandel min-h-[100px]" placeholder="Enter A Description..."></textarea>
            </div>
        `,
    showCancelButton: true,
    confirmButtonText: "ADD",
    showLoaderOnConfirm: true,
    preConfirm: async (login) => {
      const title = document.getElementById("title").value;
      const content = document.getElementById("desc").value;

      return { title, content };
      //
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      addNote({ result, token, updater, queryClient });
    }
  });
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/**send data to api */
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export async function addNote({ result, token, updater, queryClient }) {
  try {
    const { data } = await axios.post(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      result.value,
      {
        headers: {
          token: `3b8ny__${token}`,
        },
      }
    );
    Swal.fire({
      position: "top-center",
      icon: "success",
      title: "Your work has been saved",
      showConfirmButton: false,
      timer: 1500,
    });

    await queryClient.invalidateQueries("getNotesa");
    // getNote({ token, updater });
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: error.response.data.msg,
    });
  }
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/**GET Notes*/
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export async function getNote({ token, updater }) {
  try {
    const { data } = await axios.get(
      `https://note-sigma-black.vercel.app/api/v1/notes`,
      {
        headers: {
          token: `3b8ny__${token}`,
        },
      }
    );

    return data.notes;
  } catch (error) {
    updater([]);
  }
}
/*************************************************************************** */
/*************************************************************************** */
/*************************************************************************** */
/*************************************************************************** */

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/**show Delete Modal*/
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export function showDeleteModal({ mutation, id, token, updater }) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      //*          ///////////////
      mutation.mutate({ id, token });

      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success",
      });
    }
  });
}
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/**Send Delete data to API*/
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export async function deleteNote({ token, id, updater }) {
  try {
    const { data } = await axios.delete(
      `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,
      {
        headers: {
          token: `3b8ny__${token}`,
        },
      }
    );
    console.log(data);
  } catch (error) {
    console.log("delete error", error);
    updater([]);
  }
}

/*************************************************************************** */
/*************************************************************************** */
/*************************************************************************** */
/*************************************************************************** */

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/**show update Modal*/
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export function showUpdateModal({ title, desc, id, token, queryClient }) {
    Swal.fire({
      title: "Update Note",
      html: `
          <div class='grid grid-cols-1 gap-3 '>
            <input required id='title' value="${title}" class="inputHandel" placeholder="Enter A Title..."/>
            <textarea required id='desc' class="inputHandel min-h-[100px]" placeholder="Enter A Description...">${desc}</textarea>
          </div>
        `,
      showCancelButton: true,
      confirmButtonText: "Update",
      showLoaderOnConfirm: true,
      preConfirm: async () => {
        const updatedTitle = document.getElementById("title").value;
        const updatedContent = document.getElementById("desc").value;
  
        return { updatedTitle, updatedContent };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const { updatedTitle, updatedContent } = result.value;
        updateNote({
          id,
          token,
          title: updatedTitle,
          desc: updatedContent,
          queryClient,
        });
      }
    });
  }
// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>
/**send update data to api*/
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

export async function updateNote({ id, token,title, desc,queryClient }) {
    try {
        const { data } = await axios.put(
            `https://note-sigma-black.vercel.app/api/v1/notes/${id}`,{title:title ,content:desc},
            {
              headers: {
                token: `3b8ny__${token}`,
              },
            }
          );
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          });
      
          await queryClient.invalidateQueries("getNotesa");
    } catch (error) {
        console.log('error update data',error)
    }

}
