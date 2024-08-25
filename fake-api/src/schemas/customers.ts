import { faker } from '@faker-js/faker'
import { formatGenericPayload } from '../utils/format-generic-payload'
import { ICustomer } from '../../../src/http/customers/get-customers'
import { ICustomerById } from '../../../src/http/customers/get-customer-by-id'

export function createRandomCustomer(): ICustomer {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    name: faker.person.fullName(),
    totalDebt: faker.number.int({ min: 1, max: 10000 }),
  }
}

function createCustomerById(): ICustomerById {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    isActive: faker.datatype.boolean(),
    name: faker.person.fullName(),
    totalDebt: faker.number.int({ min: 1, max: 10000 }),
    score: faker.number.int({ min: 1, max: 1000 }),
    document: '999.999.999-99',
    phone: faker.phone.number(),
    phoneWhatsapp: faker.phone.number(),
    email: faker.internet.email(),
    businessAddress: 'Rua Manoel Mariano Ferreira, 123 - Biguaçu - SC',
    residentialAddress: 'Rua Manoel Mariano Ferreira, 123 - Biguaçu - SC',
    proofAddressFile: new Blob(),
    proofAddressFileUrl:
      'https://www.gov.br/servidor/pt-br/acesso-a-informacao/faq/sou-gov.br/comprovante-de-rendimentos/comprovantes-de-rendimentos-imagens/6-tela-b-5-1passo-downloadrendimentopdf.jpg/@@images/image',
    documentFile: new Blob(),
    documentFileUrl:
      'https://www.gov.br/servidor/pt-br/acesso-a-informacao/faq/sou-gov.br/comprovante-de-rendimentos/comprovantes-de-rendimentos-imagens/6-tela-b-5-1passo-downloadrendimentopdf.jpg/@@images/image',
  }
}

export function createCustomerWithDebt() {
  return {
    id: faker.number.int({ min: 1, max: 10000 }),
    name: faker.person.fullName(),
    totalDebt: faker.number.int({ min: 1, max: 10000 }),
    totalParcels: faker.number.int({ min: 1, max: 10000 }),
  }
}

const customersList = faker.helpers.multiple(createRandomCustomer, {
  count: 20,
})

export const customersWithDebtList = faker.helpers.multiple(
  createCustomerWithDebt,
  {
    count: 20,
  },
)

export const Customers = formatGenericPayload<ICustomer[]>({
  data: customersList,
})

export const Customer = createCustomerById()
