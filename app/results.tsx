"use client";

import { Fragment, useEffect, useState } from "react";
import { TResult } from "./types";
import { asyncLoop } from "./utils";
import { processVoucher } from "./lib";
import Modal from "./modal";

export const Results = () => {
  const [results, setResults] = useState<TResult[]>([]);
  const [modalResult, setShowModal] = useState<TResult | null>(null);

  useEffect(() => {
    const asyncLoopSave = async (
      i: number,
      total: number,
      processToExecute: () => Promise<[boolean, TResult]>
    ) => {
      const executions: TResult[] = [];
      const addExecutionAndLog = (result: TResult) => {
        console.log(result.fileName, result.status);
        const time = new Date().toLocaleString();
        executions.push({ ...result, time });
        setResults([...executions]);
      };
      await asyncLoop(i, total, processToExecute, addExecutionAndLog);
      return executions;
    };
    asyncLoopSave(1, 10, processVoucher);
  }, []);

  return (
    <>
      <div className="flex justify-center items-center p-2">
        {results.length < 10 && <p>Loading...</p>}
        {results.length === 10 && <p>¡DONE!</p>}
      </div>

      {modalResult && (
        <Modal setShowModal={setShowModal}>
          <pre className="whitespace-break-spaces	">
            {JSON.stringify(modalResult, null, 2)}
          </pre>
        </Modal>
      )}
      <div className="flex flex-wrap gap-3 p-3 justify-center items-center">
        {results.map((result, index) => (
          <Fragment key={`${result.fileName}_${index}`}>
            <div
              className="border-2 p-3 cursor-pointer hover:bg-gray-100"
              onClick={() => setShowModal(result)}
            >
              <strong>{index + 1}</strong>
              <p>{result.fileName}</p>
              <p>{result.status}</p>
              <p>{result.time}</p>
            </div>
          </Fragment>
        ))}
      </div>
    </>
  );
};
