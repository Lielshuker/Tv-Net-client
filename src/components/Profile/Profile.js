import { useState } from 'react'
import axios from "axios";
import Logout from '../Logout/Logout'
import useToken from '../App/useToken';

function Profile(props) {

    const [profileData, setProfileData] = useState(null)
    const { removeToken } = useToken();


    function getProfileData(prop) {
        axios.post(`http://localhost:5000/auth/profile`, { headers: { Authorization: 'Bearer ' + prop.token } })
            .then((response) => {
                const res = response.data
                res.access_token && props.setToken(res.access_token)
                setProfileData(({
                    profile_name: res.name,
                    about_me: res.about
                }))
            })
            .catch((error) => {
                if (error.response) {
                    console.log(error.response)
                    console.log(error.response.status)
                    console.log(error.response.headers)
                }
            })
    }


    return (
        <div className="Profile">

            <p>To get your profile details: </p><button onClick={getProfileData}>Click me</button>
            {profileData && <div>
                <p>Profile name: {profileData.profile_name}</p>
                <p>About me: {profileData.about_me}</p>
            </div>
            }
            <Logout token={removeToken} />



        </div>
    );
}

export default Profile;