'use strict'

const { test, trait } = use('Test/Suite')('New Moons Fail')
trait("Test/ApiClient");

test('Float year 2020.2', async ({ client }) => {
  const response = await client.get('/month-phases/month/10/year/2020.2').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number' })
})

test('Float year 2010.54', async ({ client }) => {
  const response = await client.get('/month-phases/month/10/year/2010.54').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number' })
})

test('Float year 2040.345', async ({ client }) => {
  const response = await client.get('/month-phases/month/10/year/2040.345').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number' })
})

test('Float year 1988.256', async ({ client }) => {
  const response = await client.get('/month-phases/month/10/year/1988.256').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number' })
})

test('Character instead of integer abc', async ({ client }) => {
  const response = await client.get('/month-phases/month/10/year/abc').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number' })
})


test('Character instead of integer asd', async ({ client }) => {
  const response = await client.get('/month-phases/month/10/year/asd').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number' })
})


test('Character instead of integer qwerty', async ({ client }) => {
  const response = await client.get('/month-phases/month/10/year/qwerty').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number' })
})

test('Number and characters in string 20asd', async ({ client }) => {
  const response = await client.get('/month-phases/month/10/year/20asd').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number, not letters' })
})

test('Number and characters in string 198B', async ({ client }) => {
  const response = await client.get('/month-phases/month/10/year/198B').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number, not letters' })
})


test('Number and characters in string 196s', async ({ client }) => {
  const response = await client.get('/month-phases/month/10/year/196s').end()
  response.assertStatus(400).assertError({ message: 'The year param must be an integer number, not letters' })
})

// MONTH TESTS
test('Float month 1.0', async ({ client }) => {
  const response = await client.get('/month-phases/month/1.0/year/2020').end()
  response.assertStatus(400).assertError({ message: 'The month param must be an integer number, not letters' })
})

test('Float month 1.5', async ({ client }) => {
  const response = await client.get('/month-phases/month/1.5/year/2010').end()
  response.assertStatus(400).assertError({ message: 'The month param must be an integer number' })
})

test('Float month 0.2', async ({ client }) => {
  const response = await client.get('/month-phases/month/0.2/year/2040').end()
  response.assertStatus(400).assertError({ message: 'The month param must be an integer number' })
})

test('Float month 5.256', async ({ client }) => {
  const response = await client.get('/month-phases/month/5.256/year/1988').end()
  response.assertStatus(400).assertError({ message: 'The month param must be an integer number' })
})

test('Character instead of integer abc', async ({ client }) => {
  const response = await client.get('/month-phases/month/abc/year/2020').end()
  response.assertStatus(400).assertError({ message: 'The month param must be an integer number' })
})


test('Character instead of integer asd', async ({ client }) => {
  const response = await client.get('/month-phases/month/asd/year/2020').end()
  response.assertStatus(400).assertError({ message: 'The month param must be an integer number' })
})


test('Character instead of integer qwerty', async ({ client }) => {
  const response = await client.get('/month-phases/month/qwerty/year/2020').end()
  response.assertStatus(400).assertError({ message: 'The month param must be an integer number' })
})

test('Number and characters in string 1d', async ({ client }) => {
  const response = await client.get('/month-phases/month/1f/year/2020').end()
  response.assertStatus(400).assertError({ message: 'The month param must be an integer number, not letters' })
})

test('Number and characters in string 25s', async ({ client }) => {
  const response = await client.get('/month-phases/month/25s/year/2020').end()
  response.assertStatus(400).assertError({ message: 'The month number must be between 1 or 12' })
})


test('Number and characters in string 1s', async ({ client }) => {
  const response = await client.get('/month-phases/month/1s/year/2020').end()
  response.assertStatus(400).assertError({ message: 'The month param must be an integer number, not letters' })
})
