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
                width: 600,
                height: 100,
                borderRadius: 2,
                bgcolor: '#EB0000',
                '&:hover': {
                    bgcolor: '#B80606'
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