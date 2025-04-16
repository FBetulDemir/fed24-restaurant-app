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
    const [userNameError, setUserNameError] = useState(false)
    const [passwordError, setPasswordError] = useState(false) 
    
    // const navigate = useNavigate()

    const schema = Joi.object({
        userName: Joi.string().min(3).required,
        password: Joi.string().min(6).required,
    })

    const correctUsername = 'David'
    const correctPassword = 'Mums'


    const handleSubmit = (e) => {
        e.preventDefault()

        const { error } = schema.validate({ userName, password })



        if (error) {
        console.log('Valideringfel', error.details[0].message)
            setError('Fyll i användarnamn och lösenord korrekt')
            setIsValid(false)
            setCorrect('')


            if (userName.length < 3) setUserNameError(true)
            if (password.length < 4) setPasswordError(true)

        } else if (userName !== correctUsername || password !== correctPassword)  {
            setError('')
            setCorrect('')
            setIsValid(false)

            setUserNameError(userName !== correctUsername)
            setPasswordError(password !== correctPassword)
        } else {
            setError('')
            setCorrect('')

            setUserNameError(false)
            setPasswordError(false)

            setIsValid(true)
            navigate('/')
        }

    }       


    return (
        <section className='blurp'> 
        <div className='sign-section'>
            <h3>LOGG IN</h3>
            <section className='form'>
                
                
            {error && <p className='error'>{error}</p>}

                <input className={
                `input-box ${userNameError ? 
                'input-success' : isvalid === false ? 
                'input-error' : ''}`}

                type='text' 
                placeholder='Username'
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                />
                {correct && <p className='success'>{correct}</p>}

            <p className="error"> &nbsp; </p> 
        

                <input className={
                `input-box ${passwordError ? 
                'input-success' : isvalid === false ? 
                'input-error' : ''}`}

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