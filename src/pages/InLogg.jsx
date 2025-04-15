import { useNavigate } from 'react-router-dom'
import Joi from 'joi'
import '../styles/InLogg.css'
import { useState } from 'react'



function InLogg() {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isvalid, setIsValid] = useState(null)
    // const navigate = useNavigate()

    const schema = Joi.object({
        userName: Joi.string().min(3).required,
        password: Joi.string().min(6).required,
    })

    const correctUsername = 'David'
    const correctPassword = 'Mums'

    const handleSubmit = (e) => {
        console.log('Sign in')
        e.preventDefault()

        const { error } = schema.validate({ userName, password })
        // const { isvalid } = schema.validate({ userName, password })

        if (error) {
            setError('Fyll i användarnamn och lösenord korrekt')
            setIsValid(false)
        } else if (userName !== correctUsername || password !== correctPassword)  {
            setError('Fel användarnamn eller lösenord')
            setIsValid(false)
        } else {
            setError('')
            setIsValid(true)
            navigate('/')
        }
    }


    return (
        <div className='sign-section'>
            <h3>LOGG IN</h3>
            <section className='form'>
                
            {error && <p className='error'>{error}</p>}

                <input 
                type='text' 
                placeholder='Username'
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                />
            <p className="error"> &nbsp; </p> 


            <input 
            type="password" 
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <p> &nbsp; </p> 

            
            </section>

            <button onClick={handleSubmit} type='submit'>Sign In</button>

            <p className='text-underline'>Forgotten password</p>
        </div>
    )
}

export default InLogg