import defaultImage from "../../assets/img/default.png";
import Navbar from "../../components/navbar";

function Login() {
  return (
    <>
      <Navbar />
      <div className=" flex  flex-row mx-5 mt-5 border p-5 rounded-xl shadow-lg ">
        <div className=" flex  justify-center items-center ">
          <div className="overflow-hidden rounded-full w-32 h-32 ">
            <img
              src={defaultImage}
              alt=""
              className="object-cover w-full h-full"
            />
          </div>
        </div>
        <div className=" w-full  grid grid-cols-3 gap-4 ">
          <div className="p-3">
            <div className="font-bold mb-3">Title</div>
            <div>
              <div className="mb-2">
                <label>Skill 1</label>
                <div className="bg-red-50 w-100 h-3 rounded-full"></div>
              </div>
              <div className="mb-2">
                <label>Skill 1</label>
                <div className="bg-red-50 w-100 h-3 rounded-full"></div>
              </div>
              <div className="mb-2">
                <label>Skill 1</label>
                <div className="bg-red-50 w-100 h-3 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="font-bold mb-3">Title</div>
            <div>
              <div className="mb-2">
                <label>Skill 1</label>
                <div className="bg-red-50 w-100 h-3 rounded-full"></div>
              </div>
              <div className="mb-2">
                <label>Skill 1</label>
                <div className="bg-red-50 w-100 h-3 rounded-full"></div>
              </div>
              <div className="mb-2">
                <label>Skill 1</label>
                <div className="bg-red-50 w-100 h-3 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="font-bold mb-3">Title</div>
            <div>
              <div className="mb-2">
                <label>Skill 1</label>
                <div className="bg-red-50 w-100 h-3 rounded-full"></div>
              </div>
              <div className="mb-2">
                <label>Skill 1</label>
                <div className="bg-red-50 w-100 h-3 rounded-full"></div>
              </div>
              <div className="mb-2">
                <label>Skill 1</label>
                <div className="bg-red-50 w-100 h-3 rounded-full"></div>
              </div>
            </div>
          </div>
          <div className="p-3">
            <div className="font-bold mb-3">Title</div>
            <div>
              <div className="mb-2">
                <label>Skill 1</label>
                <div className="bg-red-50 w-100 h-3 rounded-full"></div>
              </div>
              <div className="mb-2">
                <label>Skill 1</label>
                <div className="bg-red-50 w-100 h-3 rounded-full"></div>
              </div>
              <div className="mb-2">
                <label>Skill 1</label>
                <div className="bg-red-50 w-100 h-3 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
