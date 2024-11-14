"use server"

import { Contract, ContractStatus } from "@/types/contract"
import contractsData from "@/data/contracts.json"

export async function getContracts(params: {
  search?: string
  status?: ContractStatus | "all"
  userId?: string
  role?: "contractor" | "client"
}): Promise<Contract[]> {
  await new Promise(resolve => setTimeout(resolve, 500))

  let contracts = contractsData.contracts as Contract[]

  if (params.search) {
    const searchLower = params.search.toLowerCase()
    contracts = contracts.filter(
      contract =>
        contract.title.toLowerCase().includes(searchLower) ||
        contract.description.toLowerCase().includes(searchLower)
    )
  }

  if (params.status && params.status !== "all") {
    contracts = contracts.filter(contract => contract.status === params.status)
  }

  if (params.userId && params.role) {
    contracts = contracts.filter(contract =>
      contract.parties.some(
        party => party.id === params.userId && party.role === params.role
      )
    )
  }

  return contracts
}

export async function getContractById(id: string): Promise<Contract | null> {
  await new Promise(resolve => setTimeout(resolve, 500))
  const contract = contractsData.contracts.find(contract => contract.id === id)
  return contract || null
}

export async function updateContractStatus(
  id: string,
  status: ContractStatus
): Promise<Contract | null> {
  await new Promise(resolve => setTimeout(resolve, 500))
  const contractIndex = contractsData.contracts.findIndex(contract => contract.id === id)
  
  if (contractIndex === -1) return null

  const updatedContract = {
    ...contractsData.contracts[contractIndex],
    status
  }

  return updatedContract
}