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
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    
    // const navigate = useNavigate()

    const schema = Joi.object({
        password: Joi.string().min(4).required(),
    })

    const correctPassword = 'Mums';


    const handleSubmit = (e) => {
        e.preventDefault()

        const { error: joierror} = schema.validate({ password })
        if (joierror) {
        console.log('Valideringfel', error.details[0].message)
            setError('Minst 4 tecken')
            setIsValid(false)
            setCorrect('')
            setIsLoggedIn(false)
            return

            // if (password.length < 4) setPasswordCorrect('true')


        } else if (password !== correctPassword)  {
            setError('Fel lösenord')
            setIsValid(false)
            setIsLoggedIn(false)
            return
            
        } else {
            setError('')
            setCorrect('')

            setPasswordError(false)
            setIsValid(true)
            setIsLoggedIn(true)
            window.location.href = '/employee'
        }

        setError
        setIsValid(true)

        setTimeout(() => { 
            window.location.href = '/employee'
        }, 1000000000) 
        

    }       


    return (
        <section className='blurp'> 
        <div className='sign-section'>
            <h3>LOGG IN</h3>
            <section className='form'>
                {error && <p className='error'>{error}</p>}

                <p className="error"> </p> 
            
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

                {isLoggedIn && (
                    <section className="employee-section">
                        <h2>Välkommen till Employee-sidan</h2>
                        <p>Här kan du se intern information eller gå vidare till andra funktioner.</p>
                    </section>
            )}

    </section>

    
    )
}

export default InLogg