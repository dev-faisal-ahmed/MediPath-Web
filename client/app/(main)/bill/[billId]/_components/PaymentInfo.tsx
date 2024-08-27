type TProps = {
  price: number;
  discount?: number;
  paid: number;
};

export const PaymentInfo = ({ paid, price, discount }: TProps) => {
  return (
    <>
      <h3 className='mb-3 mt-8 text-base font-bold'>Payment Info</h3>
      <div className='mx-auto max-w-[320px] border-t border-neutral-300 p-2'>
        <div className='flex items-center justify-between gap-12'>
          <p>Total Cost</p>
          <p className='font-semibold'>{price}</p>
        </div>
        <div className='mt-1 flex items-center justify-between gap-12'>
          <p>Discount</p>
          <p className='font-semibold'>{discount}</p>
        </div>
        <div className='mt-1 flex items-center justify-between gap-12'>
          <p>Paid</p>
          <p className='font-semibold'>{paid}</p>
        </div>
        <div className='mt-1 flex items-center justify-between gap-12 border-t border-neutral-300'>
          <p>Due</p>
          <p className='font-semibold'>
            {price - paid - (discount ? discount : 0)}
          </p>
        </div>
      </div>
    </>
  );
};
