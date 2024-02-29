import { useSelector } from "react-redux";


export default function OrderSummary() {
    const cart = useSelector(store => store.shoppingCart.cart);

    const totalPriceProducts = cart.reduce((accumulator, currentValue) => {
        if (currentValue.checked) {
            return accumulator + currentValue.count * currentValue.product.price;
        }
        return accumulator;
    },
        0
    )
    const shippingPaymentPrice = 29.90;
    const shippingDiscountLimit = 150;
    const totalPriceAll = totalPriceProducts + shippingPaymentPrice - (totalPriceProducts >= shippingDiscountLimit ? shippingPaymentPrice : 0)

    const toFixed2 = (number) => {
        return (Math.round(number * 100) / 100).toFixed(2)
    }
    return (
        <div className="w-full px-5 text-main">
            <h2 className="text-3xl">Order Summary</h2>
            <div className="space-y-2 pt-4">
                <div className="flex justify-between">
                    <p>Total Price</p>
                    <p>{toFixed2(totalPriceProducts)}$</p>
                </div>
                <div className="flex justify-between">
                    <p>Shipping Payment Price</p>
                    <p>{toFixed2(shippingPaymentPrice)}$</p>
                </div>
                {totalPriceProducts > shippingDiscountLimit &&
                    <div className="flex justify-between">
                        <p>Shipping Discount</p>
                        <p className="text-primary-blue">-{toFixed2(shippingPaymentPrice)}$</p>
                    </div>
                }
            </div>
            <div className="flex justify-between text-xl pt-4">
                <p>Total</p>
                <p className="text-primary-blue">{toFixed2(totalPriceAll)}$</p>
            </div>
        </div>


    )
}