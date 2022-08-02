import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button'


function Logout(props) {
    const navigate = useNavigate();

    function HandelLogout() {
        axios.post(`http://localhost:5000/auth/logout`, {})
            .then((response) => {
                props.token()
            }).catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
        navigate('/');
    }

    return (
        <header className="App-header">
            <Button onClick={HandelLogout} href='/'>
                Logout
            </Button>
        </header>
    )
}
export default Logout;