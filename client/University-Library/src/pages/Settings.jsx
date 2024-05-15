import React, { useState, useContext } from 'react';
import './Settings.css';
import { createClient } from "@supabase/supabase-js"
import { useAuth } from "../../../AuthContext"

//SUPABASE CONNECTION DATA
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)
//SUPABASE CONNECTION DATA
function Settings() {
    const { user } = useAuth(); // Use the useAuth hook to access the current user
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    {/* Not finished! */}
    const handleSubmit = async (event) => {
        event.preventDefault();

        if (newPassword !== confirmPassword) {
            alert("New passwords do not match.");
            return;
        }

        if (!user) {
            alert("You must be logged in to update your password.");
            return;
        }
    };


    return (
        <div className="settings-container">
            <h3 className='h3temp'>Settings</h3>
            <div className='user-email'>
                <h3 className='h3temp'>Email: </h3>
                <p>{user?.user.email || "No email available"}</p> {/* no email, no problem */}
            </div>
            <form onSubmit={handleSubmit}>
                <div className='user-password'>
                    <h3 className='h3temp'>Old Password:</h3>
                    <input type="password2" value={oldPassword} onChange={e => setOldPassword(e.target.value)} />
                </div>
                <div className='user-password'>
                    <h3 className='h3temp'>New Password:</h3>
                    <input type="password2" value={newPassword} onChange={e => setNewPassword(e.target.value)} />
                </div>
                <div className='user-password'>
                    <h3 className='h3temp'>Confirm New Password:</h3>
                    <input type="password2" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="button">Update Password</button>
            </form>
        </div>
    );
}

export default Settings;
