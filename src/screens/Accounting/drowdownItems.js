import { v4 } from "uuid";

export const drodownValues = {
  currency: [
			{ id: `${v4()}`, value: "EUR", label: "Euro €" },
			{ id: `${v4()}`, value: "USD", label: "USD $" },
			{ id: `${v4()}`, value: "CNY", label: "CNY ¥" },			
			{ id: `${v4()}`, value: "GBP", label: "GBP £" },
			{ id: `${v4()}`, value: "JPY", label: "JPY ¥" },			
			{ id: `${v4()}`, value: "INR", label: "INR ₹" },			
			{ id: `${v4()}`, value: "CAD", label: "CAD $" },
			{ id: `${v4()}`, value: "AUD", label: "AUD $" },						
			{ id: `${v4()}`, value: "ZAR", label: "ZAR" },			
			{ id: `${v4()}`, value: "CHF", label: "CHF" },
			{ id: `${v4()}`, value: "KRW", label: "KRW ₩" },			
			{ id: `${v4()}`, value: "RUB", label: "RUB руб" },						
			{ id: `${v4()}`, value: "BRL", label: "BRL R$" },			
			{ id: `${v4()}`, value: "SAR", label: "SAR ﷼" },						
			{ id: `${v4()}`, value: "MXN", label: "MXN $" },						
			{ id: `${v4()}`, value: "HKD", label: "HKD $" },
			{ id: `${v4()}`, value: "SGD", label: "SGD $" },						
			{ id: `${v4()}`, value: "ILS", label: "ILS ₪" },			
			{ id: `${v4()}`, value: "QAR", label: "QAR ﷼" },
			{ id: `${v4()}`, value: "TRY", label: "TRY ₺" },			
			{ id: `${v4()}`, value: "VND", label: "VND ₫" },	
  ],
  status: [
			{ id: `${v4()}`, value: "active", label: "Active" },
			{ id: `${v4()}`, value: "pending", label: "Pending" },
			{ id: `${v4()}`, value: "new", label: "New" },
			{ id: `${v4()}`, value: "paid", label: "Paid" },		
			{ id: `${v4()}`, value: "overdue", label: "Overdue" },
			{ id: `${v4()}`, value: "canceled", label: "Canceled" },
			{ id: `${v4()}`, value: "refund", label: "Refund" },  
  ],
  
};
