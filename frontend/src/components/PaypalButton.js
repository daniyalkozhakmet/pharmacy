import React, { useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

const PaypalButton = props => {
  const [sdkReady, setSdkReady] = useState(false);

  const addPaypalSdk = () => {
    const clientID =
      'AX3fY5gOy4KtZ5eSVyR3kJDq4WxmzFz1k4N0fte8pMPY7Yw--HF92IIj6Lamit2c9PxTN98HliMlh5xg';
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientID}`;
    script.async = true;
    script.onload = () => {
      setSdkReady(true);
    };
    script.onerror = () => {
      throw new Error('Paypal SDK could not be loaded.');
    };

    document.body.appendChild(script);
  };

  useEffect(() => {
    if (window !== undefined && window.paypal === undefined) {
      addPaypalSdk();
    } else if (
      window !== undefined &&
      window.paypal !== undefined &&
      props.onButtonReady
    ) {
      props.onButtonReady();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  //amount goes in the value field we will use props of the button for this   
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: props.amount,
          }
        }
      ]
    });
  };

  const onApprove = (data, actions) => {
    return actions.order
      .capture()
      .then(details => {
        if (props.onSuccess) {
          return props.onSuccess(data);
        }
      })
      .catch(err => {
        console.log(err)
      });
  };

  if (!sdkReady && window.paypal === undefined) {
    return (
      <div>Loading...</div>
    );
  }

  const Button = window.paypal.Buttons.driver('react', {
    React,
    ReactDOM
  });

  //you can set your style to whatever read the documentation for different styles I have put some examples in the style tag
  return (
    <Button />
  );
};

export default PaypalButton;