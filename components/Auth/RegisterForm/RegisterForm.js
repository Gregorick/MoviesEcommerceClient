import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerApi } from "../../../api/user";
import { toast } from "react-toastify";

const Registerform = ({ showLoginForm }) => {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: Yup.object(validationSchema()),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await registerApi(formData);
      if (response?.jwt) {
        console.log(response);
        toast.success("El usuario se ha cerrado correctamente");
        showLoginForm();
      } else {
        toast.error("El nombre de usuario es incorrecto, intente de nuevo");
      }
      setLoading(false);
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        type="text"
        name="name"
        placeholder="Nombre"
        onChange={formik.handleChange}
        error={formik.errors.name}
      />
      <Form.Input
        type="text"
        name="lastname"
        placeholder="Apellido"
        onChange={formik.handleChange}
        error={formik.errors.lastname}
      />
      <Form.Input
        type="text"
        name="email"
        placeholder="Correo electrónico"
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <Form.Input
        type="text"
        name="username"
        placeholder="Usuario"
        onChange={formik.handleChange}
        error={formik.errors.username}
      />
      <Form.Input
        type="password"
        name="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        error={formik.errors.password}
      />
      <div className="actions">
        <Button onClick={() => showLoginForm()} basic>
          Iniciar Sesión
        </Button>
        <Button className="submit" type="submit" loading={loading}>
          Registrarse
        </Button>
      </div>
    </Form>
  );
};

const initialValues = () => {
  return {
    name: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  };
};

const validationSchema = () => {
  return {
    name: Yup.string().required(true),
    lastname: Yup.string().required("El apellido es obligatorio"),
    email: Yup.string().email().required(true),
    username: Yup.string().required("El usuario es obligatorio"),
    password: Yup.string().required(true),
  };
};

export default Registerform;
