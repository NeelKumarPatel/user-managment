import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // const previousURL = useSelector(selectPreviousURL);
  const navigate = useNavigate();

  const redirectUser = () => {
    // if (previousURL.includes("cart")) {
      return navigate("/cart");
    // }
    // navigate("/");
  };

  const loginUser = (e) => {
    e.preventDefault();
    setIsLoading(true);
  };

  // Login with Goooglr
  return (
    <>
     hello
    </>
  );
};

export default Home;
