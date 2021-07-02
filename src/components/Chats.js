import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../firebase';

import { useAuth } from '../contexts/AuthContext';

const Chats = () => {
    const [loading, setLoading] = useState(true);
    const history = useHistory();
    const { user } = useAuth();

    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
    }

    const getFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        return new File([data], "test.jpg", { type: 'image/jpeg' });
    }

    useEffect(() => {
        if(!user) {
            history.push('/');
            return;
        }

        axios.get(
            'https://api.chatengine.io/users/me/',
            { headers: { 
              "project-id": '771ead37-79ad-4e7a-8859-281da109c893',
              "user-name": user.email,
              "user-secret": user.uid
            }}
        )
    
        .then(() => setLoading(false))

        .catch(e => {
            let formdata = new FormData()
            formdata.append('email', user.email)
            formdata.append('username', user.email)
            formdata.append('secret', user.uid)

            getFile(user.photoURL)
            .then(avatar => {
                formdata.append('avatar', avatar, avatar.name)

            axios.post(
                'https://api.chatengine.io/users/',
                formdata,
                { headers: { "private-key": "770b582a-a539-41b0-b425-b0e1b7e2c562" }}
            )
            .then(() => setLoading(false))
            .catch(e => console.log('e', e.response))
        })
        })

    }, [])

    if(!user || loading) {
        return <div />
    }

    return (
        <div className="chats-page">
            <div className="nav-bar">
                <div className="logo-tab">Unichat</div>
                <div onClick={handleLogout} className="logout-tab">Logout</div>
            </div>
            <div>
                <ChatEngine 
                    height="calc(100vh - 66px)" 
                    projectID="771ead37-79ad-4e7a-8859-281da109c893"
                    userName={user.email}
                    userSecret={user.uid}
                />
            </div>
        </div>
    )
}

export default Chats;