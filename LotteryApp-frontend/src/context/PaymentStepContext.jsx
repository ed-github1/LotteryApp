import React, { createContext, useContext } from 'react';

const PaymentStepContext = React.createContext({
  step: 0,
  setStep: () => {},
});

export const usePaymentStep = () => useContext(PaymentStepContext);

export default PaymentStepContext;
