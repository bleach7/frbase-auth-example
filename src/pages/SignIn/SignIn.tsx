import { useTitle } from "react-use";
import { Button, Form, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ISignInSubmitData } from "./SignIn.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from "./SignIn.schema";
import { setUser } from "../../store/slices/user.slice";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { toast } from "react-toastify";
import { useAppDispatch } from "../../hooks";

export const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);

  useTitle("Sign In | Firebase Auth");

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = getAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignInSubmitData>({
    resolver: yupResolver(signInSchema),
  });

  const onSubmit = (data: ISignInSubmitData) => {
    setIsLoading(true);

    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        setIsLoading(false);

        const user = userCredential.user;

        dispatch(
          setUser({
            email: user.email,
            id: user.uid,
            token: user.accessToken,
          })
        );

        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);

        const errorMessage = error.message;

        toast.error(errorMessage);
      });
  };

  return (
    <main>
      <section>
        <div className="form-container">
          <div className="py-4">
            <h1 className="text-center">Sign In</h1>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  {...register("email")}
                />
                {errors.email && (
                  <Form.Text className="text-danger">
                    {errors.email.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  {...register("password")}
                />
                {errors.password && (
                  <Form.Text className="text-danger">
                    {errors.password.message}
                  </Form.Text>
                )}
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100 mb-3">
                {isLoading ? (
                  <Spinner animation="border" size="sm" variant="light" />
                ) : (
                  "Submit"
                )}
              </Button>
              <p className="text-center text-secondary">
                {"Don't have an account yet? "}
                <Link to="/sign-up">Register now</Link>
              </p>
            </Form>
          </div>
        </div>
      </section>
    </main>
  );
};
