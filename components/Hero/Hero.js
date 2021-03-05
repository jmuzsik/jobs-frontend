import { Button, H1, Intent } from "@blueprintjs/core";

export default function Hero() {
  return (
    <div className="hero">
      <div className="hero__content">
        <H1>Product</H1>
        <p>You really need this product, so hurry and buy it today!</p>
        <Button large intent={Intent.PRIMARY}>
          Subscribe
        </Button>
      </div>
      <img
        src="https://images.unsplash.com/photo-1562851529-482d8189f5a5?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1440&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
        alt="temp image"
      ></img>
    </div>
  );
}
