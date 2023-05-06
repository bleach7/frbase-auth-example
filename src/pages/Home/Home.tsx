import { useTitle } from "react-use";
import { useAppDispatch, useAuth } from "../../hooks";
import { Button, Container } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../../store/slices/user.slice";

export const Home = () => {
  useTitle("Firebase Auth");

  const navigate = useNavigate();
  const { isAuth, email, token, id } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isAuth) {
      navigate("/sign-in");
    }
  }, [isAuth, navigate]);

  return (
    <main>
      <section>
        <Container>
          <div>
            <p>{id}</p>
            <p>{token}</p>
            <p>{email}</p>
          </div>
          <Button
            type="button"
            onClick={() => {
              dispatch(removeUser());
            }}
          >
            Logout
          </Button>
        </Container>
      </section>
    </main>
  );
};
