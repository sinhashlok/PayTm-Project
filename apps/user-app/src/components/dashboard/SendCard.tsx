"use client";
import { Button } from "@repo/shadcn/components/ui/button";
import { Card } from "@repo/shadcn/components/dashboard/Card";
import { Center } from "@repo/shadcn/components/dashboard/Center";
import { TextInput } from "@repo/shadcn/components/dashboard/TextInput";
import { p2pTransfer } from "../../actions/p2pTransfer";
import { useTransition, useState } from "react";
import { FormSuccess } from "../FormSuccess";
import { FormError } from "../FormError";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleClick = async () => {
    setError("");
    setSuccess("");
    startTransition(async () => {
      const res = await p2pTransfer(number, Number(amount) * 100);
      console.log(res);

      res.success ? setSuccess(res.message) : setError(res.message);
    });
  };

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder={"Number"}
              label="Number"
              onChange={(value) => {
                setNumber(value);
              }}
            />
            <TextInput
              placeholder={"Amount"}
              label="Amount"
              onChange={(value) => {
                setAmount(value);
              }}
            />
            {isPending ? (
              <div className="pt-4 flex justify-center">
                <Button variant="ghost">Processing Request</Button>
              </div>
            ) : (
              <div className="pt-4 flex justify-center">
                <Button onClick={handleClick}>Send</Button>
              </div>
            )}
          </div>
          <div className="mt-2">
            {success && <FormSuccess message={success} />}
            {error && <FormError message={error} />}
          </div>
        </Card>
      </Center>
    </div>
  );
}
