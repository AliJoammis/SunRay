import { useNavigate } from 'react-router-dom'


export const RouterErrorElement = () => {
    const navigate = useNavigate()
    const handleNavigate = () => {
        navigate('/');
    }

    return <>
    <h1 style={{color:'red'}}>Error404: page not found!</h1>
    <h3>Please try again later</h3>
    <button onClick={handleNavigate}>Back to The Main Page</button>
    </>
}