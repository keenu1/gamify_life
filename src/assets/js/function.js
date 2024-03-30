import { useNavigate } from "react-router-dom";
import iziToast from "izitoast";
import Cookies from "js-cookie";

export const useNavigation = () => {
  const navigate = useNavigate();

  const goPage = (namePage) => {
    navigate("/" + namePage);
  };

  return goPage;
};

export const baseUrl = () => {
  const url = "http://localhost/apigamifylife/";

  return url;
};

export const catchErrorConnection = (error) => {

  if (error.code === "ECONNABORTED") {
    alertPopupError(
      "Unstable Connection"
    );
  } else if (error.code === "ERR_NETWORK") {
    alertPopupError(
      "Unstable Connection"
    )
  } else if (error.code === "ERR_BAD_REQUEST") {
    if (error.response?.request?.status === 401) {
      Cookies.set("token", "");
      CloseLoading();
      window.location.href = '/';
    }
  } else {
    AlertPopup("error", "", "Mohon maaf terjadi kesalahan", 1500, false);
  }


  // if (error.response && error.response.status === 401) {
  //   alertPopupError("Unauthorized. Please log in again.");

  // } else {
  //   alertPopupError("An error occurred. Please try again.");
  //   console.log(error);
  // }
}

export const timeout = () => {
  const timeout = 30000;

  return timeout;
};

export const currentDate = () => {
  const date = new Date();

  // Get year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Adding 1 because getMonth() returns zero-based index
  const day = String(date.getDate()).padStart(2, '0');

  // Format the date as 'YYYY-MM-DD'
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}


export const ShowLoading = () => {
  Swal.fire({
    title: "",
    html: `
    
    <div class="loader "></div> 
    
    <style>
.loader {
  height: 4px;
  width: 100%;
  margin-top:4px;
  --c:no-repeat linear-gradient(#000000 0 0);
  background: var(--c),var(--c),#e6e6e6;
  background-size: 60% 100%;
  animation: l16 3s infinite;
}
@keyframes l16 {
  0%   {background-position:-150% 0,-150% 0}
  66%  {background-position: 250% 0,-150% 0}
  100% {background-position: 250% 0, 250% 0}
}
</style>
`, // add html attribute if you want or remove
    allowOutsideClick: false,
    showConfirmButton: false,
    // didOpen: () => {
    //   Swal.showLoading();
    // },
  });
};

export const CloseLoading = () => {
  Swal.close();
};

export const alertPopupError = (message) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
    timer: 2500,

  });
};

export const alertPopupSuccess = (message) => {
  Swal.fire({
    icon: "success",
    title: "",
    text: message,
    timer: 2500,

  });
};

export const alertBottom = (title, message) => {
  iziToast.show({
    title: title,
    message: message,
    color: "green",
    timeout: 2500,
  });
}


