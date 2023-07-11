import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo"
import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

export default function SignInPage() {

  const navigate = useNavigate()
  const [login, setLogin] = useState({})
  const { setToken, setUserName } = useContext(UserContext)

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setLogin(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    signIn()
  }

  function signIn() {
    axios.post(`${import.meta.env.VITE_API_URL}/`, login)
      .then(res => {
        setToken(res.data.token)
        setUserName(res.data.userName)
        localStorage.setItem("token", res.data.token)
        localStorage.setItem("userName", res.data.userName)
        navigate("/home")
      })
      .catch(err => alert(err.response.data))
  }

  return (
    <SingInContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input data-test="email" required placeholder="E-mail" type="email" name="email" value={login.email || ""} onChange={handleChange} />
        <input data-test="password" required placeholder="Senha" type="password" autoComplete="new-password" name="password" value={login.password || ""} onChange={handleChange} />
        <button data-test="sign-in-submit" type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer>
  )
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
