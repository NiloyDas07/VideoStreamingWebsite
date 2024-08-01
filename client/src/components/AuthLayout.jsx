import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "./Container";

function AuthLayout({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const {
    isAuthenticated: authStatus,
    loading,
    appLoading,
  } = useSelector((state) => state.auth);

  useEffect(() => {
    {
      setLoader(true);
      // console.log(loader);

      if (!appLoading && !loading) {
        if (authentication && authStatus !== authentication) {
          navigate("/login");
          setLoader(false);
        } else if (!authentication && authStatus !== authentication) {
          navigate(-1);
        } else setLoader(false);
      }
    }
  }, [authStatus, authentication, navigate, loading, appLoading]);

  return loader || loading || appLoading ? (
    <Container className="py-4"> Loading... </Container>
  ) : (
    <>{children}</>
  );
}

export default AuthLayout;
