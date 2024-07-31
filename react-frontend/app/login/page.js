"use client"

import React from "react"
import "./main.css"
import { createClient } from '@supabase/supabase-js'
import {supabase_anon_key, supabase_url} from "../const/constants";
import {useEffect, useState} from "react";
import {Alert} from "antd";
const supabase = createClient(supabase_url, supabase_anon_key)

function Login() {
    const [submitError, setSubmitError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const {data, error} = await supabase.auth.signInWithPassword({
            email: formData.get('email'),
            password: formData.get('password'),
        })
        if (error) {
            // error.
            console.log(error)
            setSubmitError(error.message)
        }
    };

    return (
        <div className="login-container">
            <div className="login-header">
                <h1>Jifunze</h1>
                <p>Welcome back, learner!</p>
            </div>

            {submitError === '' ? (
                ""
            ) : (
                <>
                    <Alert message={submitError} type="error" showIcon />
                    <div style={{padding: '12px'}}></div>
                </>

            )}

            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Username or Email</label>
                    <input
                        type="text"
                        id="email"
                        name="email"
                        required=""
                        placeholder="johndoe or john@example.com"
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
                </div>
                <div className="forgot-password">
                    <a href="/forgot-password">
                        Forgot password?
                    </a>
                </div>
                <div id="login-error" className="error-message"/>
                <button type="submit" className="login-btn">
                    Log In
                </button>
            </form>
            <div className="signup-link">
                <p>
                    Don't have an account?{" "}
                    <a href="/signup">Sign up</a>
                </p>
            </div>
        </div>
    )
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
        return (<Login/>)
    } else {
        window.location.href = '/dashboard'
    }
}
