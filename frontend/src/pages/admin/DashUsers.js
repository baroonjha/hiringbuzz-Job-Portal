import React, { useEffect } from 'react'
import { Box, Button, /*IconButton */ Paper, Typography } from '@mui/material'
import { DataGrid, gridClasses, GridToolbar } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { allUserAction } from '../../redux/actions/userAction';
import LoadingBox from '../../component/LoadingBox'
import axios from 'axios';
import {toast} from 'react-toastify'

const DashUsers = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(allUserAction());
        //eslint-disable-next-line
    }, []);


    const { users, loading } = useSelector(state => state.allUsers);
    let data = [];
    data = (users !== undefined && users.length > 0) ? users : []

    const deleteUserById = async (e, id) => {

        try {
            
            await axios.delete(`/api/admin/user/delete/${id}`); // Replace with your actual API endpoint
        
            // Perform any necessary actions after successful deletion, like updating the UI
            // console.log('User deleted successfully');
            toast.success("User deleted successfully",{autoClose: 1500})
            window.location.reload()
          } catch (error) {
            // Handle error
            console.error('Error deleting user:', error);
          }
    }
const handleCreateUser = () => {
    toast.error("User Cannot be created! Server error",{autoClose: 2000})
}
    const columns = [

        {
            field: '_id',
            headerName: 'User ID',
            width: 150,
            editable: true,
        },

        {
            field: 'email',
            headerName: 'E_mail',
            width: 150,
        },

        {
            field: 'role',
            headerName: 'User status',
            width: 150,
            renderCell: (params) => (
                params.row.role === 1 ? "Admin" : "Regular user"
            )
        },

        {

            field: 'createdAt',
            headerName: 'Creation date',
            width: 150,
            renderCell: (params) => (
                moment(params.row.createdAt).format('YYYY-MM-DD HH:MM:SS')
            )
        },

        {
            field: "Actions",
            width: 200,
            renderCell: (values) => (
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "170px" }}>
                    <Button variant="contained"><Link style={{ color: "white", textDecoration: "none" }} to={`/admin/edit/user/${values.row._id}`}>Edit</Link></ Button>
                    < Button onClick={(e) => deleteUserById(e, values.row._id)} variant="contained" color="error">Delete</ Button>
                </Box>
            )
        }
    ];

    return (
        
        loading ? <LoadingBox/> :
            <Box >

                <Typography variant="h4" sx={{ color: "white", pb: 3 }}>
                    All users
                </Typography>
                <Box sx={{ pb: 2, display: "flex", justifyContent: "right" }}>
                <Button onClick={handleCreateUser} variant="contained" color="success" startIcon={<AddIcon />}>Create User</ Button>

                    {/* <Button variant='contained' color="success" startIcon={<AddIcon />}> Create user</Button> */}
                </Box>
                <Paper sx={{ bgcolor: "secondary.midNightBlue" }} >

                    <Box sx={{ height: 400, width: '100%' }}>
                        <DataGrid
                            sx={{

                                '& .MuiTablePagination-displayedRows': {
                                    color: 'white',
                                },
                                color: 'white',
                                [`& .${gridClasses.row}`]: {
                                    bgcolor: (theme) =>
                                        // theme.palette.mode === 'light' ? grey[200] : grey[900],
                                        theme.palette.secondary.main
                                },
                                button: {
                                    color: '#ffffff'
                                }

                            }}
                            getRowId={(row) => row._id}
                            rows={data}
                            columns={columns}
                            pageSize={3}
                            rowsPerPageOptions={[3]}
                            checkboxSelection
                            slots={{ toolbar: GridToolbar }}
                        />
                    </Box>
                </Paper>

            </Box>
        
    )
}

export default DashUsers