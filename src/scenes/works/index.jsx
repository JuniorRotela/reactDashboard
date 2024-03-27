import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataTeam } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { getDatos } from "../../services/garden.services";
import { format } from 'date-fns';


const Work = () => {
const [data, setData] = useState([]);
console.log(data)

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "id_propietario", headerName: "ID_PRO" },

    {
      field: "owner_nombre",
      headerName: "NOMBRE",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "fumigacion",
      headerName: "Fumigacion",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "abono",
      headerName: "Abono",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "vestringias",
      headerName: "VESTRINGIAS",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "abono_universal",
      headerName: "A.UNIVERSAL",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "entrada",
      headerName: "ENTRADA",
      flex: 1,
      type: "number",
      headerAlign: "left",
      align: "left",
      valueFormatter: ({ value }) => format(new Date(value), "dd/MM/yyyy HH:mm:ss"),

    },
    {
      field: "salida",
      headerName: "SALIDA",
      flex: 1,
      headerAlign: "left",
      align: "left",
      type: "number",
      valueFormatter: ({ value }) => format(new Date(value), "dd/MM/yyyy HH:mm:ss"),
    },
    {
      field: "fecha",
      headerName: "FECHA",
      flex: 1,
      headerAlign: "left",
      align: "left",
      type: "number",
      valueFormatter: ({ value }) => format(new Date(value), "dd/MM/yyyy HH:mm:ss"),
    },
    // {
    //   field: "age",
    //   headerName: "Age",
    //   type: "number",
    //   headerAlign: "left",
    //   align: "left",
    // },
    // {
    //   field: "phone",
    //   headerName: "Phone Number",
    //   flex: 1,
    // },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   flex: 1,
    // },
    // {
    //   field: "accessLevel",
    //   headerName: "Access Level",
    //   flex: 1,
    //   renderCell: ({ row: { access } }) => {
    //     return (
    //       <Box
    //         width="60%"
    //         m="0 auto"
    //         p="5px"
    //         display="flex"
    //         justifyContent="center"
    //         backgroundColor={
    //           access === "admin"
    //             ? colors.greenAccent[600]
    //             : access === "manager"
    //             ? colors.greenAccent[700]
    //             : colors.greenAccent[700]
    //         }
    //         borderRadius="4px"
    //       >
    //         {access === "admin" && <AdminPanelSettingsOutlinedIcon />}
    //         {access === "manager" && <SecurityOutlinedIcon />}
    //         {access === "user" && <LockOpenOutlinedIcon />}
    //         <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
    //           {access}
    //         </Typography>
    //       </Box>
    //     );
    //   },
    // },
  ];



  useEffect(() => {
     const fetchData = async () =>{
      try {
        const datos = await getDatos();
        setData(datos);
        console.log(datos);
      } catch (error) {
        console.error('Error al obtener datos del backend:', error);
      }
    };

    fetchData();
  }, []);
  



  return (
    <Box m="20px">
      <Header title="Actividades" subtitle="Registro de Actividades" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[900],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[900],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <DataGrid checkboxSelection rows={data} columns={columns} />
      </Box>
    </Box>
  );
};

export default Work;
