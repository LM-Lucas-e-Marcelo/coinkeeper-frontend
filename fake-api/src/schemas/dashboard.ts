import { faker } from '@faker-js/faker'
import { IMonthData } from '../../../src/http/dashboard/get-month-data'
import { ITotalData } from '../../../src/http/dashboard/get-total-data'

function createRandomDataDay() {
  return {
    day: '2024-09-01',
    value: faker.number.int({ min: 1, max: 1000 }),
  }
}

const dayList = faker.helpers.multiple(createRandomDataDay, {
  count: 10,
})

function createFakeData(): IMonthData {
  return {
    totalPeriod: faker.number.int({ min: 1, max: 1000 }),
    sold: {
      totalSold: faker.number.int({ min: 1, max: 1000 }),
      totalReceived: faker.number.int({ min: 1, max: 1000 }),
      totalReceivedDays: dayList,
    },
    expense: {
      totalExpense: faker.number.int({ min: 1, max: 1000 }),
      totalPaid: faker.number.int({ min: 1, max: 1000 }),
      totalCompanyExpense: faker.number.int({ min: 1, max: 1000 }),
      totalExpenseWithCompany: faker.number.int({ min: 1, max: 1000 }),
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
