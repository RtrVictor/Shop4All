import React, { useEffect } from 'react'
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addToShoppingCart } from '../actions/shoppingCartActions'

const ShoppingCartPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const quantity = location.search ? Number(location.search.split('=')[1]) : 1

  const shoppingCart = useSelector((state) => state.shoppingCart)
  const { shoppingCartProducts } = shoppingCart

  useEffect(() => {
    if (id) {
      dispatch(addToShoppingCart(id, quantity))
    }
  }, [dispatch, id, quantity])

  return <div>ShoppingCart</div>
}

export default ShoppingCartPage
