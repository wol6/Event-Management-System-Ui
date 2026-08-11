import api from "@/api/axios"

export async function handlePayment(resp) {
    try {
        // const { data: resp } = await api.post('/payment/create-order', {
        //     amount
        // })

        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,

            amount: resp.amount,

            currency: resp.currency,

            name: "Event Management System",

            description: "Event Registration",

            order_id: resp.id,

            handler: async function (response) {

                try {
                    const { data: resp } = await api.post('/payment/verify', {
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_signature: response.razorpay_signature,
                    })

                    if (resp.success) {
                        console.log("Payment successful:", resp)
                    }
                }catch(e){
                    console.log(e)
                }
            },
            theme: {
                color: "#dc2626",
            }
        }

        const razorpay = new window.Razorpay(options)
        razorpay.open()

    } catch (e) {
        console.log(e)
    }
}