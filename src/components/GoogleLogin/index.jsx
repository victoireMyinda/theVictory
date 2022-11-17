import React, { useEffect, useState } from "react";
import { gapi, loadAuth2 } from "gapi-script";
import { useNavigate } from "react-router-dom";

import "./style.css";

const SignIn = () => {
  const clientId = import.meta.env.VITE_APP_ID_CLIENT;
  console.log("clientId: ", clientId)
  const Navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect((props) => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        clientId,
        "https://www.googleapis.com/auth/youtube.force-ssl"
      );
      if (auth2.isSignedIn.get()) {
        //auth2.signOut();
        updateUser(auth2.currentUser.get());
      } else {
        attachSignin(document.getElementById("started"), auth2);
      }

      attachSignin(document.getElementById("started"), auth2);
    };
    setAuth2();
  }, []);

  const attachSignin = (element, auth2) => {
    auth2.attachClickHandler(
      element,
      {},
      (googleUser) => {
        updateUser(googleUser);
      },
      (error) => {
        console.log(JSON.stringify(error));
      }
    );
  };

  const updateUser = (user) => {
    console.log(user.xc.access_token);
    localStorage.setItem("token", user.xc.access_token);
    const profileImg = user.getBasicProfile().getImageUrl();
    localStorage.setItem("profilUser", profileImg);
    Navigate("/myChannel");
  };

  return (
    <div className="all">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-10 col-xl-9 mx-auto h">
            <div class="card flex-row border-0 shadow rounded-3 overflow-hidden h-row">
              <div class="card-img-left d-none d-md-flex"></div>
              <div class="card-body p-4 p-sm-5">
                <h5 class="card-title text-center mb-5 fw-light fs-5">
                  The Victory
                </h5>
                <form>

                  <div
                    id="started"
                    className="btn btn-danger d-block text-center btn-login"
                  >
                    Sign in with Google
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
