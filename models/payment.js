const mongoose = require('mongoose');

// method = [UPI, GPAY, net banking, COD]
const PaymentSchema = mongoose.Schema({
    id : { type : String },
    reference_id : { type : String },
    receipt_id : { type : String },
    method : String,
    customer_id : { type : String },
    order_id : { type : String },
    status : String,
    price : { type : Number }
}, {timestamps : true})

const Payment = mongoose.model('payment', PaymentSchema);

module.exports = {
    Payment
}


// 'id' should be generated with prefix 'PA'
// a new Payment is created when a customer starts a payment process.
// 'customer_id' is the id of the customer who is paying.
// 'order_id' is the id of the Order against which the payment is being done.

// 'reference_id' => is the payment/reference/transaction id provided by third party payment service like Gpay, PayTM etc.
// 'receipt_id' => provided by third party payment services ( if any )

// 'method' => chosen way of payment, COD, Third Party etc. ( research )
// 'status' => 'successful', 'failed' and 'active' ( active if COD )
// 'price => amount paid including all taxes, delivery charges etc. 

