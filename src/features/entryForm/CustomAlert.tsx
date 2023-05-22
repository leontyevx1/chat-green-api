import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

export default function CustomAlert({type, text,}: {
    type?: string;
    text?: string;
}) {
    let errorMessage = text;

    if (type) {
        switch (type) {
            case 'required':
                errorMessage = 'Поле не заполнено';
                break;
            case 'pattern':
                errorMessage = 'Неверные данные';
                break;
            case 'unauthorized':
                errorMessage = 'Инстанс не авторизован';
                break;
            case 'unregisteredRecipientNumber':
                errorMessage = 'Номер не зарегистрирован';
                break;
            default:
                errorMessage = 'Неизвестная ошибка';
                break;
        }
    }

    return (
        <Grid item xs={12}>
            <Alert role="alert" severity="warning">
                {errorMessage}
            </Alert>
        </Grid>
    );
}
