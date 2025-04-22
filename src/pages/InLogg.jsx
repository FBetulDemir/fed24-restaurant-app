import { useNavigate } from 'react-router-dom'
import Joi from 'joi'
import '../styles/InLogg.css'
import { useState, useEffect } from 'react'
import AdminStart from '../components/AdminStart'





function InLogg() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [correct, setCorrect] = useState('')
    const [isvalid, setIsValid] = useState(null)
    const [passwordError, setPasswordError] = useState(false) 
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    
    const navigate = useNavigate()

    const schema = Joi.object({
        password: Joi.string().min(4).required(),
    })

    const correctPassword = 'mums'


    const handleSubmit = (e) => {
        e.preventDefault()

        const { error: joierror} = schema.validate({ password })

        if (joierror) {
             console.log('Validationerors', joierror.details[0].message)
            setError('Minst 4 tecken')
            setIsValid(false)
            setIsLoggedIn(false)
            return
            }  
            
        if (password !== correctPassword)  {
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
        }
        // setError
        setIsValid(true)

        navigate('/components/admin')


    }
   


    return (
        <section className='blurp' > 
            <div className='sign-section' style={ isLoggedIn ? { display: 'none' } : { display: 'block' }}>
                <section className='form'>
                    {error && <p className='error'>{error}</p>}

                <p className="error"> </p> 
                    <p className='admin'>Admin</p>
                    {/* <p>Ange ditt lösenord för att logga in</p> */}
                    <input className={
                    `input-box ${isvalid === true ? 
                    'input-success' : isvalid === false ? 
                    'input-error' : ''}`}

                    type="password" 
                    placeholder='Lösenord'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                        handleSubmit(e)
                    }}
                     }
                    />
                <p> &nbsp; </p> 
                <form onSubmit={handleSubmit}>

                 <button className='ghost-button' type='submit'>Logga In</button>
                </form>
            </section>
        </div>

        </section>

    
    )
}

export default InLogg