import logo from '../../logo.svg'
import axios from "axios";

function Logout(props) {
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
    }

    return (
        <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <button onClick={HandelLogout}>
                Logout
            </button>
        </header>
    )
}

export default Logout;