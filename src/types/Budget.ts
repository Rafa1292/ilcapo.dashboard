
export interface Budget {
    id: number
    orangeGoal: number
    greenGoal: number
    blueGoal: number
    budgetMonth: number
    fixedExpense: number
    inventoryPercentage: number
    expectedProfit: number
    delete: boolean
    createdAt?: Date
    updatedAt?: Date
    createdBy?: number
    updatedBy?: number
  }