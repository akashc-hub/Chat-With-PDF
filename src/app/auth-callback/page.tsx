// Import necessary modules
"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";

// Define the Page component
const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const origin = searchParams.get('origin');

  // Use the useQuery hook to perform the query
  const { data, error, isLoading } = trpc.authCallback.useQuery(undefined, {
    retry: true,
    retryDelay: 500,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full mt-24 flex justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-zinc-800" />
          <h3 className="font-semibold text-xl">Setting up your account...</h3>
          <p>You will be redirected automatically.</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    if (error?.data?.code === "UNAUTHORIZED") {
      router.push("/sign-in");
    } else {
      console.error("Error fetching auth callback:", error);
      router.push("/error");
    }
    return null;
  }

  // Success state
  if (data && data.success) {
    // user is sync to databases
    router.push(origin ? `/${origin}` : '/dashboard');
    return null; // No need to render anything further, as we've redirected
  }

  // Handle unexpected cases or failed authentication
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <h3 className="font-semibold text-xl">Failed to set up your account.</h3>
        <p>Please try again later or contact support.</p>
      </div>
    </div>
  );
};

// Export the Page component
export default Page;
