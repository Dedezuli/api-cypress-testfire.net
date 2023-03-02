/// <reference types ='cypress'/>
import { faker } from '@faker-js/faker'
import loadToken from '../../support/Auth'
import userData from '../../fixtures/data.json'

let checkStatus

describe('Login Status', () => {
  let accessToken
  before(async () => {
    const response = await loadToken()
    accessToken = response.Authorization
  })

  it('User check session(login) of specific user => if = TRUE', () => {
    cy.api({
      method: 'GET',
      url: 'api/logins',
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }).then((response) => {
      checkStatus = response.body.loggedin
      if (checkStatus == 'true') {
        cy.log('It should be preset.')
      } else {
        cy.api({
          method: 'GET',
          url: 'api/logout',
          failOnStatusCode: false,
        })
      }
    })
  })

  it('User check session(logout) of specific user => if = FALSE', () => {
    cy.api({
      method: 'GET',
      url: 'api/login',
      failOnStatusCode: false,
      headers: {
        Authorization: 'Bearer ' + accessToken,
      },
    }).then((response) => {
      checkStatus = response.body.loggedin
      if (checkStatus != 'true') {
        cy.log('It should be preset.')
      } else {
        cy.api({
          method: 'GET',
          url: 'api/logout',
          failOnStatusCode: false,
        })
      }
    })
  })
})
