// import Joi from 'joi'
import '../styles/InLogg.css'

function InLogg() {
return (
    <div>
        <h3>LOGG IN</h3>
        <label for=''></label>
        <input type='text' placeholder='Username'></input>

        <label for=''></label>
        <input type="text" placeholder='Password'></input>

        <button>Sign In</button>

        <p className='text-underline'>Forgotten password</p>
    </div>
)
}

export default InLogg