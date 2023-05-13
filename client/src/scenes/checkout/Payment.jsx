import { Box, Typography, TextField } from "@mui/material";

const Payment = ({ values, errors, touched, handleBlur, handleChange }) => {
  return (
    <Box m="30px 0">
      <Typography sx={{ mb: "15px" }} fontSize="18px" component="h1">
        Contact Info
      </Typography>
      <TextField
        fullWidth
        type="text"
        label="Email"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.email}
        name="email"
        error={!!touched.email && !!errors.email}
        helperText={touched.email && errors.email}
        sx={{ mb: "15px" }}
      />
      <TextField
        fullWidth
        type="text"
        label="Phone Number"
        onBlur={handleBlur}
        onChange={handleChange}
        value={values.phoneNumber}
        name="phoneNumber"
        error={!!touched.phoneNumber && !!errors.phoneNumber}
        helperText={touched.phoneNumber && errors.phoneNumber}
      />
    </Box>
  );
};

export default Payment;
