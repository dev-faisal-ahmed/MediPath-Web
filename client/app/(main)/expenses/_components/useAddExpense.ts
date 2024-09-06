import { removeEmptyProperty } from '@/app/_helpers';
import { postRequestHelper } from '@/app/_helpers/apiHelper';
import { useAddExpenseMutation } from '@/app/_redux/services';
import { TAddExpensePayload } from '@/app/_utils/types';
import { FormEvent, useState } from 'react';
import { toast } from 'sonner';

type TAddExpenseForm = HTMLFormElement & {
  amount: { value: string };
  description: { value: string };
};

export const useAddExpense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const [addExpense, { isLoading }] = useAddExpenseMutation();

  const onDateChange = (date: Date | undefined) => {
    if (date) setDate(date);
  };

  const onAddExpense = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as TAddExpenseForm;
    const amount = Number(form.amount.value);
    const description = form.description.value;
    const payload = removeEmptyProperty({ amount, description, date });

    const id = toast.loading('Adding Expense...');

    postRequestHelper(async () => {
      const response = await addExpense(payload as TAddExpensePayload).unwrap();
      toast.success(response.message, { id });
      setIsOpen(false);
    }, id);
  };

  return {
    states: { isOpen, date, isLoading },
    handlers: { onDateChange, setIsOpen, onAddExpense },
  };
};
