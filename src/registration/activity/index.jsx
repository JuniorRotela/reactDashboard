import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState} from "react";
import dayjs from "dayjs";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { tokens } from "../../theme";
import { useTheme } from "@emotion/react";
import { PostDatos } from "../../services/garden.services";
import LoadingSpinner from "../../loadingSpinner";
import ModalSucces from "../../modal/modalSucces";
import ModalCharge from "../../modal/modalCharge";
import ModalError from "../../modal/modalError";

const Activity = () => {
  const [entrada, setEntrada] = useState(null);
  const [salida, setSalida] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);
  const [error, setError] = useState("");

  const theme = useTheme();
  // const colors = tokens(theme.palette.mode);

  const isNonMobile = useMediaQuery("(min-width:600px)");

  const dateToEpochTimestamp = (dateString) => {
    return dayjs(dateString).unix();
  };

  const handleFormSubmit = async (values) => {
    setIsLoading(true);

    let entradaEpochTimestamp = dateToEpochTimestamp(entrada);
    let salidaEpochTimestamp = dateToEpochTimestamp(salida);

    if (entrada === null) {
      entradaEpochTimestamp = undefined;
    }
    if (salida === null) {
      salidaEpochTimestamp = undefined;
    }

    const { nombre, ...valuesWithoutNombre } = values;

    const valuesToSend = {
      ...valuesWithoutNombre,
      entrada: entradaEpochTimestamp,
      salida: salidaEpochTimestamp,
    };
    PostData(valuesToSend);
  };

  const PostData = async (valuesToSend) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const response = await PostDatos(valuesToSend);
      const responseData = await response;
      console.log("server response", responseData);
      setIsLoading(false);
      setRegistrationSuccess(true);
    } catch (error) {
      console.error("error sending data", error);
      setIsLoading(false);
      setRegistrationError(true);
      setError(error.message);
    }
  };

  const handleCloseModal = () => {
    setRegistrationSuccess(false);
  };

  const handleCloseModalError = () => {
    setRegistrationError(false);
  };

  return (
    <Box m="20px">
      <Header
        title="REGISTRO DE TRABAJOS"
        subtitle="Registro de Trabajos Realizados"
      />

      {/* Mostrar el spinner de carga si isLoading es true */}
      {isLoading && <LoadingSpinner />}
      {registrationSuccess && <ModalSucces />}
      {registrationError && <ModalError />}

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Id_Propietario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.id_Propietario}
                name="id_propietario"
                error={!!touched.id_propietario && !!errors.id_propietario}
                helperText={touched.id_propietario && errors.id_propietario}
                sx={{ gridColumn: "span 0" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Nombre"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.Nombre}
                name="nombre"
                error={!!touched.nombre && !!errors.nombre}
                helperText={touched.nombre && errors.nombre}
                sx={{ gridColumn: "span 3" }}
              />

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Abono"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.abono}
                name="abono"
                error={!!touched.abono && !!errors.abono}
                helperText={touched.abono && errors.abono}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Vestringias"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.vestringias}
                name="vestringias"
                error={!!touched.vestringias && !!errors.vestringias}
                helperText={touched.vestringias && errors.vestringias}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Abono Universal"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.abono_universal}
                name="abono_universal"
                error={!!touched.abono_universal && !!errors.abono_universal}
                helperText={touched.abono_universal && errors.abono_universal}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Fumigacion"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fumigacion}
                name="fumigacion"
                error={!!touched.fumigacion && !!errors.fumigacion}
                helperText={touched.fumigacion && errors.fumigacion}
                sx={{ gridColumn: "span 2" }}
              />

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Stack spacing={2} sx={{ minWidth: "210%" }}>
                  <DateTimePicker
                    label={"Entrada"}
                    // sx={{backgroundColor:"#293040 !important"}}
                    value={entrada}
                    name="entrada"
                    onChange={setEntrada}
                    referenceDate={dayjs("2022-04-17T15:30")}
                    error={!!touched.salida && !!errors.salida}
                    helperText={touched.salida && errors.salida}
                  />
                </Stack>
              </LocalizationProvider>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <ThemeProvider theme={theme}>
                  <Stack
                    spacing={2}
                    sx={{ minWidth: "210%", marginLeft: "110%" }}
                  >
                    <DateTimePicker
                      label={"Salida"}
                      // sx={{backgroundColor:"#293040 !important"}}
                      value={salida}
                      name="salida"
                      onChange={setSalida}
                      referenceDate={dayjs("2022-04-17T15:30")}
                      error={!!touched.salida && !!errors.salida}
                      helperText={touched.salida && errors.salida}
                    />
                  </Stack>
                </ThemeProvider>
              </LocalizationProvider>
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Registrar
              </Button>
            </Box>
          </form>
        )}
      </Formik>

      {/* Modal con spinner de carga */}
      <ModalCharge isLoading={isLoading} />
      {/* Modal con mensaje de registro exitoso */}
      <ModalSucces open={registrationSuccess} onClose={handleCloseModal} />
      {/* Modal con mensaje de registro con error */}
      <ModalError
        open={registrationError}
        onClose={handleCloseModalError}
        error={error}
      />
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  id_propietario: yup.string().required("required"),
  abono: yup.string().required("required"),
  fumigacion: yup.string().required("required"),
  vestringias: yup.string().required("required"),
  abono_universal: yup.string().required("required"),
});

const initialValues = {
  id_propietario: "",
  abono: "",
  fumigacion: "",
  vestringias: "",
  abono_universal: "",
  entrada: null,
  salida: null,
};

export default Activity;
