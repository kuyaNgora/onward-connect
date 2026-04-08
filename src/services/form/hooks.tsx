/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from "react-redux";
import { failure, reset, requesting, success } from "./slice";
import type { AppDispatch } from "../store";

export function useFormActions() {
  const dispatch = useDispatch<AppDispatch>();

  const failureWithTimeout = (payload: any, timeout = 10000) => {
    dispatch(failure(payload));

    setTimeout(() => {
      dispatch(reset());
    }, timeout);
  };

  return {
    reset: () => dispatch(reset()),
    requesting: () => dispatch(requesting()),
    success: () => dispatch(success()),
    failure: (payload: unknown) => dispatch(failure(payload)),
    failureWithTimeout,
  };
}
