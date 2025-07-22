type RegisterRequest = {
    name: string;
    email: string;
    role: "CUSTOMER" | "SALES";
    customerId?: string;
};
