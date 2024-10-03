import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";


function FinancialCalculator({ carDetail }) {

    const[carPrice,setCarPrice]=useState(0)
    const[interestRate,setInterestRate]=useState(0)
    const[loanTerm,setLoanTerm]=useState(0)
    const[downPayment,setDownPayment]=useState(0)
    const [monthlyPayment,setMonthlyPayment]=useState(0)

    const CalculateMonthlyPayment=()=>{
        const principal=carPrice-downPayment
        const monthyInterestRate=interestRate/1200
        const monthlyPayment=(principal*monthyInterestRate*Math.pow(1+monthyInterestRate,loanTerm))/(Math.pow(1+monthyInterestRate,loanTerm-1))

        const roundMonthlyPayment= Math.round(monthlyPayment)
        setMonthlyPayment(roundMonthlyPayment)
    }

  return (
    <div className="p-10 border rounded-xl shadow-md mt-7">
      <h2 className="font-medium text-2xl">Financial Calculator</h2>
      <div className="flex gap-5 mt-5">
        <div className="w-full">
          <label htmlFor="">Price $</label>
          <Input type="number" onChange={(e)=>setCarPrice(e.target.value)} />
        </div>
        <div className="w-full">
          <label htmlFor="">Interest Rate %</label>
          <Input type="number" onChange={(e)=>setInterestRate(e.target.value)} />
        </div>
      </div>

      <div className="flex gap-5 mt-5">
        <div className="w-full">
          <label htmlFor="">Loan Term (in Months)</label>
          <Input type="number" onChange={(e)=>setLoanTerm(e.target.value)} />
        </div>
        <div className="w-full">
          <label htmlFor="">Down Payment</label>
          <Input type="number" onChange={(e)=>setDownPayment(e.target.value)}/>
        </div>
      </div>
       {monthlyPayment>0 && <h2 className="font-bold text-2xl">  Your Monthly Payment is :  <span className="text-3xl">$ {monthlyPayment} / <span className="text-sm"> Month</span></span> </h2>}
      <Button className="w-full mt-5" size="lg" onClick={CalculateMonthlyPayment}>
        Calculate
      </Button>
    </div>
  );
}

export default FinancialCalculator;
