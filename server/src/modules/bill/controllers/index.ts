import { updateCommission } from './updateCommission';
import { generateBill } from './generateBill';
import { getAllBills } from './getAllBills';
import { getBillById } from './getBillById';
import { takeDue } from './takeDue';

export const billController = {
  generateBill,
  getAllBills,
  getBillById,
  takeDue,
  updateCommission,
};
