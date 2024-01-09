import { AnyEventObject } from "xstate";

const Error = ({
  error,
  send,
}: {
  error: string;
  send: (event: AnyEventObject) => void;
}) => {
  return (
    <div className="flex h-screen w-screen flex-col justify-center items-center gap-4">
      <p className=" font-bold text-xl">{error}</p>
      <button
        className="rounded-lg px-4 py-2 bg-gray-600 w-24 text-gray-100 hover:bg-gray-700 duration-300"
        onClick={() => send({ type: "RETRY" })}
      >
        Retry
      </button>
    </div>
  );
};
export default Error;
