/* eslint-disable react/display-name */
import React from "react";
import "./style.css";

type Props = {
  colorCode: string;
};

const LoaderRound = React.memo<Props>(
  (props) => (
    <div className="loaderWrapper">
      <div className="loaderInner">
        <div style={{ background: props.colorCode }}></div>
        <div style={{ background: props.colorCode }}></div>
        <div style={{ background: props.colorCode }}></div>
        <div style={{ background: props.colorCode }}></div>
        <div style={{ background: props.colorCode }}></div>
        <div style={{ background: props.colorCode }}></div>
        <div style={{ background: props.colorCode }}></div>
        <div style={{ background: props.colorCode }}></div>
      </div>
    </div>
  )
);

// const Loader = React.memo<Props>((props): JSX.Element => (

// ));

export default LoaderRound;
