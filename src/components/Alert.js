import React from "react";

const Captalize = (word) => {
  const lower = word.toString().toLowerCase();
  return lower.charAt(0).toUpperCase() + lower.slice(1);
};
export default function Alert({ alert }) {
  return (
    alert && (
      <div
        className={`alert alert-${alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <span>
          <strong>{Captalize(alert?.type)}</strong> {alert?.message}
        </span>
      </div>
    )
  );
}
