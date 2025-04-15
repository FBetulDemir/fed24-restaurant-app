import { useNavigate } from 'react-router-dom'
import Joi from 'joi'
import '../styles/InLogg.css'
import { useState } from 'react'



function InLogg() {
    const [userName, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [correct, setCorrect] = useState('')
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

        if (error) {
            setError('Fyll i användarnamn och lösenord korrekt')
            setIsValid(false)
            setCorrect('')
        } else if (userName !== correctUsername || password !== correctPassword)  {
            setError('')
            setIsValid(false)
            setCorrect('Inloggad')
        } else {
            setError('')
            setCorrect('Inloggning lyckades')
            setIsValid(true)
            navigate('/employee')
        }

    }       


    return (
        <section className='blurp'> 
        <div className='sign-section'>
            <h3>LOGG IN</h3>
            <section className='form'>
                
                
            {error && <p className='error'>{error}</p>}

                <input className='input-box'
                type='text' 
                placeholder='Username'
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                />
            <p className="error"> &nbsp; </p> 
        

            <input className='input-box'
            type="password" 
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <p> &nbsp; </p> 

            
            </section>

            <button className='ghost-button' onClick={handleSubmit} type='submit'>Sign In</button>

            <p className='text-underline'>Forgotten password</p>
        </div>
    </section>
    )
}

export default InLogg