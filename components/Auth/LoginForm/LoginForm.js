import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import useAuth from "../../../hook/useAuth";
import { loginApi, resetPasswordApi } from "../../../api/user";

export default function LoginForm({ showRegisterForm, closeModal }) {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await loginApi(formData);
      if (response?.jwt) {
        toast.success("Logeado con éxito");
        login(response.jwt);
        closeModal();
      } else {
        toast.error("El usuario o la contraseña es incorrecta");
      }
      setLoading(false);
    },
  });

  const resetPassword = async () => {
    formik.setErrors({});
    const validateEmail = Yup.string().email().required(true);
    if (!validateEmail.isValidSync(formik.values.identifier)) {
      formik.setErrors({ identifier: true });
    } else {
      resetPasswordApi(formik.values.identifier);
    }
  };

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="identifier"
        type="text"
        placeholder="Correo electrónico"
        onChange={formik.handleChange}
        error={formik.errors.identifier}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button type="button" basic onClick={() => showRegisterForm()}>
          Registrase
        </Button>
        <div>
          <Button className="submit" type="submit" loading={loading}>
            Entrar
          </Button>
          <Button onClick={() => resetPassword()} type="button">
            Has olvidado la contraseña
          </Button>
        </div>
      </div>
    </Form>
  );
}

const initialValues = () => {
  return {
    identifier: "",
    password: "",
  };
};

const validationSchema = () => {
  return {
    identifier: Yup.string().email().required("El usuario es obligatorio"),
    password: Yup.string().required("La contraseña es Obligatoria"),
  };
};
