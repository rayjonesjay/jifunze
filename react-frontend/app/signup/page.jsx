"use client"

import React from "react"
import { Alert } from 'antd';
import "./main.css"
import { createClient } from '@supabase/supabase-js'
import {supabase_anon_key, supabase_url} from "../const/constants";
import {useEffect, useState} from "react";
const supabase = createClient(supabase_url, supabase_anon_key)

function SignupPage() {
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        setSubmitError('')
        const formData = new FormData(event.currentTarget);
        const {data, error} = await supabase.auth.signUp({
            email: formData.get('email'),
            password: formData.get('password'),
        })

        if (error) {
            // error.
            console.log(error)
            setSubmitError(error.message)
            return
        }
        window.location.href = '/login'
    };

    return (
        <div className="signup-container">
            <div className="signup-header">
                <h1>Jifunze</h1>
                <p>Begin your learning journey</p>
            </div>

            {submitError === '' ? (
                ""
            ) : (
                <>
                    <Alert message={submitError} type="error" showIcon />
                    <div style={{padding: '20px'}}></div>
                </>

            )}

            <form className="signup-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input
                        type="text"
                        id="fullname"
                        name="fullname"
                        required=""
                        placeholder="John Doe"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        required=""
                        placeholder="johndoe123"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required=""
                        placeholder="john@example.com"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required=""
                        placeholder="••••••••"
                    />
                    <div id="password-error" className="error-message"/>
                </div>
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input
                        type="password"
                        id="confirm-password"
                        name="confirm-password"
                        required=""
                        placeholder="••••••••"
                    />
                    <div id="confirm-password-error" className="error-message"/>
                </div>
                <button type="submit" className="signup-btn">
                    Create Account
                </button>
            </form>
            <div className="login-link">
                <p>
                    Already have an account?{" "}
                    <a href="/login">Log in</a>
                </p>
            </div>
        </div>

    );
}

export default function App() {
    const [session, setSession] = useState(null)

    useEffect(() => {
        supabase.auth.getSession().then(({data: {session}}) => {
            setSession(session)
        })

        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return (<SignupPage/>)
    } else {
        window.location.href = '/dashboard'
    }
}
