import React, { useEffect, useState } from "react";
import ChangeAmountButtons from "../../components/ChangeAmountButtons";
import { useOrderContext } from "../../context/context-order";
import { getTotalPrice, deliveryPrice } from "../../utils/functions";
import Loader from "../../components/Loader";
import { orderSchema } from "../../utils/form-schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { MdOutlineLocationOn } from "react-icons/md";
import { AiOutlineCreditCard } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BsPhone } from "react-icons/bs";
import axios from "axios";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

function Cart() {
  const { orderList } = useOrderContext();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ resolver: yupResolver(orderSchema) });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(false);

  const elements = useElements();
  const stripe = useStripe();
  const navigate = useNavigate();

  const totalAmount = getTotalPrice(orderList);
  const priceDelivery = deliveryPrice(totalAmount);

  const paymentOption = watch("payment");

  const onSubmit = async (data) => {
    setFormLoading(true);
    setFormError(false);

    const items = orderList.map((item) => {
      const { id, amount, size, name } = item;
      return {
        id,
        amount,
        size,
        name,
      };
    });

    // process payment with cash
    if (data.payment === "cash") {
      const send = await axios
        .post(`${process.env.REACT_APP_URL}/orders`, {
          ...data,
          order: items,
        })
        .then((res) => res)
        .catch((error) => {
          setFormError(true);
          console.error(error.message);
          setFormLoading(false);
        });

      if (send.status === 201) {
        setTimeout(() => {
          setFormLoading(false);

          navigate("/success");
        }, 500);

        return;
      }
    }

    // start of the process payment with card
    if (!stripe || !elements) {
      return;
    }

    // create payment intent on the server
    const info = await axios
      .post(
        `${process.env.REACT_APP_URL}/create-payment-intent`,
        {
          PaymentMethodType: "card",
          currency: "eur",
          items,
        },
        { headers: { "Content-Type": "application/json" } }
      )
      .then((response) => response)
      .catch((error) => {
        setFormError(true);
        console.error(error.message);
        setFormLoading(false);
      });

    // confirm the payment on the client
    const payment = await stripe.confirmCardPayment(info?.data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (payment.error) {
      setFormError(true);
      setFormLoading(false);
    }

    if (payment.paymentIntent.status === "succeeded") {
      const send = await axios
        .post(`${process.env.REACT_APP_URL}/orders`, {
          ...data,
          order: items,
          paymentId: payment.paymentIntent.id,
        })
        .then((res) => res)
        .catch((error) => {
          setFormError(true);
          console.error(error.message);
          setFormLoading(false);
        });

      if (send.status === 201) {
        setTimeout(() => {
          setFormLoading(false);

          navigate("/success");
        }, 500);

        return;
      }
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
    // eslint-disable-next-line
  }, []);

  return (
    <section className="cart">
      <div className="container">
        <h1 className="cart__title">Pizzeria {orderList[0]?.restaurant}</h1>

        <div className="cart__flex cart__flex--responsive">
          <div className="cart__info">
            {totalAmount ? (
              ""
            ) : (
              <>
                <p className="cart__error cart__error--marginTop cart__error--big">
                  Your cart is empty
                </p>
                <button className="cart__backBtn" onClick={() => navigate(-1)}>
                  <AiOutlineArrowLeft />
                  go back
                </button>
              </>
            )}

            {orderList.map((item, index) => {
              const { id, size, name, price, amount } = item;
              return (
                <div key={index} className="cart__item">
                  <ChangeAmountButtons id={id} amount={amount} size={size} />

                  <div className="cart__text">
                    <p className="cart__name">{name}</p>
                    <p>{size}</p>
                  </div>

                  <p className="cart__price">{(price * amount).toFixed(2)} €</p>
                </div>
              );
            })}

            <form
              className="cart__form"
              id="form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h2 className="cart__subtitle">Delivery information</h2>

              <div className="cart__flex cart__flex--center">
                <MdOutlineLocationOn className="cart__icon" />

                <input
                  className={
                    errors.address
                      ? "cart__input cart__input--error"
                      : "cart__input"
                  }
                  type="text"
                  placeholder="Address"
                  {...register("address")}
                  disabled={!totalAmount}
                />
              </div>
              {errors.address && (
                <p className="cart__error">{errors.address?.message}</p>
              )}

              <div className="cart__flex cart__flex--center">
                <BsPhone className="cart__icon" />

                <input
                  className={
                    errors.phoneNumber
                      ? "cart__input cart__input--error"
                      : "cart__input"
                  }
                  type="tel"
                  placeholder="Slovenian phone number"
                  {...register("phoneNumber")}
                  disabled={!totalAmount}
                />
              </div>
              {errors.phoneNumber && (
                <p className="cart__error">{errors.phoneNumber?.message}</p>
              )}

              <h2 className="cart__subtitle">Payment details</h2>

              {formError && (
                <p className="cart__error cart__error--marginTop">
                  There has been an error with credit card. Try again.
                </p>
              )}

              <div className="cart__flex cart__flex--center">
                <AiOutlineCreditCard className="cart__icon" />

                <select
                  className={
                    errors.payment
                      ? "cart__input cart__input--error"
                      : "cart__input"
                  }
                  name="payment"
                  {...register("payment")}
                  disabled={!totalAmount}
                >
                  <option value="" hidden placeholder="payment details">
                    Payment details
                  </option>
                  <option value="cash">cash</option>
                  <option value="card">card</option>
                </select>
              </div>
              {errors.payment && (
                <p className="cart__error">{errors.payment?.message}</p>
              )}

              <div
                className={
                  paymentOption === "card"
                    ? "cart__payment--wrapper"
                    : "cart__payment--hidden"
                }
              >
                <label htmlFor="card">Card payment</label>
                <CardElement id="card" className="cart__payment" />
              </div>
            </form>
          </div>

          <div className="cart__total">
            <h2>Total</h2>

            <div className="cart__flex cart__flex--margin">
              <p>Pizzas</p>
              <p>{totalAmount} €</p>
            </div>

            <div className="cart__flex cart__flex--margin">
              <p>Delivery</p>
              <p>{totalAmount && priceDelivery} €</p>
            </div>

            <div className="cart__flex cart__flex--margin cart__total--bold">
              <p>Total amount</p>
              <p>
                {totalAmount &&
                  (Number(totalAmount) + priceDelivery).toFixed(2)}{" "}
                €
              </p>
            </div>

            <button
              className="cart__submit"
              type="submit"
              form="form"
              disabled={formLoading}
            >
              {formLoading ? <Loader /> : "submit the order"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
