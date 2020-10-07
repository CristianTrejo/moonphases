'use strict'

const { test, trait } = use('Test/Suite')('New Moons Fail')
trait("Test/ApiClient");

test('Float year 2020.2', async ({ client }) => {
  const response = await client.get('/full-moons/2020.2').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number' })
})

test('Float year 2010.54', async ({ client }) => {
  const response = await client.get('/full-moons/2010.54').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number' })
})

test('Float year 2040.345', async ({ client }) => {
  const response = await client.get('/full-moons/2040.345').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number' })
})

test('Float year 1988.256', async ({ client }) => {
  const response = await client.get('/full-moons/1988.256').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number' })
})

test('Character instead of integer abc', async ({ client }) => {
  const response = await client.get('/full-moons/abc').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number' })
})


test('Character instead of integer asd', async ({ client }) => {
  const response = await client.get('/full-moons/asd').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number' })
})


test('Character instead of integer qwerty', async ({ client }) => {
  const response = await client.get('/full-moons/qwerty').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number' })
})

test('Number and characters in string 20asd', async ({ client }) => {
  const response = await client.get('/full-moons/20asd').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number, not letters' })
})

test('Number and characters in string 198B', async ({ client }) => {
  const response = await client.get('/full-moons/198B').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number, not letters' })
})


test('Number and characters in string 196s', async ({ client }) => {
  const response = await client.get('/full-moons/196s').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number, not letters' })
})
