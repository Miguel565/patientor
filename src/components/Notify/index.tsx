import { Box, Container, Typography, Icon } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

interface Props {
    message: string | undefined;
    setMessage: (value: string) => void;
}

const Notify = ({ message, setMessage }: Props) => {

    setTimeout(() => {
        setMessage('');
    }, 4000);
    return (
        <Container>
            <Box sx={{
                width: 400,
                height: 80,
                borderRadius: 2,
                bgcolor: '#ee7272',
                '&:hover': {
                    bgcolor: '#9d1c1c'
                }
            }} >
                <Typography>
                    <Icon component={ErrorOutlineIcon} /> {message}
                </Typography>
            </Box>
        </Container>
    )
};

export default Notify;