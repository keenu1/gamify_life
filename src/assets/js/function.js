import { useNavigate } from "react-router-dom";

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


