import styled from "styled-components"
import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../contexts/UserContext"

export default function TransactionsPage() {

  const [transaction, setTransaction] = useState({})
  const { tipo } = useParams()
  const transactionInfo = { ...transaction, type: getType() }
  const { token } = useContext(UserContext)
  const navigate = useNavigate()

  function getType() {
    if (tipo === "entrada") return 'entrada'
    else return "saida"
  }

  const handleChange = (event) => {
    const name = event.target.name
    const value = event.target.value
    setTransaction(values => ({ ...values, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    newTransaction()
    console.log(transactionInfo)
    console.log(token)
  }

  function newTransaction() {
    axios.post(`${import.meta.env.VITE_API_URL}/nova-transacao`, transactionInfo, { headers: { authorization: `Bearer ${token}` } })
      .then(res => navigate("/home"))
      .catch(err => alert(err.response.data))
  }

  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={handleSubmit}>
        <input data-test="registry-amount-input" required placeholder="Valor" type="number" name="value" value={transaction.value || ""} onChange={handleChange} />
        <input data-test="registry-name-input" required placeholder="Descrição" type="text" name="description" value={transaction.description || ""} onChange={handleChange} />
        <button data-test="registry-save" type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
