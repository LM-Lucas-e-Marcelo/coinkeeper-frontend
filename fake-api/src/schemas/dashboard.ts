import { faker } from '@faker-js/faker'
import { IMonthData } from '../../../src/http/dashboard/get-month-data'
import { ITotalData } from '../../../src/http/dashboard/get-total-data'

function createFakeData(): IMonthData {
  return {
    sold: {
      totalSold: faker.number.int({ min: 1, max: 1000 }),
      totalReceived: faker.number.int({ min: 1, max: 1000 }),
    },
    expense: {
      totalExpense: faker.number.int({ min: 1, max: 1000 }),
      totalPaid: faker.number.int({ min: 1, max: 1000 }),
      companyExpenses: faker.number.int({ min: 1, max: 1000 }),
    },
  }
}

function createTotalData(): ITotalData {
  return {
    totalExpense: faker.number.int({ min: 1, max: 1000 }),
    totalReceive: faker.number.int({ min: 1, max: 1000 }),
  }
}

export const TotalData = createTotalData()

export const MonthData = createFakeData()
