import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const HomePage = (jwt) => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const createNewSnippet = () => {
    // check if user is already logged in, redirect to login page if not
    if (localStorage.getItem("token") !== null) {
      navigate("/add-snippet");
    } else {
      navigate("/login");
    }
  };

  return (
    <div>
      <h1>Code snippet app</h1>
      {localStorage.getItem("token") ? (
        <div>
          <h3>
            {t("welcome")} {jwt.user.name}!
          </h3>
          <button className="button" onClick={createNewSnippet}>
            {t("addSnippet")}
          </button>
        </div>
      ) : (
        <div>
          <h3>{t("loginToAdd")}</h3>
          <button className="button" onClick={createNewSnippet}>
            {t("login")}
          </button>
        </div>
      )}
    </div>
  );
};
