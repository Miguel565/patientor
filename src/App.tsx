import { Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import PatientListPage from "./components/PatientListPage";
import DetailPatient from "./components/infoDetail/DetailPatient";

const App = () => {
  
  return (
    <div className="App">
        <Container>
          <Typography variant="h1" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients/:id" element={<DetailPatient />} />
          </Routes>
        </Container>
    </div>
  );
};

export default App;
