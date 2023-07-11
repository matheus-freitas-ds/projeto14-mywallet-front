import { Link } from "react-router-dom"
import styled from "styled-components"
import axios from "axios"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState, useNavigate } from "react"

export default function SignUpPage() {

  const [cadastro, setCadastro] = useState({})

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setCadastro(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (cadastro.password !== cadastro.confirmPassword) return alert("confirme sua senha")

    delete cadastro.confirmPassword
    signUp()
  }

  function signUp() {
    axios.post(`${import.meta.env.VITE_API_URL}/cadastro`, cadastro)
      .then(res => useNavigate("/"))
      .catch(err => alert(err.response.data))
  }
  
  return (
    <SingUpContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input data-test="name" required placeholder="Nome" type="text" name="name" value={cadastro.name || ""} onChange={handleChange} />
        <input data-test="email" required placeholder="E-mail" type="email" name="email" value={cadastro.email || ""} onChange={handleChange} />
        <input data-test="password" required minLength={3} placeholder="Senha" type="password" autoComplete="new-password" name="password" value={cadastro.password || ""} onChange={handleChange} />
        <input data-test="conf-password" required placeholder="Confirme a senha" type="password" autoComplete="new-password" name="confirmPassword" value={cadastro.confirmPassword || ""} onChange={handleChange} />
        <button data-test="sign-up-submit" type="submit">Cadastrar</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
