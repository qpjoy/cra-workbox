import React, { useState, useMemo, useContext, useEffect, FC } from "react";
import { useIntl, injectIntl } from "react-intl";
import { CommonContext } from "@/states/common";

const Login = () => {
  const intl = useIntl();
  const { locale, commonDispatch } = useContext(CommonContext);
  console.log(intl, " - - - - - - this is login intl");

  function changeLocale() {
    let _locale = locale === "zh" ? "en" : "zh";
    commonDispatch({
      type: "LOCALE",
      payload: {
        locale: _locale,
      },
    });
  }

  return (
    <>
      <button onClick={changeLocale}>改成中文</button>
      <div>{intl.messages["landing.login.email"]}</div>;
    </>
  );
};

export default Login;
