// /* eslint-disable no-console */
// import {
//     TextField,
//     Button,
//     Typography,
//     Box,
//     Container,
//     Grid,
//     Paper,
// } from '@mui/material';
// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// import AuthContext from '../libs/api/AuthContext';

// function CreatePost() {
//     const navigate = useNavigate();

//     const user = useSelector(state => state.user.value);

//     const formik = useFormik({
//         initialValues: {
//             title: '',
//             body: '',
//             name: user.name,
//             userId: user.id,
//         },
//         validationSchema: Yup.object({
//             title: Yup.string()
//                 .max(60, '제목은 최대 60자까지 입력할 수 있습니다.')
//                 .required('제목을 입력하세요.')
//                 .trim(''),
//             body: Yup.string()
//                 .max(255, '내용은 최대 255자까지 입력할 수 있습니다.')
//                 .required('내용을 입력하세요.')
//                 .trim(''),
//         }),
//         // 클릭 시 빈값으로 보여지게 만들기.
//         onSubmit: values => {
//             AuthContext.post('/api/posts/write', values)
//                 .then(() => {
//                     navigate('/');
//                     // console.log(response.data);
//                 })
//                 .catch(() => {
//                     // console.log(err);
//                 });
//         },
//     });

//     // const { values, touched, errors, handleChange, handleSubmit } = formik;
//     const { touched, errors } = formik;

//     return (
//         // <Container component="main" onSubmit={formik.handleSubmit}>
//         // <CssBaseline />
//         <Paper
//             component={Container}
//             elevation={3}
//             onSubmit={formik.handleSubmit}
//             sx={{
//                 width: 650,
//                 height: 550,
//                 marginTop: 3,
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 '@media (max-width: 900px)': {
//                     boxShadow: 'none',
//                     height: 500,
//                     width: 'auto',
//                     marginTop: 0,
//                 },
//             }}
//         >
//             <Typography
//                 sx={{
//                     textAlign: 'center',
//                     paddingTop: 2,
//                     '@media (max-width: 900px)': {
//                         paddingTop: 2,
//                     },
//                 }}
//                 component="h1"
//                 variant="h5"
//                 // className={classes.typography}
//             >
//                 글작성
//             </Typography>
//             <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
//                 <TextField
//                     // label="제목"
//                     label={
//                         touched.title && Boolean(errors.title) === true
//                             ? touched.title && errors.title
//                             : '제목'
//                     }
//                     variant="outlined"
//                     fullWidth
//                     required
//                     autoFocus
//                     id="title"
//                     name="title"
//                     type="text"
//                     value={formik.values.title}
//                     error={touched.title && Boolean(errors.title)}
//                     // helperText={touched.title && errors.title}
//                     onChange={formik.handleChange}
//                 />
//                 <TextField
//                     // className={classes.field}
//                     // inputRef={listRef}
//                     // ref={listRef}
//                     // onClick={() => handlekeyboard()}
//                     // label="내용"
//                     label={
//                         touched.body && Boolean(errors.body) === true
//                             ? touched.body && errors.body
//                             : '내용'
//                     }
//                     variant="outlined"
//                     margin="normal"
//                     fullWidth
//                     multiline
//                     minRows={16}
//                     maxRows={12}
//                     id="body"
//                     name="body"
//                     type="text"
//                     value={formik.values.body}
//                     error={touched.body && Boolean(errors.body)}
//                     // helperText={touched.body && errors.body}
//                     onChange={formik.handleChange}
//                 />
//                 <Box value={formik.values.name} id="name" name="name" hidden>
//                     {user.name}
//                 </Box>
//                 <Grid container justifyContent="flex-end">
//                     <Grid item>
//                         <Button
//                             type="submit"
//                             color="primary"
//                             variant="contained"
//                             // className={classes.submit}
//                         >
//                             작성
//                         </Button>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </Paper>
//         // </Container>
//     );
// }

// export default CreatePost;
