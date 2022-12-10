import * as React from "react";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div id="error-page">
      <h2>Ops!</h2>
      <p>A página que você acessou não foi encontrada.</p>
    </div>
  );
};

export default ErrorPage;
