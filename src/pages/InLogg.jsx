import { useNavigate } from 'react-router-dom'
import Joi from 'joi'
import '../styles/InLogg.css'
import { useState } from 'react'



function InLogg() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [correct, setCorrect] = useState('')
    const [isvalid, setIsValid] = useState(null)
    const [passwordError, setPasswordError] = useState(false) 
    
    // const navigate = useNavigate()

    const schema = Joi.object({
        password: Joi.string().min(6).required,
    })

    const correctPassword = 'Mums'


    const handleSubmit = (e) => {
        e.preventDefault()

        const { error } = schema.validate({ password })



        if (error) {
        console.log('Valideringfel', error.details[0].message)
            setError('Fyll i lösenord korrekt')
            setIsValid(false)
            setCorrect('')


            if (password.length < 4) setPasswordError(true)

        } else if (password !== correctPassword)  {
            setError('')
            setCorrect('')
            setIsValid(false)

            setPasswordError(password !== correctPassword)
        } else {
            setError('')
            setCorrect('')

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

                <p className="error"> &nbsp; </p> 
            
                    <p>Ange ditt lösenord för att logga in</p>
                    <input className={
                    `input-box ${passwordError ? 
                    'input-success' : isvalid === false ? 
                    'input-error' : ''}`}

                    type="password" 
                    placeholder='Lösenord'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                <p> &nbsp; </p> 
                
                 <button className='ghost-button' onClick={handleSubmit} type='submit'>Logga In</button>
            </section>
        </div>
    </section>
    )
}

export default InLogg