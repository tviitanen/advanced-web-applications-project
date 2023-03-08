import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const AddSnippet = (jwt) => {
  let navigate = useNavigate();
  const { t } = useTranslation();

  const [snippetData, setSnippetData] = useState({});

  // handle submit for form
  const handleSubmit = (event) => {
    event.preventDefault();
    // check if user is already logged in, redirect to login page if not
    if (jwt.jwt === false) {
      alert(t("loginToAdd"));
      return;
    }
    fetch("http://localhost:4000/api/post", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        authorization: "Bearer " + localStorage.getItem("token"),
      },
      body: JSON.stringify({
        id: jwt.user.id,
        author: jwt.user.name,
        title: snippetData.title,
        code: snippetData.code,
      }),
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSnippetData(data);
      });
    navigate("/snippets");
  };

  // handle change for form
  const handleChange = (event) => {
    setSnippetData({ ...snippetData, [event.target.name]: event.target.value });
  };

  return (
    <div className="form-container">
      <h2>{t("addSnippet")}</h2>
      <form
        className="addSnippet-form"
        onSubmit={handleSubmit}
        onChange={handleChange}
      >
        <label htmlFor="title">{t("title")}</label>
        <input
          type="String"
          required
          placeholder={t("addTitle")}
          id="title"
          name="title"
        />
        <label htmlFor="code">{t("codeSnippet")}</label>
        <div className="input-field">
          <textarea
            type="String"
            required
            className="materialize-textarea"
            placeholder={t("codeSnippetText")}
            id="code"
            name="code"
          />
        </div>
        <button className="button" type="submit">
          {t("addSnippet")}
        </button>
      </form>
    </div>
  );
};
