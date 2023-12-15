import { TResult } from "./types";

const wait = (seconds = 1) =>
  new Promise((resolve) => setTimeout(resolve, seconds * 1000));

export const asyncLoop = async (
  i: number,
  total: number,
  processToExecute: () => Promise<[boolean, TResult]>,
  callbackResult: (result: TResult) => Promise<void> | void
): Promise<[boolean, unknown] | void> => {
  if (i <= total) {
    if (i === 1) await wait();
    const [success, result] = await processToExecute();
    await callbackResult(result);
    return await asyncLoop(
      success ? i + 1 : i,
      total,
      processToExecute,
      callbackResult
    );
  } else {
    return Promise.resolve();
  }
};

export const asyncLoopSave = async (
  i: number,
  total: number,
  processToExecute: () => Promise<[boolean, TResult]>
) => {
  const executions: TResult[] = [];
  const addExecutionAndLog = (result: TResult) => {
    console.log(result.fileName, result.status);
    executions.push(result);
  };
  await asyncLoop(i, total, processToExecute, addExecutionAndLog);
  return executions;
};
